package com.fmi.bookservice.model;

import java.util.Date;

/**
 * Created by Daniel on 28-Dec-18.
 */
//@Entity
//@Table(name="read_books")
public class BookInList {
    private Long id;
    // reference google books volume
    private String volumeId;
    //private User user; // TODO: uncomment after authorization implementation
    private Byte rating;
    private Date dateStartedReading;
    private Date dateFinishedReading;
}
