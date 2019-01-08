package com.fmi.bookservice.controller;


import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.*;
import com.fmi.bookservice.repository.BookRepository;
import com.fmi.bookservice.repository.UserRepository;
import com.fmi.bookservice.service.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(path = "/reviews")
public class BookReviewController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookReviewService bookReviewService;

    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addReview(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @Valid @RequestBody BookReviewRequest request) throws IOException {

        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

//        BookInList book = bookRepository.findById(request.bookId)
//            .orElseThrow(() -> new ServerErrorException(String.format("Book with id %d not found.", request.bookId)));

        BookReview review = new BookReview(request.volumeId, user, request.text, request.rating);

        bookReviewService.save(review);
        return ResponseEntity.ok(review);
    }

    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public List<BookReview> getReviewByBookId(@RequestParam(required = false) String volumeId) throws IOException {
        if (volumeId == null) {
            return bookReviewService.getAll();
        }

        return bookReviewService.findByVolumeId(volumeId);
    }
}