package com.dataart.appstore.service;

import com.dataart.appstore.dao.ApplicationDao;
import com.dataart.appstore.dao.RatingDao;
import com.dataart.appstore.dao.UserDao;
import com.dataart.appstore.dto.RatingDto;
import com.dataart.appstore.dto.UserDto;
import com.dataart.appstore.entity.Rating;
import com.dataart.appstore.entity.User;
import com.dataart.appstore.entity.UserRoles;
import com.dataart.appstore.mapper.RatingMapper;
import com.dataart.appstore.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RatingDao ratingDao;

    @Autowired
    private ApplicationDao applicationDao;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RatingMapper ratingMapper;

    @Override
    public void addUser(UserDto userDto) {
        Set<String> roles = new HashSet<>();
        if (userDto.isDeveloper()) {
            roles.add(UserRoles.ROLE_USER.getValue());
            roles.add(UserRoles.ROLE_DEVELOPER.getValue());
            userDto.setUserRoles(roles);
        } else {
            roles.add(UserRoles.ROLE_USER.getValue());
            userDto.setUserRoles(roles);
        }
        User user = userMapper.fromDto(userDto);
        userDao.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUser(Integer id) {
        return userMapper.toDto(userDao.findOne(id));
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUser(String login) {
        User user = userDao.findOne(login);
        return (user == null) ? null : userMapper.toDto(user);
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        return null;
    }

    @Override
    public List<RatingDto> getDownloads(String login) {
        List<RatingDto> ratingDtos = new ArrayList<>();
        for (Rating rating : ratingDao.getRates(login)) {
            ratingDtos.add(ratingMapper.toDto(rating));
        }
        return ratingDtos;
    }

}
