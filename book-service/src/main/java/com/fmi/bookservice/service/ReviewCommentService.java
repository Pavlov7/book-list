package com.fmi.bookservice.service;

import com.fmi.bookservice.model.BookReview;
import com.fmi.bookservice.model.ReviewComment;
import com.fmi.bookservice.repository.BookReviewRepository;
import com.fmi.bookservice.repository.ReviewCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewCommentService {
    @Autowired
    private ReviewCommentRepository reviewCommentRepository;

    public void save(ReviewComment rc) {
        this.reviewCommentRepository.save(rc);
    }

    public List<ReviewComment> getAll() {
        return this.reviewCommentRepository.findAll();
    }
    public List<ReviewComment> findByBookReview(BookReview bookReview) {
        return this.reviewCommentRepository.findByBookReview(bookReview);
    }

}
