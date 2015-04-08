/*jslint node: true */
'use strict';

var fs = require('fs');
var app_name;
var app_id;
var url_scheme;
var small_thumb;
var large_thumb;
var small_thumb_path;
var large_thumb_path;

function convertToBase64(filename) {
    var binaryData,
        base64Data;

    binaryData = fs.readFileSync(filename);
    base64Data = new Buffer(binaryData).toString('base64');

    return base64Data;
}

function load(obj) {
    if (obj.app_name && obj.app_id && obj.url_scheme &&
        obj.small_thumb_path && obj.large_thumb_path) {

        app_name = obj.app_name;
        app_id = obj.app_id;
        url_scheme = obj.url_scheme;
        small_thumb_path = obj.small_thumb_path;
        large_thumb_path = obj.large_thumb_path;

        if (fs.existsSync(small_thumb_path)) {
            small_thumb = convertToBase64(small_thumb_path);
        } else {
            throw new Error('Small thumb does not exist');
        }

        if (fs.existsSync(large_thumb_path)) {
            large_thumb = convertToBase64(large_thumb_path);
        } else {
            throw new Error('Large thumb does not exist');
        }

    } else  {
        throw new Error('Missing required parameters!');
    }
}

function save(filename) {
    var obj;

    if (!filename) {
        throw new Error("Fileneame is not defined");
    }

    obj = {
        app_name: app_name,
        app_id: app_id,
        url_scheme: url_scheme,
        small_thumb: small_thumb,
        large_thumb: large_thumb
    };

    fs.writeFileSync(filename, JSON.stringify(obj, null, 4));
}


module.exports =  {
    load: load,
    save: save,
    get app_name() {
        return app_name;
    },
    set app_name(value) {
        app_name = value;
    },
    get app_id()  {
        return app_id;
    },
    set app_id(value) {
        app_id = value;
    },
    get url_scheme() {
        return url_scheme;
    },
    set url_scheme(value) {
        url_scheme = value;
    },
    get small_thumb_path() {
        return small_thumb_path;
    },
    set small_thumb_path(value) {
        small_thumb_path = value;
    },
    get large_thumb_path() {
        return large_thumb_path;
    },
    set large_thumb_path(value) {
        large_thumb_path = value;
    },
    get small_thumb() {
        return small_thumb;
    },
    set small_thumb(value) {
        small_thumb = value;
    },
    get large_thumb() {
        return large_thumb;
    },
    set large_thumb(value) {
        large_thumb = value;
    }
};
