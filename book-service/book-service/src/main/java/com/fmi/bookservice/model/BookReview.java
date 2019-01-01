package com.fmi.bookservice.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created by Daniel on 28-Dec-18.
 */
@Entity
@Table(name="book_reviews")
public class BookReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @ManyToOne
    @NotNull
    private User user;

    @ManyToOne
    @NotNull(message = "Book is required")
    // TODO figure out if this should point to BookInList or just hold bookId from the Volume
    private BookInList book;

    @NotNull(message = "Provide review text")
    private String text;

    @NotNull(message = "Provide book rating")
    private Byte rating;

    public BookReview() {
    }

    public BookReview(BookInList book, User user, String text, Byte rating) {
        this.user = user;
        this.book = book;
        this.text = text;
        this.rating = rating;
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

    public BookInList getBook() {
        return this.book;
    }

    public void setBook(BookInList book) {
        this.book = book;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String txt) {
        this.text = txt;
    }

    public Byte getRating() {
        return rating;
    }

    public void setRating(Byte rating) {
        this.rating = rating;
    }


}
