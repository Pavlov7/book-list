package com.fmi.bookservice.service;

import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.repository.BookRepository;
import com.google.api.services.books.Books;
import com.google.api.services.books.model.Volumes;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Created by Daniel on 11-Nov-18.
 */
@Service
public class BookService {

    @Autowired
    private Books books;

    @Autowired
    private BookRepository bookRepository;

    /**
     * Searches the google books api for books
     *
     * @param query      the search query
     *                   The api supports pagination by means of result start index. Default page size is 10
     * @param startIndex index of the first book of the results
     *
     * E.g. the query "example" matches 20 books:
     *  - startIndex is null: query will return books 1-10
     *  - startIndex is 10: query will return books 10-20
     */
    public Volumes search(String query, Long startIndex) throws IOException {
        Books.Volumes.List vols = books.volumes().list(query);
        if (startIndex != null) {
            vols.setStartIndex(startIndex);
        }

        return vols.execute();
    }

    public void save(BookInList b) {
        this.bookRepository.save(b);
    }

    public List<BookInList> getAll() {
        return this.bookRepository.findAll();
    }
}
