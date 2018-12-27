package com.fmi.bookservice.controller;

import com.fmi.bookservice.service.BookService;
import com.google.api.services.books.model.Volumes;
import org.springframework.beans.factory.annotation.Autowired;
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
}
