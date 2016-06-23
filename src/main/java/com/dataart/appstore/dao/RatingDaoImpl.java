package com.dataart.appstore.dao;

import com.dataart.appstore.entity.Rating;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.Collections;
import java.util.List;

@Repository
public class RatingDaoImpl implements RatingDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(Rating rating) {
        entityManager.persist(rating);
    }

    @Override
    public Rating getRate(int downloadId) {
        Rating rating;
        try {
            rating = entityManager.find(Rating.class, downloadId);
        } catch (NoResultException ex) {
            LOGGER.warn("Rate {} was not found", downloadId, ex);
            return null;
        }
        return rating;
    }

    @Override
    public Rating getRate(int appId, String login) {
        Rating rating;
        try {
            TypedQuery<Rating> ratingTypedQuery = entityManager.createNamedQuery("Rating.getUniqueRating", Rating.class);
            ratingTypedQuery.setParameter("id", appId).setParameter("login", login);
            rating = ratingTypedQuery.getSingleResult();
        } catch (NoResultException ex) {
            LOGGER.warn("Rate was not found", ex);
            return null;
        }
        return rating;
    }

    @Override
    public List<Rating> getRates(int applicationId) {
        TypedQuery<Rating> query = entityManager.createNamedQuery("Rating.getDownloadsByApp", Rating.class);
        query.setParameter("id", applicationId);
        List<Rating> ratings;
        try {
            ratings = query.getResultList();
        } catch (NoResultException ex) {
            LOGGER.warn("Rates with appId: {} was not found", applicationId, ex);
            return Collections.emptyList();
        }
        return ratings;
    }

    @Override
    public List<Rating> getRates(String login) {
        TypedQuery<Rating> query = entityManager.createNamedQuery("Rating.getDownloadsByUser", Rating.class);
        query.setParameter("login", login);
        List<Rating> ratings;
        try {
            ratings = query.getResultList();
        } catch (NoResultException ex) {
            LOGGER.warn("Rates with login: {} was not found", login, ex);
            return Collections.emptyList();
        }
        return ratings;
    }

    @Override
    public void updateRate(Rating rating) {
        entityManager.merge(rating);
    }
}
