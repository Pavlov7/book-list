package com.fmi.bookservice.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.ApiResponse;
import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.BookReview;
import com.fmi.bookservice.model.BookReviewRequest;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.model.UserPrincipal;
import com.fmi.bookservice.repository.BookRepository;
import com.fmi.bookservice.repository.UserRepository;
import com.fmi.bookservice.service.BookReviewService;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;


@RestController
@RequestMapping(path = "/reviews")
public class BookReviewController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookReviewService bookReviewService;

    // temp to test db integration and auth
    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addReview(@Valid @RequestBody BookReviewRequest request) throws IOException {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                       .getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

        BookInList book = bookRepository.findById(request.book_id)
            .orElseThrow(() -> new ServerErrorException(String.format("Book with id %d not found.", request.book_id)));

        BookReview review = new BookReview(book, user);
        review.setText(request.text);
        review.setRating(request.rating);

        bookReviewService.save(review);
        return ResponseEntity.ok(review);
    }

    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public List<BookReview> getReviewByBookId(@RequestParam(required = false) Long book_id) throws IOException {
        if (book_id == null) {
            return bookReviewService.getAll();
        }

        return bookReviewService.findByBookId(book_id);
    }
}