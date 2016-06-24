package com.dataart.appstore.dao;

import com.dataart.appstore.entity.Application;
import com.dataart.appstore.entity.ApplicationType;

import java.util.List;

public interface ApplicationDao {

    void save(Application application);

    void update(Application application);

    Application findOne(Integer id);

    Application findOne(String packageName);

    List<Application> findAll();

    List<Application> findTop();
    
    List<Application> findByType(ApplicationType applicationType);

    List<Application> findByUser(String login);

}
