package com.fmi.bookservice.controller;

import com.fmi.bookservice.constants.Constants;
import com.fmi.bookservice.exception.ServerErrorException;
import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.UserPrincipal;
import com.fmi.bookservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * Created by Daniel on 09-Jan-19.
 */
@RestController
@RequestMapping(path = "/lists")
public class ListController {

    @Autowired
    private BookService bookService;

    @Secured("ROLE_USER")
    @RequestMapping(path = "/{list}", method = RequestMethod.GET)
    public List<BookInList> getListContent(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable("list") String listName) throws IOException {
        if (!listName.matches(String.format("%s|%s|%s", Constants.WISHLIST_PATH, Constants.ALREADYREAD_PATH, Constants.CURRENTLY_READING))) {
            throw new ServerErrorException(String.format("%s is not valid list name", listName));
        }

        return bookService.getUserList(userPrincipal.getId(), listName);
    }
}
