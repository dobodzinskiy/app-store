package com.dataart.appstore.service;

import com.dataart.appstore.dao.ApplicationDao;
import com.dataart.appstore.dao.UserDao;
import com.dataart.appstore.dto.ApplicationDto;
import com.dataart.appstore.dto.UploadApplicationDto;
import com.dataart.appstore.mapper.ApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.zip.ZipFile;

@Service("applicationService")
@Transactional
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationDao applicationDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ApplicationMapper applicationMapper;

    @Override
    public Boolean isApplicationValid(ZipFile zipFile) {
        return null;
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
