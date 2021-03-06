package com.dataart.appstore.dto;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

public class UploadApplicationDto {

    @NotEmpty(message = "Name can't be empty.")
    private String name;
    private MultipartFile archive;
    private String applicationType;
    private String description;

    public UploadApplicationDto(String name, MultipartFile archive, String applicationType, String description) {
        this.name = name;
        this.archive = archive;
        this.applicationType = applicationType;
        this.description = description;
    }

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

    public String getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(String applicationType) {
        this.applicationType = applicationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
