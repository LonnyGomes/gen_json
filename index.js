/*jslint node: true, unparam: true */
'use strict';

var fs = require('fs');
var app_name;
var app_id;
var url_scheme;
var small_thumb;
var large_thumb;
var small_thumb_path;
var large_thumb_path;
var requiredFields = [
    "app_name",
    "app_id",
    "url_scheme",
    "small_thumb_path",
    "large_thumb_path"
];

//
// Checks if object has required fields
// @returns null if all required fields are present or an error message
function checkForRequiredFields(obj, fields) {
    var idx,
        curField,
        result = null;

    for (idx = 0; idx < fields.length; idx++) {
        curField = fields[idx];

        if (!obj[curField]) {
            result = curField + " is not defined!";
            break;
        }
    }

    return result;
}

//
// Converts a binary file into it's base64 encoded counterpart
// @param filename - path to binary file
// @returns base64 encoded string representation of the binary file
function convertToBase64(filename) {
    var binaryData,
        base64Data;

    binaryData = fs.readFileSync(filename);
    base64Data = new Buffer(binaryData).toString('base64');

    return base64Data;
}

//
// Loads object of key value pairs into module
// as an alternative to manually setting each parameter
// @param load - object that contains key value pairs for all required params
function load(obj) {
    var resultMsg = checkForRequiredFields(obj, requiredFields);

    if (resultMsg) {
        throw new Error(resultMsg);
    }

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
}

function save(filename) {
    var obj,
        resultMsg;

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


    resultMsg = checkForRequiredFields(obj, requiredFields);
    //small_thumb_path and large_thumb_path are not defined in the object for writing
    //but if small_thumb and large_thumb are defined, we can still proceed
    if (resultMsg && ((!small_thumb) || (!large_thumb))) {
        throw new Error(resultMsg);
    }

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

        if (fs.existsSync(small_thumb_path)) {
            small_thumb = convertToBase64(small_thumb_path);
        } else {
            throw new Error('Small thumb does not exist');
        }
    },
    get large_thumb_path() {
        return large_thumb_path;
    },
    set large_thumb_path(value) {
        large_thumb_path = value;

        if (fs.existsSync(large_thumb_path)) {
            large_thumb = convertToBase64(large_thumb_path);
        } else {
            throw new Error('Large thumb does not exist');
        }
    },
    get small_thumb() {
        return small_thumb;
    },
    set small_thumb(value) {
        throw new Error("small_thumb is read only, instead set the small_thumb_path!");
    },
    get large_thumb() {
        return large_thumb;
    },
    set large_thumb(value) {
        throw new Error("large_thumb is read only, instead set the large_thumb_path!");
    }
};
