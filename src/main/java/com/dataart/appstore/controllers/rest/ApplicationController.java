package com.dataart.appstore.controllers.rest;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @RequestMapping(method = RequestMethod.GET)
    public List<ApplicationDto> getApplications() {
        return applicationService.getApplications();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public ApplicationDto uploadApplication(@RequestBody UploadApplicationDto uploadApplicationDto) {
        return applicationService.uploadApplication(uploadApplicationDto);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile multipartFile,
                                    @RequestParam("appName") String appName) {
        String name = multipartFile.getName();
        return new ResponseEntity<Object>(name, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ApplicationDto getApplication(@PathVariable("id") Integer applicationId) {
        return applicationService.getApplication(applicationId);
    }

    @RequestMapping(value = "/top", method = RequestMethod.GET)
    public List<ApplicationDto> getTopApplications() {
        return applicationService.getTopApplications();
    }
}
