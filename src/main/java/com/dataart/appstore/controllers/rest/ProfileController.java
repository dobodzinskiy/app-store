package com.dataart.appstore.controllers.rest;

import com.dataart.appstore.dto.RatingDto;
import com.dataart.appstore.dto.UserDto;
import com.dataart.appstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userService.getUser(authentication.getName());
    }

    @RequestMapping(value = "/change", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public UserDto changeUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }

    @RequestMapping(value = "/downloads", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<RatingDto> getDownloads() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userService.getDownloads(authentication.getName());
    }
}
