package com.dataart.appstore.mapper;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.entity.Application;
import com.dataart.appstore.entity.ApplicationType;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component("applicationMapper")
public class ApplicationMapper implements Mapper<Application, ApplicationDto> {

    public ApplicationDto toDto(Application application) {
        ApplicationDto applicationDto = new ApplicationDto();

        applicationDto.setId(application.getId());
        applicationDto.setName(application.getName());
        applicationDto.setPackageName(application.getPackageName());
        applicationDto.setBigPhoto(application.getBigPhoto());
        applicationDto.setSmallPhoto(application.getName());
        applicationDto.setType(application.getType().getValue());
        applicationDto.setDescription(application.getDescription());
        applicationDto.setDownloads(application.getDownloads());
        applicationDto.setDate(application.getDate().toLocaleString());
        return applicationDto;
    }

    public Application fromDto(ApplicationDto applicationDto) {
        Application application = new Application();

        application.setId(applicationDto.getId());
        application.setName(applicationDto.getName());
        application.setPackageName(applicationDto.getPackageName());
        application.setBigPhoto(applicationDto.getBigPhoto());
        application.setSmallPhoto(applicationDto.getSmallPhoto());
        application.setType(ApplicationType.getEnum(applicationDto.getType()));
        application.setDescription(applicationDto.getDescription());
        application.setDownloads(applicationDto.getDownloads());
        application.setDate(new Date(System.currentTimeMillis()));
        return application;
    }

}
