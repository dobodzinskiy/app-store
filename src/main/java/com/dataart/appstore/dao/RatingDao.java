package com.dataart.appstore.dao;

import com.dataart.appstore.entity.Rating;

import java.util.List;

public interface RatingDao {

    Rating getRate(int downloadId);

    List<Rating> getRates(String login);

    List<Rating> getRates(int applicationId);

    void updateRate(Rating rating);

    void save(Rating rating);
}
