package com.fmi.bookservice.controller;


import com.fmi.bookservice.model.BookReview;
import com.fmi.bookservice.model.BookReviewRequest;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.model.UserPrincipal;
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
    private BookReviewService bookReviewService;

    @Secured("ROLE_USER")
    @RequestMapping(path = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addReview(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @Valid @RequestBody BookReviewRequest request) throws IOException {
        User user = new User(userPrincipal);

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