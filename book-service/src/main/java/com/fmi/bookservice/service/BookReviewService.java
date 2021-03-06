package com.fmi.bookservice.service;

import com.fmi.bookservice.model.BookReview;
import com.fmi.bookservice.repository.BookReviewRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookReviewService {
    @Autowired
    private BookReviewRepository bookReviewRepository;

    public void save(BookReview br) {
        this.bookReviewRepository.save(br);
    }

    public List<BookReview> getAll() {
        return this.bookReviewRepository.findAll();
    }
    public List<BookReview> findByVolumeId(String volumeId) {
        return this.bookReviewRepository.findByVolumeId(volumeId);
    }

    public List<BookReview> getAllByUserId(Long userId) {
        return this.bookReviewRepository.findByUserId(userId);
    }
}
