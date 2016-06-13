import $ from 'jquery';

export function fetchTopApplications() {
    return new Promise((resolve, reject) => {
        var url = "/applications/top";
        $.ajax({
            url: url,
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
export function fetchApplications(type) {
    return new Promise((resolve, reject) => {
        var url = "/applications/" + type;
        $.ajax({
            url: url,
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