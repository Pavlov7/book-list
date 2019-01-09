package com.fmi.bookservice.model;

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
    private Date dateStartedReading;
    private Date dateFinishedReading;

    @NotNull(message = "alreadyRead?")
    private Boolean alreadyRead;

    @NotNull(message = "isFavourite?")
    private Boolean isFavourite;

    @NotNull(message = "wishToRead?")
    private Boolean wishToRead;

    public BookInList() {
        this.rating = 0;
        this.alreadyRead = false;
        this.isFavourite = true;
        this.wishToRead = false;
    }

    public BookInList(String volumeId, User user, Boolean alreadyRead, Boolean isFavourite, Boolean wishToRead) {
        this.user = user;
        this.volumeId = volumeId;
        this.rating = 0;
        this.alreadyRead = alreadyRead;
        this.isFavourite = isFavourite;
        this.wishToRead = wishToRead;
    }

    public void merge(BookInList other) {
        // TODO: write some strategy for merging
        this.alreadyRead = other.alreadyRead;
        this.isFavourite = other.isFavourite;
        this.wishToRead = other.wishToRead;
    }

    @JsonIgnore
    public Boolean isValid() {
        // at least in one list!
        return alreadyRead || isFavourite || wishToRead;
    }

    public Boolean getAlreadyRead() {
        return alreadyRead;
    }

    public void setAlreadyRead(Boolean alreadyRead) {
        this.alreadyRead = alreadyRead;
    }

    public Boolean getIsFavourite() {
        return isFavourite;
    }

    public void setIsFavourite(Boolean isFavourite) {
        this.isFavourite = isFavourite;
    }

    public Boolean getWishToRead() {
        return wishToRead;
    }

    public void setWishToRead(Boolean wishToRead) {
        this.wishToRead = wishToRead;
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
}
