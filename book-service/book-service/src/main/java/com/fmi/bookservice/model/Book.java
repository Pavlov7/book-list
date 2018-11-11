package com.fmi.bookservice.model;

/**
 * Created by Daniel on 11-Nov-18.
 */
// TODO: move to separate library project that will be shared among all microservices
public class Book {
    private String name;

    public Book(String name) {
        this.name = name;
    }

    public Book() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
