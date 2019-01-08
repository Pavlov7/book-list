package com.fmi.bookservice.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ReviewCommentRequest {
    @NotNull(message = "Review id is required")
    public Long reviewId;

    @NotBlank(message = "Review text is required")
    public String text;
}
