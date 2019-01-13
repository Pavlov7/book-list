package com.fmi.bookservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Daniel on 28-Dec-18.
 */
@Entity
@Table(name = "books_in_list")
public class BookInList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull(message = "provide volumeId")
    // reference google books volume
    private String volumeId;

    @JsonIgnore
    @ManyToOne
    private User user;

    private Byte rating;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date dateStartedReading;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date dateFinishedReading;

    @NotNull(message = "isFavourite?")
    private Boolean isFavourite;

    @NotNull(message = "choose list")
    private BookList bookList;

    //used by the UI to show info
    private String bookTitle;

    public BookInList() {
        this.rating = 0;
        this.isFavourite = true;
    }

    public BookInList(String volumeId, User user, Boolean alreadyRead, Boolean isFavourite, Boolean wishToRead) {
        this.user = user;
        this.volumeId = volumeId;
        this.rating = 0;
        this.isFavourite = isFavourite;
    }

    public void merge(BookInList other) {
        // TODO: write some strategy for merging
        if(other.isFavourite) this.isFavourite = true;

        this.bookList = other.bookList;
        this.dateFinishedReading = other.dateFinishedReading;
        this.dateStartedReading = other.dateStartedReading;
        this.bookTitle = other.bookTitle;
        this.rating = other.rating;
//        System.out.println(String.format("Merged: %b %b %b", this.alreadyRead, this.isFavourite, this.wishToRead));
    }

    public Boolean getIsFavourite() {
        return isFavourite;
    }

    public BookList getBookList() {
        return bookList;
    }

    public void setBookList(BookList bookList) {
        this.bookList = bookList;
    }

    public void setIsFavourite(Boolean isFavourite) {
        this.isFavourite = isFavourite;
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
        return volumeId;
    }

    public void setVolumeId(String volumeId) {
        this.volumeId = volumeId;
    }

    public Byte getRating() {
        return rating;
    }

    public void setRating(Byte rating) {
        this.rating = rating;
    }

    public Date getDateStartedReading() {
        return dateStartedReading;
    }

    public void setDateStartedReading(Date dateStartedReading) {
        this.dateStartedReading = dateStartedReading;
    }

    public Date getDateFinishedReading() {
        return dateFinishedReading;
    }

    public void setDateFinishedReading(Date dateFinishedReading) {
        this.dateFinishedReading = dateFinishedReading;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }
}
