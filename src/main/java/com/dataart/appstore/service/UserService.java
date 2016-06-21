package com.dataart.appstore.service;

import com.dataart.appstore.dto.RatingDto;
import com.dataart.appstore.dto.UserDto;

import java.util.List;

public interface UserService {

    void addUser(UserDto userDto);

    UserDto getUser(Integer id);

    UserDto getUser(String login);

    UserDto updateUser(UserDto userDto);

    List<RatingDto> getDownloads(String login);
}
