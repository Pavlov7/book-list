package com.fmi.bookservice.controller;

import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.User;
import com.fmi.bookservice.model.UserPrincipal;
import com.fmi.bookservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Secured("ROLE_USER")
    @RequestMapping(path = "/me", method = RequestMethod.GET)
    public User me() throws IOException {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        // TODO: hide password
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ServerErrorException(String.format("User %d not found.", userPrincipal.getId())));
    }
}