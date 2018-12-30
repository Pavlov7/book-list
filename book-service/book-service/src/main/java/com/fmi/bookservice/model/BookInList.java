package com.fmi.bookservice.model;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by Daniel on 28-Dec-18.
 */
@Entity
@Table(name="read_books")
public class BookInList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    // reference google books volume
    private String volumeId;

    @ManyToOne
    private User user;
    private Byte rating;
    private Date dateStartedReading;
    private Date dateFinishedReading;

    public BookInList() {
        this.rating = 0;
    }

    public BookInList(String volumeId, User user) {
        this.user = user;
        this.volumeId = volumeId;
        this.rating = 0;
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
