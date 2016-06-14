package com.dataart.appstore.dao;

import com.dataart.appstore.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

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
        return userTypedQuery.getSingleResult();
    }
}
