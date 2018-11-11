package com.fmi.bookservice.service;

import com.fmi.bookservice.model.Book;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Daniel on 11-Nov-18.
 */
@Service
public class BookService {
    private static Map<Long, Book> books = new HashMap<>();

    static {
        books.put(1L, new Book("book1"));
    }

    public Book getById(long id) {
        return books.get(id);
    }

    public void add(Book book) {
        books.put(books.size() + 1L, book);
    }

    public List<Book> getAll() {
        return new ArrayList<>(books.values());
    }
}
