package com.fmi.bookservice.controller;

import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.RoleName;
import com.fmi.bookservice.service.BookService;
import com.google.api.services.books.model.Volumes;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

    // temp to test db integration and auth
    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.GET)
    public void addBook() throws IOException {
        BookInList test = new BookInList();
        test.setRating((byte) 1);
        test.setVolumeId("1234");
        bookService.save(test);
    }

    // temp to test db integration
    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public List<BookInList> getBooks() throws IOException {
        return bookService.getAll();
    }
}
