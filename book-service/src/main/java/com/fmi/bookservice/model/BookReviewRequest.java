package com.fmi.bookservice.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

public class BookReviewRequest {
    @NotNull(message = "Book id is required")
    public Long bookId;

    @NotBlank(message = "Review text is required")
    public String text;
    
    @NotNull(message = "Book rating is required")
    @Range(
        min = 0,
        max = 10
    )
    public Byte rating;
}
