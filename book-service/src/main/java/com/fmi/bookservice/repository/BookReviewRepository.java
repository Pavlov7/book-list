package com.fmi.bookservice.repository;

import java.util.List;

import com.fmi.bookservice.model.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
    List<BookReview> findByVolumeId(String volumeId);
    List<BookReview> findByUserId(Long userId);
}
