package com.dataart.appstore.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "user_applications")
@NamedQueries({
        @NamedQuery(name = "Rating.getDownloadsByUser", query = "select r from Rating r where r.user.login = :login"),
        @NamedQuery(name = "Rating.getDownloadsByApp", query = "select r from Rating r where r.application.id = :id and r.rate > 0"),
        @NamedQuery(name = "Rating.getUniqueRating", query = "select r from Rating r where r.application.id = :id and r.user.login = :login")
})
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "download_id")
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "app_id")
    private Application application;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "rated")
    private int rate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }
}
