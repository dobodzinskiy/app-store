package com.dataart.appstore.dao;

import com.dataart.appstore.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

    @Override
    public void save(User user) {
        entityManager.persist(user);
    }

    @Override
    public void update(User user) {
        entityManager.merge(user);
    }

    @Override
    public User findOne(Integer id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findOne(String login) {
        TypedQuery<User> userTypedQuery = entityManager.createNamedQuery("User.findByLogin", User.class);
        userTypedQuery.setParameter("login", login);
        User user;
        try {
            user = userTypedQuery.getSingleResult();
        } catch (NoResultException ex) {
            LOGGER.warn("Login {} was not found", login, ex);
            return null;
        }
        return user;
    }
}
