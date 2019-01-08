package com.fmi.bookservice.controller;


import com.fmi.bookservice.constants.Constants;
import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.model.UserPrincipal;
import com.fmi.bookservice.repository.UserRepository;
import com.fmi.bookservice.service.BookService;
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
    private UserRepository userRepository;

    @Autowired
    private BookService bookService;

    @RequestMapping(path = "/search", method = RequestMethod.GET)
    public Volumes search(@RequestParam String q, @RequestParam(required = false) Long startIndex) throws IOException {
        return bookService.search(q, startIndex);
    }

    // temp to test db integration and auth
    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addBookInList(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                     @Valid @RequestBody BookInList bookRequest) throws IOException {
        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

        bookRequest.setUser(user);
        bookRequest.setRating((byte) 0);
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
    @RequestMapping(path = "/my", method = RequestMethod.GET)
    public List<BookInList> getMyBooks(@AuthenticationPrincipal UserPrincipal userPrincipal) throws IOException {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

        return bookService.findByUser(user);
    }


    @Secured("ROLE_USER")
    @RequestMapping(path = "/my/lists/{list}", method = RequestMethod.GET)
    public List<BookInList> getListContent(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable("list")  String listName) throws IOException {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

        if (!listName.matches(String.format("%s|%s|%s", Constants.WISHLIST_PATH, Constants.ALREADYREAD_PATH, Constants.FAVOURITES_PATH ))) {
            throw new ServerErrorException(String.format("%s is not valid list name", listName));
        }

        return bookService.getUserList(user, listName);
    }

    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public List<BookInList> getBooks() throws IOException {
        return bookService.getAll();
    }

}
