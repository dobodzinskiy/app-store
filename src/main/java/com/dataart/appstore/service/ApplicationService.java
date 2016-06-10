package com.dataart.appstore.service;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.dto.ValidationErrorDto;

import java.util.List;

public interface ApplicationService {

    ValidationErrorDto isValid(UploadApplicationDto uploadApplicationDto);

    ApplicationDto uploadApplication(UploadApplicationDto uploadApplicationDto);

    ApplicationDto getApplication(Integer id);

    List<ApplicationDto> getApplications();

    List<ApplicationDto> getTopApplications();

    ApplicationDto downloadApplication(Integer id);

}
