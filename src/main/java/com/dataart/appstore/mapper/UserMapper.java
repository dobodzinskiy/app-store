package com.dataart.appstore.mapper;

import com.dataart.appstore.dto.UserDto;
import com.dataart.appstore.entity.User;
import com.dataart.appstore.entity.UserRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component("userMapper")
public class UserMapper implements Mapper<User, UserDto> {

    @Autowired
    private ApplicationMapper applicationMapper;

    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setLogin(user.getLogin());
        userDto.setUserRoles(user.getUserRoles().stream().map(UserRoles::getValue).collect(Collectors.toSet()));

        return userDto;
    }

    public User fromDto(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setLogin(userDto.getLogin());
        user.setUserRoles(userDto.getUserRoles().stream().map(UserRoles::getEnum).collect(Collectors.toSet()));

        return user;
    }
}
