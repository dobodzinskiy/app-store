package com.dataart.appstore.service;

import com.dataart.appstore.dao.ApplicationDao;
import com.dataart.appstore.dao.UserDao;
import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.entity.Application;
import com.dataart.appstore.mapper.ApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Scanner;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service("applicationService")
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    private static final String UPLOAD_FOLDER = "C:/Java/app-store/uploads/";
    private static final String PHOTOS_FOLDER = "C:/Java/app-store/uploads/Photos/";
    @Autowired
    private ApplicationDao applicationDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private ApplicationMapper applicationMapper;

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
    public Boolean isValid(UploadApplicationDto uploadApplicationDto) {
//        this.upload(uploadApplicationDto.getArchive());
//        try {
//            ZipFile zipFile = new ZipFile("C:/Java/app-store/uploads/" + uploadApplicationDto.getArchive().getOriginalFilename());
//            Enumeration<? extends ZipEntry> entries = zipFile.entries();
//            ZipInputStream zipInput;
//            while (entries.hasMoreElements()) {
//                ZipEntry zipEntry = entries.nextElement();
//                String fileName = zipEntry.getName();
//                if (fileName.endsWith(".txt")) {
//                    zipInput = new ZipInputStream(new FileInputStream(fileName));
//                    RandomAccessFile rf = new RandomAccessFile(fileName, "r");
//                    String line;
//                    while ((line = rf.readLine()) != null) {
//                        System.out.println(line);
//                    }
//                    rf.close();
//                    zipInput.closeEntry();
//                }
//            }
//            zipFile.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return true;
    }

    @Override
    public ApplicationDto uploadApplication(UploadApplicationDto uploadApplicationDto) {
        ApplicationDto applicationDto = new ApplicationDto();
        applicationDto.setName(uploadApplicationDto.getName());
        applicationDto.setType(uploadApplicationDto.getApplicationType());
        applicationDto.setDescription(uploadApplicationDto.getDescription());
        applicationDto.setDownloads((long) 0);
        applicationDto.setDate(new Date(System.currentTimeMillis()).toString());
        try {
            ZipInputStream zipInputStream = new ZipInputStream(uploadApplicationDto.getArchive().getInputStream());
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {   //loop over files
                if (entry.getName().endsWith(".txt")) {                 //loop over txt
                    Scanner scanner = new Scanner(zipInputStream);
                    while (scanner.hasNextLine()) {                     //loop over lines txt
                        if(scanner.nextLine().startsWith("package:")) {     //find package
                            applicationDto.setPackageName(scanner.nextLine().substring(8));
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
    public ApplicationDto getApplication(Integer id) {
        return null;
    }

    @Override
    public List<ApplicationDto> getApplications() {
        return null;
    }

    @Override
    public List<ApplicationDto> getTopApplications() {
        return null;
    }

    @Override
    public ApplicationDto downloadApplication(Integer id) {
        return null;
    }
}
