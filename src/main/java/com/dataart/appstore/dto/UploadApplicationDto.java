package com.dataart.appstore.dto;

import com.dataart.appstore.entity.ApplicationType;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by dobodzinskiy on 02.06.2016.
 */
public class UploadApplicationDto {

    private String name;
    private MultipartFile archive;
    private ApplicationType applicationType;
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MultipartFile getArchive() {
        return archive;
    }

    public void setArchive(MultipartFile archive) {
        this.archive = archive;
    }

    public ApplicationType getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(ApplicationType applicationType) {
        this.applicationType = applicationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
