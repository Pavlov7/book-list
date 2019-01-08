package com.fmi.bookservice.controller;


import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.*;
import com.fmi.bookservice.repository.BookRepository;
import com.fmi.bookservice.repository.BookReviewRepository;
import com.fmi.bookservice.repository.ReviewCommentRepository;
import com.fmi.bookservice.repository.UserRepository;
import com.fmi.bookservice.service.BookReviewService;
import com.fmi.bookservice.service.ReviewCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping(path = "/comments")
public class ReviewCommentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @Autowired
    private ReviewCommentService reviewCommentService;

    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addComment(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @Valid @RequestBody ReviewCommentRequest request) throws IOException {

        User user = userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

        BookReview review = bookReviewRepository.findById(request.reviewId)
                .orElseThrow(() -> new ServerErrorException(String.format("Review %d not found", request.reviewId)));


        ReviewComment comment = new ReviewComment(user, review, request.text);

        reviewCommentService.save(comment);
        return ResponseEntity.ok(comment);
    }

    @RequestMapping(path = "/get", method = RequestMethod.GET)
    public List<ReviewComment> getCommentsByReviewId(@RequestParam(required = false) Long reviewId) throws IOException {
        if (reviewId == null) {
            return reviewCommentService.getAll();
        }
        BookReview review = bookReviewRepository.findById(reviewId)
                .orElseThrow(() -> new ServerErrorException(String.format("Review %d not found", reviewId)));

        return reviewCommentService.findByBookReview(review);
    }
}