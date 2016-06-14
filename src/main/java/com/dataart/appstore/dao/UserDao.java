package com.dataart.appstore.dao;

import com.dataart.appstore.entity.User;


public interface UserDao {

    void save(User user);

    void update(User user);

    User findOne(Integer id);

    User findOne(String login);
}
