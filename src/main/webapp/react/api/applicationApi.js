import $ from 'jquery';

export function fetchTopApplications() {
    return new Promise((resolve, reject) => {
        var url = "/applications/top";
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}
export function fetchApplications(type) {
    return new Promise((resolve, reject) => {
        var url = "/applications/byType/" + type;
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}
export function fetchApplication(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/applications/' + id,
            type: 'GET',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}
export function uploadApplication(application) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/applications/upload',
            type: 'POST',
            data: application,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function (data) {
                resolve(data)
            },
            error: function (data) {
                reject(data)
            }
        });
    })
}
export function downloadApplication(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/applications/' + id + '/zip',
            type: 'GET',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}
export function getDownloads(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/applications/" + id + "/rates",
            type: 'GET',
            success: function(data) {
                resolve(data)
            },
            error: function(error) {
                reject(error)
            }
        })
    })
}