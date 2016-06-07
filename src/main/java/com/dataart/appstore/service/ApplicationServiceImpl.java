package com.dataart.appstore.service;

import com.dataart.appstore.dao.ApplicationDao;
import com.dataart.appstore.dao.UserDao;
import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.mapper.ApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service("applicationService")
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

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
                    new BufferedOutputStream(new FileOutputStream(new File("C:/Java/app-store/uploads/" + archive.getOriginalFilename())));
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
        try {
            ZipInputStream zipInputStream = new ZipInputStream(uploadApplicationDto.getArchive().getInputStream());
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                if (entry.getName().endsWith(".jpg")) {
                    BufferedOutputStream bufferedOutputStream =
                            new BufferedOutputStream(new FileOutputStream(new File("C:/Java/app-store/uploads/" + entry.getName())));
                    for (int c = zipInputStream.read(); c != -1; c = zipInputStream.read()) {
                        bufferedOutputStream.write(c);
                    }
                    zipInputStream.closeEntry();
                    bufferedOutputStream.close();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public ApplicationDto uploadApplication(UploadApplicationDto uploadApplicationDto) {
        return null;
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
