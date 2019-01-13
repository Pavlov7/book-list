package com.fmi.bookservice.service;

import com.fmi.bookservice.constants.Constants;
import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.BookList;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.repository.BookRepository;
import com.google.api.services.books.Books;
import com.google.api.services.books.model.Volume;
import com.google.api.services.books.model.Volumes;

import java.util.Collections;
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


    public Volume getVolumeDetails(String volumeId) throws IOException {
        Books.Volumes.Get get = books.volumes().get(volumeId);

        return get.execute();
    }

    public void save(BookInList b) {
        this.bookRepository.save(b);
    }

    public void delete(BookInList b) {
        this.bookRepository.delete(b);
    }

    public List<BookInList> getAll() {
        return this.bookRepository.findAll();
    }

//    public List<BookInList> findByUser(Long userId) {
//        return this.bookRepository.findByUserId(userId);
//    }

    public BookInList getByUserAndVolumeId(User user, String volumeId) {
        return this.bookRepository.getByUserAndVolumeId(user, volumeId);
    }


    public List<BookInList> getUserList(Long userId, String listName) {
        BookList bookList;
        switch (listName) {
            case Constants.CURRENTLY_READING:
                bookList = BookList.CURRENTLY_READING;
                break;
            case Constants.WISHLIST_PATH:
                bookList = BookList.WISH_TO_READ;
                break;
            case Constants.ALREADYREAD_PATH:
                bookList = BookList.ALREADY_READ;
                break;
            default:
                return Collections.emptyList();
        }

        return this.bookRepository.findByUserIdAndBookList(userId, bookList);
    }
}
