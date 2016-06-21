package com.dataart.appstore.mapper;

import com.dataart.appstore.dto.RatingDto;
import com.dataart.appstore.entity.Rating;
import org.springframework.stereotype.Service;

@Service("ratingMapper")
public class RatingMapper implements Mapper<Rating, RatingDto> {

    @Override
    public Rating fromDto(RatingDto ratingDto) {
        Rating rating = new Rating();
        rating.setId(ratingDto.getId());
        rating.setRate(ratingDto.getRate());

        return rating;
    }

    @Override
    public RatingDto toDto(Rating rating) {
        RatingDto ratingDto = new RatingDto();
        ratingDto.setId(rating.getId());
        ratingDto.setApplicationId(rating.getApplication().getId());
        ratingDto.setUsername(rating.getUser().getLogin());
        ratingDto.setRate(rating.getRate());

        return ratingDto;
    }
}
