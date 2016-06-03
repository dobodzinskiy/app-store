package com.dataart.appstore.mapper;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.entity.Application;
import org.springframework.stereotype.Component;

@Component("applicationMapper")
public class ApplicationMapper implements Mapper<Application, ApplicationDto> {

    public ApplicationDto toDto(Application application) {
        return null;
    }

    public Application fromDto(ApplicationDto applicationDto) {
        return null;
    }

}
