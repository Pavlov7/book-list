package com.fmi.bookservice.controller;


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
    public ResponseEntity<?> addBook(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                     @Valid @RequestBody BookInList bookRequest) throws IOException {
        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));
            
        bookRequest.setUser(user);
        Byte x = 0;
        System.out.print(bookRequest);
        bookRequest.setRating(x);
        bookService.save(bookRequest);
        return ResponseEntity.ok(bookRequest);
    }

    // temp to test db integration
    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public List<BookInList> getBooks() throws IOException {
        return bookService.getAll();
    }
}
