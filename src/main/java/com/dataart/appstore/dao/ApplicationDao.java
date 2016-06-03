package com.dataart.appstore.dao;

import com.dataart.appstore.entity.Application;

import java.util.List;

public interface ApplicationDao {

    void save(Application application);

    Application findOne(Integer id);

    List<Application> findAll();

    List<Application> findTop();

}
