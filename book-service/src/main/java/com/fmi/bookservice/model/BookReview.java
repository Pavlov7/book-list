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
@Table(name = "book_reviews")
public class BookReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @NotNull
    private User user;

    // reference google books volumeBookReview
    @NotNull(message = "Provide google volume id")
    private String volumeId;

    @NotNull(message = "Provide review text")
    private String text;

    @NotNull(message = "Provide book rating")
    private Byte rating;

    public BookReview() {
    }

    public BookReview(String volumeId, User user, String text, Byte rating) {
        this.user = user;
        this.volumeId = volumeId;
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

    public String getVolumeId() {
        return this.volumeId;
    }

    public void setVolumeId(String volumeId) {
        this.volumeId = volumeId;
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
