package com.dataart.appstore.service;

import com.dataart.appstore.dao.ApplicationDao;
import com.dataart.appstore.dao.RatingDao;
import com.dataart.appstore.dao.UserDao;
import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.RatingDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.dto.ValidationErrorDto;
import com.dataart.appstore.entity.Application;
import com.dataart.appstore.entity.ApplicationType;
import com.dataart.appstore.entity.Rating;
import com.dataart.appstore.entity.User;
import com.dataart.appstore.mapper.ApplicationMapper;
import com.dataart.appstore.mapper.RatingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service("applicationService")
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private static final String UPLOAD_FOLDER = "C:/Java/app-store/src/main/webapp/resources/uploads/";
    private static final String PHOTOS_FOLDER = "C:/Java/app-store/src/main/webapp/resources/uploads/photos/";
    @Autowired
    private ApplicationDao applicationDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private RatingDao ratingDao;
    @Autowired
    private ApplicationMapper applicationMapper;
    @Autowired
    private RatingMapper ratingMapper;

    private void upload(MultipartFile archive) {
        try {
            byte[] bytes = archive.getBytes();
            BufferedOutputStream buffStream =
                    new BufferedOutputStream(new FileOutputStream(new File(UPLOAD_FOLDER + archive.getOriginalFilename())));
            buffStream.write(bytes);
            buffStream.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public ValidationErrorDto isValid(UploadApplicationDto uploadApplicationDto) {
        ValidationErrorDto validationErrorDto = new ValidationErrorDto(400);
        if (uploadApplicationDto.getName().isEmpty()) {
            validationErrorDto.addFieldError("name", "Name can't be empty!");
        }
        if (uploadApplicationDto.getDescription().isEmpty()) {
            validationErrorDto.addFieldError("description", "Description can't be empty!");
        }
        if (uploadApplicationDto.getApplicationType().isEmpty()) {
            validationErrorDto.addFieldError("applicationType", "Choose type!");
        }
        if (uploadApplicationDto.getArchive().isEmpty()) {
            validationErrorDto.addFieldError("archive", "Add application file!");
        } else {
            try {
                ZipInputStream zipInputStream = new ZipInputStream(uploadApplicationDto.getArchive().getInputStream());
                ZipEntry entry;
                while ((entry = zipInputStream.getNextEntry()) != null) {   //loop over files
                    if (entry.getName().endsWith(".txt")) {                 //loop over txt
                        Scanner scanner = new Scanner(zipInputStream);
                        while (scanner.hasNextLine()) {                 //loop over lines txt
                            String line = scanner.nextLine();
                            if (line.startsWith("name:")) {
                                if (line.substring(5).isEmpty()) {
                                    validationErrorDto.addFieldError("archive", "Name in archive is empty!");
                                }
                            }
                            if (line.startsWith("package:")) {
                                if (line.substring(8).isEmpty()) {
                                    validationErrorDto.addFieldError("archive", "Package in archive is empty!");
                                } else {
                                    Application application = applicationDao.findOne(line.substring(8));
                                    if (null != application) {
                                        validationErrorDto.addFieldError("archive", "Package name has already taken!");
                                    }
                                }
                            }
                            if (line.startsWith("picture_128:")) {
                                if (line.substring(12).isEmpty()) {
                                    validationErrorDto.addFieldError("archive", "Package is not valid (picture_128)!");
                                }
                            }
                            if (line.startsWith("picture_512:")) {
                                if (line.substring(12).isEmpty()) {
                                    validationErrorDto.addFieldError("archive", "Package is not valid (picture_512)!");
                                }
                            }
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return validationErrorDto;
    }

    @Override
    public ApplicationDto uploadApplication(UploadApplicationDto uploadApplicationDto) {
        this.upload(uploadApplicationDto.getArchive());
        ApplicationDto applicationDto = new ApplicationDto();
        applicationDto.setName(uploadApplicationDto.getName());
        applicationDto.setType(uploadApplicationDto.getApplicationType());
        applicationDto.setDescription(uploadApplicationDto.getDescription());
        applicationDto.setDownloads((long) 0);
        try {
            ZipInputStream zipInputStream = new ZipInputStream(uploadApplicationDto.getArchive().getInputStream());
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {   //loop over files
                if (entry.getName().endsWith(".txt")) {                 //loop over txt
                    Scanner scanner = new Scanner(zipInputStream);
                    while (scanner.hasNextLine()) {                 //loop over lines txt
                        String line;
                        if ((line = scanner.nextLine()).startsWith("package:")) {     //find package
                            applicationDto.setPackageName(line.substring(8));
                        }
                    }
                }
                if (entry.getName().endsWith(".jpg")) {                 //loop over photos
                    File photoFolder = new File(PHOTOS_FOLDER + applicationDto.getPackageName());   //folder for images
                    if (!photoFolder.exists()) {
                        photoFolder.mkdir();
                    }

                    FileOutputStream fileOutputStream = new FileOutputStream(photoFolder + "/" + entry.getName());          //writing image
                    for (int c = zipInputStream.read(); c != -1; c = zipInputStream.read()) {
                        fileOutputStream.write(c);
                    }
                    fileOutputStream.close();

                    BufferedImage image =
                            ImageIO.read(
                                    new File(PHOTOS_FOLDER + applicationDto.getPackageName() + "/" + entry.getName()));     //define type
                    if (image.getHeight() == 128 && image.getWidth() == 128) {
                        applicationDto.setSmallPhoto(entry.getName());
                    } else if (image.getHeight() == 512 && image.getWidth() == 512) {
                        applicationDto.setBigPhoto(entry.getName());
                    }
                    zipInputStream.closeEntry();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        Application application = applicationMapper.fromDto(applicationDto);
        applicationDao.save(application);
        return applicationMapper.toDto(application);
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationDto getApplication(Integer id) {
        return applicationMapper.toDto(applicationDao.findOne(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDto> getApplicationsByType(ApplicationType applicationType) {
        List<ApplicationDto> applications = new ArrayList<>();
        for (Application application : applicationDao.findByType(applicationType)) {
            applications.add(applicationMapper.toDto(application));
        }
        return applications;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDto> getApplications() {
        List<ApplicationDto> applications = new ArrayList<>();
        for (Application application : applicationDao.findAll()) {
            applications.add(applicationMapper.toDto(application));
        }
        return applications;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDto> getTopApplications() {
        List<ApplicationDto> applications = new ArrayList<>();
        for (Application application : applicationDao.findTop()) {
            applications.add(applicationMapper.toDto(application));
        }
        return applications;
    }

    @Override
    public InputStream downloadApplication(Integer id) {
        Application application = applicationDao.findOne(id);
        if (application != null) {
            application.setDownloads(application.getDownloads() + 1);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication.isAuthenticated()) {
                User user = userDao.findOne(authentication.getName());
                Rating rating = new Rating();
                rating.setUser(user);
                rating.setApplication(application);
                ratingDao.save(rating);
            }
            try {
                return new FileInputStream(new File(UPLOAD_FOLDER + application.getPackageName() + ".zip"));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public List<RatingDto> getDownloads(int appId) {
        List<RatingDto> ratingDtos = new ArrayList<>();
        for (Rating rating : ratingDao.getRates(appId)) {
            ratingDtos.add(ratingMapper.toDto(rating));
        }
        return ratingDtos;
    }

    @Override
    public RatingDto setRate(RatingDto ratingDto) {
        boolean downloaded = false;
        for (Rating rating : ratingDao.getRates(ratingDto.getUsername())) {
            if (rating.getApplication().getId() == ratingDto.getApplicationId()) {
                downloaded = true;
            }
        }
        if (downloaded) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = userDao.findOne(authentication.getName());
            Application application = applicationDao.findOne(ratingDto.getId());
            Rating rating = ratingMapper.fromDto(ratingDto);
            rating.setApplication(application);
            rating.setUser(user);

            ratingDao.updateRate(rating);

            return ratingMapper.toDto(ratingDao.getRate(rating.getId()));
        } else {
            return null;
        }
    }
}
