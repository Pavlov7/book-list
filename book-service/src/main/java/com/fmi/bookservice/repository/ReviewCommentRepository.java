package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.BookReview;
import com.fmi.bookservice.model.ReviewComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewCommentRepository extends JpaRepository<ReviewComment, Long> {
    List<ReviewComment> findByBookReview(BookReview bookReview);
}
