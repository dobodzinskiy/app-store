package com.dataart.appstore.service;

import com.dataart.appstore.dto.UserDto;

public interface UserService {

    UserDto addUser(UserDto userDto);

    UserDto getUser(Integer id);

    UserDto getUser(String login);

    UserDto updateUser(UserDto userDto);
}
