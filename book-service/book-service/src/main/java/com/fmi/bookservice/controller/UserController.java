package com.fmi.bookservice.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.ApiResponse;
import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.BookReview;
import com.fmi.bookservice.model.BookReviewRequest;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.model.UserPrincipal;
import com.fmi.bookservice.repository.BookRepository;
import com.fmi.bookservice.repository.UserRepository;
import com.fmi.bookservice.service.BookReviewService;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;


@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Secured("ROLE_USER")
    @RequestMapping(path = "/me", method = RequestMethod.GET)
    public User me() throws IOException {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));

        // TODO: hide password
        return user;
    }
}