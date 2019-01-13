package com.fmi.bookservice.controller;


import com.fmi.bookservice.constants.Constants;
import com.fmi.bookservice.exception.ResourceNotFoundException;
import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.model.UserPrincipal;
import com.fmi.bookservice.service.BookService;
import com.google.api.services.books.model.Volume;
import com.google.api.services.books.model.Volumes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * Created by Daniel on 11-Nov-18.
 */
@RestController
@RequestMapping(path = "/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(path = "/search", method = RequestMethod.GET)
    public Volumes search(@RequestParam String q, @RequestParam(required = false) Long startIndex) throws IOException {
        return bookService.search(q, startIndex);
    }

    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addBookInList(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                           @Valid @RequestBody BookInList bookRequest) throws IOException {
        User user = new User(userPrincipal);
        bookRequest.setUser(user);
        if (bookRequest.getRating() == null) {
            bookRequest.setRating((byte) 0);
        }
        if (!bookRequest.isValid()) {
            throw new ServerErrorException("Book in list is not valid (choose at least one list)");
        }

        BookInList oldBook = bookService.getByUserAndVolumeId(user, bookRequest.getVolumeId());

        if (oldBook != null) {
            // merge new book with old one
            oldBook.merge(bookRequest);
            bookService.save(oldBook);
            return ResponseEntity.ok(oldBook);
        } else {
            // create new one
            bookService.save(bookRequest);
            return ResponseEntity.ok(bookRequest);
        }
    }

    @Secured("ROLE_USER")
    @RequestMapping(path = "/deleteFromList/{list}", method = RequestMethod.POST)
    public ResponseEntity<?> removeBookFromList(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                @PathVariable("list") String listName,
                                                @Valid @RequestBody BookInList rbook) throws IOException {
        if (!listName.matches(String.format("%s|%s|%s", Constants.WISHLIST_PATH, Constants.ALREADYREAD_PATH, Constants.FAVOURITES_PATH))) {
            throw new ServerErrorException(String.format("%s is not valid list name", listName));
        }

        User user = new User(userPrincipal);

        BookInList book = bookService.getByUserAndVolumeId(user, rbook.getVolumeId());

        if (book == null) {
            throw new ServerErrorException(String.format("Cannot find a book with %s volumeId for user %s", book.getVolumeId(), user.getUsername()));
        }

        if (!book.isInsideList(listName)) {
            throw new ServerErrorException("Book is not inside list " + listName);
        }

        book.deleteFromList(listName);

        if (!book.isValid()) {// no lists for this book
            // delete it
            bookService.delete(book);
            return ResponseEntity.ok(book);
        }

        bookService.save(book);
        return ResponseEntity.ok(book);
    }

    // probably not needed
    @Secured("ROLE_USER")
    @RequestMapping(path = "/my", method = RequestMethod.GET)
    public List<BookInList> getMyBooks(@AuthenticationPrincipal UserPrincipal userPrincipal) throws IOException {
        return bookService.findByUser(userPrincipal.getId());
    }

    @RequestMapping(path = "/volumes/{volumeId}", method = RequestMethod.GET)
    public Volume volumeDetails(@PathVariable("volumeId") String volumeId) throws IOException {
        try {
            return bookService.getVolumeDetails(volumeId);
        } catch (IOException e) {
            throw new ResourceNotFoundException("Volumes", "error", e.getMessage());
        }
    }

    @Secured("ROLE_USER")
    @RequestMapping(path = "/getByVolumeId/{volumeId}", method = RequestMethod.GET)
    public BookInList getBookByVolumeId(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                        @PathVariable("volumeId") String volumeId) throws IOException {
        try {
            User user = new User(userPrincipal);
            return bookService.getByUserAndVolumeId(user, volumeId);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Books", "error", e.getMessage());
        }
    }
}
