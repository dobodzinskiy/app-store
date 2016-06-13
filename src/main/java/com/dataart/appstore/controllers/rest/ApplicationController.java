package com.dataart.appstore.controllers.rest;

import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.entity.ApplicationType;
import com.dataart.appstore.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @RequestMapping(value = "/:type", method = RequestMethod.GET)
    public List<ApplicationDto> getApplications(@PathVariable("type")ApplicationType applicationType) {
        return applicationService.getApplicationsByType(applicationType);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> uploadApplication(@RequestParam("file") MultipartFile archive,
                                               @RequestParam("name") String name,
                                               @RequestParam("type") String applicationType,
                                               @RequestParam("description") String description) {
        UploadApplicationDto uploadApplicationDto =
                new UploadApplicationDto(name, archive, applicationType, description);
        if (applicationService.isValid(uploadApplicationDto).getFieldErrors().isEmpty()) {
            return new ResponseEntity<Object>(applicationService.uploadApplication(uploadApplicationDto), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(applicationService.isValid(uploadApplicationDto), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}/zip", method = RequestMethod.GET, produces = "application/zip")
    public void downloadApplication(@PathVariable("id") Integer applicationId,
                                    HttpServletResponse response) {
        try {
            response.setContentType("application/zip");
            org.apache.commons.io.IOUtils.copy(applicationService.downloadApplication(applicationId), response.getOutputStream());
            response.flushBuffer();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ApplicationDto getApplication(@PathVariable("id") Integer applicationId) {
        return applicationService.getApplication(applicationId);
    }

    @RequestMapping(value = "/top", method = RequestMethod.GET)
    public List<ApplicationDto> getTopApplications() {
        return applicationService.getTopApplications();
    }
}
