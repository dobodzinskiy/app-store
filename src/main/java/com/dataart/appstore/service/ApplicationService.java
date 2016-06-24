package com.dataart.appstore.service;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.RatingDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.dto.ValidationErrorDto;
import com.dataart.appstore.entity.ApplicationType;

import java.io.InputStream;
import java.util.List;

public interface ApplicationService {

    ValidationErrorDto isValid(UploadApplicationDto uploadApplicationDto);

    ApplicationDto uploadApplication(UploadApplicationDto uploadApplicationDto);

    ApplicationDto getApplication(Integer id);

    List<ApplicationDto> getApplications();

    List<ApplicationDto> getApplicationsByType(ApplicationType applicationType);

    List<ApplicationDto> getApplicationsByUser(String login);

    List<ApplicationDto> getTopApplications();

    InputStream downloadApplication(Integer id);

    List<RatingDto> getDownloads(int appId);

    RatingDto setRate(RatingDto ratingDto);

}
