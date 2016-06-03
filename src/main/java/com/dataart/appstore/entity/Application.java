package com.dataart.appstore.entity;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "application")
@NamedQueries({
        @NamedQuery(name = "Application.findAll", query = "select a from Application a"),
        @NamedQuery(name = "Application.findTop", query = "select a from Application a order by downloads desc, date desc")
})
public class Application {

    @Id
    @Column(name = "app_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "app_name")
    private String name;

    @Column(name = "app_package")
    private String packageName;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "application_photos", joinColumns = @JoinColumn(name = "app_id"))
    @Column(name = "app_photo")
    private List<String> photos;

    @Column(name = "app_type")
    @Enumerated(EnumType.STRING)
    private ApplicationType type;

    @Column(name = "app_description")
    private String description;

    @Column(name = "app_time_uploaded")
    private Date date;

    @Column(name = "app_downloads")
    private Long downloads;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    public ApplicationType getType() {
        return type;
    }

    public void setType(ApplicationType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getDownloads() {
        return downloads;
    }

    public void setDownloads(Long downloads) {
        this.downloads = downloads;
    }
}
