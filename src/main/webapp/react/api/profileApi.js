import $ from 'jquery';

export function login(user) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/login",
            type: "POST",
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            data: user,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}
export function getDownloads() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/profile/downloads",
            type: "GET",
            success: function(data) {
                resolve(data)
            },
            error: function(error) {
                reject(error)
            }
        })
    })
}
export function logout() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/j_spring_security_logout',
            success: () => {
                resolve();
            },
            error: () => {
                reject();
            }
        })
    })
}

export function signUp(user) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/signUp",
            type: "POST",
            data: JSON.stringify(user),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        });
    })
}