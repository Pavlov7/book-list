package com.fmi.bookservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "review_comments")
public class ReviewComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @NotNull
    private User user;

    // reference to review
    @ManyToOne
    @NotNull(message = "Provide book review")
    private BookReview bookReview;

    @NotNull(message = "Provide review text")
    private String text;

    public ReviewComment() {
    }

    public ReviewComment(User user, BookReview bookReview, String text) {
        this.user = user;
        this.bookReview = bookReview;
        this.text = text;
    }


    public BookReview getBookReview() {
        return bookReview;
    }

    public void setBookReview(BookReview bookReview) {
        this.bookReview = bookReview;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
