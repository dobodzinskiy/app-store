package com.dataart.appstore.service;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;

import java.util.List;

public interface ApplicationService {

    ApplicationDto uploadApplication(UploadApplicationDto uploadApplicationDto);

    ApplicationDto getApplication(Integer id);

    List<ApplicationDto> getApplications();

    List<ApplicationDto> getTopApplications();

    ApplicationDto downloadApplication(Integer id);

}
