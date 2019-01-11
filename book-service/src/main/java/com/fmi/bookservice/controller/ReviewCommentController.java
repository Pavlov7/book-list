package com.fmi.bookservice.controller;


import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.*;
import com.fmi.bookservice.repository.BookReviewRepository;
import com.fmi.bookservice.repository.UserRepository;
import com.fmi.bookservice.service.CustomUserDetailsService;
import com.fmi.bookservice.service.ReviewCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping(path = "/comments")
@MessageMapping("/comments")
public class ReviewCommentController {

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @Autowired
    private ReviewCommentService reviewCommentService;

    @Autowired
    private UserRepository userRepository;


    private SimpMessagingTemplate template;

    @Autowired
    public ReviewCommentController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addComment(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @Valid @RequestBody ReviewCommentRequest request) throws IOException {

        User user = new User(userPrincipal);

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


    //
    // Sockets
    //
    @MessageMapping("/add/{reviewId}")
    public void getComment(@DestinationVariable Long reviewId, ReviewCommentRequest request, Principal principal) throws Exception {
        // TODO: change the way of getting current user?
        User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new ServerErrorException("FIX THIS"));
        BookReview review = bookReviewRepository.findById(request.reviewId)
                .orElseThrow(() -> new ServerErrorException(String.format("Review %d not found", request.reviewId)));

        ReviewComment comment = new ReviewComment(user, review, request.text);
        reviewCommentService.save(comment);

        String destination = "/comments/arrived/" + reviewId.toString();
        // System.out.println(destination);
        this.template.convertAndSend(destination, comment);
    }
}