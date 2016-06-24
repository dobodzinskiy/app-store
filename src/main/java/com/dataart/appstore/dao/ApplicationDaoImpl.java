package com.dataart.appstore.dao;

import com.dataart.appstore.entity.Application;
import com.dataart.appstore.entity.ApplicationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Collections;
import java.util.List;


@Repository("applicationDao")
public class ApplicationDaoImpl implements ApplicationDao {


    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationDaoImpl.class);

    @Override
    public void save(Application application) {
        entityManager.persist(application);
    }

    @Override
    public void update(Application application) {
        entityManager.merge(application);
    }

    @Override
    public Application findOne(Integer id) {
        return entityManager.find(Application.class, id);
    }

    @Override
    public Application findOne(String packageName) {
        TypedQuery<Application> applicationTypedQuery = entityManager.createNamedQuery("Application.findByPackage", Application.class);
        applicationTypedQuery.setParameter("packageName", packageName);
        return applicationTypedQuery.getSingleResult();
    }

    @Override
    public List<Application> findAll() {
        TypedQuery<Application> applicationTypedQuery = entityManager.createNamedQuery("Application.findAll", Application.class);
        return applicationTypedQuery.getResultList();
    }

    @Override
    public List<Application> findTop() {
        TypedQuery<Application> applicationTypedQuery = entityManager.createNamedQuery("Application.findTop", Application.class);
        applicationTypedQuery.setMaxResults(10);
        return applicationTypedQuery.getResultList();
    }

    @Override
    public List<Application> findByType(ApplicationType applicationType) {
        TypedQuery<Application> applicationTypedQuery = entityManager.createNamedQuery("Application.findByType", Application.class);
        applicationTypedQuery.setParameter("type", applicationType);
        return applicationTypedQuery.getResultList();
    }

    @Override
    public List<Application> findByUser(String login) {
        TypedQuery<Application> applicationTypedQuery = entityManager.createNamedQuery("Application.findByUser", Application.class);
        applicationTypedQuery.setParameter("login", login);
        List<Application> applicationList;
        try {
            applicationList = applicationTypedQuery.getResultList();
        } catch(NoResultException ex) {
            LOGGER.warn("Applications weren't found", ex);
            return Collections.emptyList();
        }
        return applicationList;
    }
}
