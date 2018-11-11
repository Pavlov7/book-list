package com.fmi.bookservice.controller;

import com.fmi.bookservice.model.Book;
import com.fmi.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Daniel on 11-Nov-18.
 */
@RestController
@RequestMapping(path = "/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public List<Book> getBooks() {
        return bookService.getAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Book getBookById(@PathVariable int id) {
        return this.bookService.getById(id);
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public void add(@RequestBody Book book) {
        this.bookService.add(book);
    }
}
