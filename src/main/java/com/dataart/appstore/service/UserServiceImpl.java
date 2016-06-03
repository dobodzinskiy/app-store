package com.dataart.appstore.service;

import com.dataart.appstore.dao.UserDao;
import com.dataart.appstore.dto.UserDto;
import com.dataart.appstore.entity.User;
import com.dataart.appstore.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDto addUser(UserDto userDto) {
        User user = userMapper.fromDto(userDto);
        userDao.save(user);
        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUser(Integer id) {
        return userMapper.toDto(userDao.findOne(id));
    }

    @Override
    public UserDto getUser(String login) {
        return userMapper.toDto(userDao.findOne(login));
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        return null;
    }
}
