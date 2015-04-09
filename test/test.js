/*global it, describe, beforeEach */
/*jslint node: true */
'use strict';
var expect = require('chai').expect;
var fs = require('fs');
var extend = require('util')._extend;
var params = {
    app_name: "test_name",
    app_id: "test_id",
    url_scheme: "testscheme",
    small_thumb_path: "test/assets/small-thumb.png",
    large_thumb_path: "test/assets/large-thumb.png"
};

describe('gen-json module initial state ', function () {
    var genJson;

    beforeEach(function () {
        //remove module from cache
        delete require.cache[require.resolve('../')];
        genJson = require('../');
    });

    it('must have an app_name property', function () {
        expect(genJson).to.have.property('app_name');
    });

    it('must have an app_id property', function () {
        expect(genJson).to.have.property('app_id');
    });

    it('must have an url_scheme property', function () {
        expect(genJson).to.have.property('url_scheme');
    });

    it('must have a small_thumb property', function () {
        expect(genJson).to.have.property('small_thumb');
    });

    it('must have a large_thumb property', function () {
        expect(genJson).to.have.property('large_thumb');
    });

    it('must have a small_thumb_path property', function () {
        expect(genJson).to.have.property('small_thumb_path');
    });

    it('must have a large_thumb_path property', function () {
        expect(genJson).to.have.property('large_thumb_path');
    });
});

describe('getters and setters', function () {
    var genJson;

    beforeEach(function () {
        //remove module from cache
        delete require.cache[require.resolve('../')];
        genJson = require('../');
    });

    it('should properly store app_name', function () {
        genJson.app_name = params.app_name;
        expect(genJson.app_name).to.equal(params.app_name);
    });

    it('should properly store app_id', function () {
        genJson.app_id = params.app_id;
        expect(genJson.app_id).to.equal(params.app_id);
    });

    it('should properly store url_scheme', function () {
        genJson.url_scheme = params.url_scheme;
        expect(genJson.url_scheme).to.equal(params.url_scheme);
    });

    it('should properly store small_thumb_path', function () {
        genJson.small_thumb_path = params.small_thumb_path;
        expect(genJson.small_thumb_path).to.equal(params.small_thumb_path);
    });

    it('should properly store large_thumb_path', function () {
        genJson.large_thumb_path = params.large_thumb_path;
        expect(genJson.large_thumb_path).to.equal(params.large_thumb_path);
    });

    it('should set small_thumb as a read-only value', function () {
        expect(function () {
            genJson.small_thumb = "random_value";
        }).to.throw(Error);
    });

    it('should set large_thumb as a read-only value', function () {
        expect(function () {
            genJson.large_thumb = "random_value";
        }).to.throw(Error);
    });
});

describe('load', function () {
    var genJson,
        sampleParams;

    beforeEach(function () {
        sampleParams = extend({}, params);

        //remove module from cache
        delete require.cache[require.resolve('../')];
        genJson = require('../');
    });

    it ('should not throw an error if all required fields are supplied', function () {
        var load = function() {
            genJson.load(sampleParams);
        };
        expect(load).to.not.throw(Error);
    });

    it('should throw an error if app_name is not supplied', function () {
        expect(function () {
            delete sampleParams.app_name;
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should throw an error if app_id is not supplied', function () {
        expect(function () {
            delete sampleParams.app_id;
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should throw an error if url_scheme is not supplied', function () {
        expect(function () {
            delete sampleParams.url_scheme;
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should throw an error if small_thumb_path is not supplied', function () {
        expect(function () {
            delete sampleParams.url_scheme;
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should throw an error if large_thumb_path is not supplied', function () {
        expect(function () {
            delete sampleParams.large_thumb_path;
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should populate app_name property', function () {
        genJson.load(sampleParams);
        expect(genJson.app_name).equals(sampleParams.app_name);
    });

    it('should populate app_id property', function () {
        genJson.load(sampleParams);
        expect(genJson.app_id).equals(sampleParams.app_id);
    });

    it('should populate url_scheme property', function () {
        genJson.load(sampleParams);
        expect(genJson.url_scheme).equals(sampleParams.url_scheme);
    });

    it('should populate small_thumb_path property', function () {
        genJson.load(sampleParams);
        expect(genJson.small_thumb_path).equals(sampleParams.small_thumb_path);
    });

    it('should populate large_thumb_path property', function () {
        genJson.load(sampleParams);
        expect(genJson.large_thumb_path).equals(sampleParams.large_thumb_path);
    });

    it('should throw an error if small_thumb_path does not exist', function () {
        expect(function () {
            sampleParams.small_thumb_path = "bogus_path_does_not_exist.png";
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should throw an error if large_thumb_path does not exist', function () {
        expect(function () {
            sampleParams.large_thumb_path = "bogus_path_does_not_exist.png";
            genJson.load(sampleParams);
        }).to.throw(Error);
    });

    it('should generate the base64 version of small thumb', function () {
        var base64Version = fs.readFileSync('test/assets/small-thumb.base64', 'utf8');

        genJson.load(sampleParams);
        expect(genJson.small_thumb).to.equal(base64Version);
    });

    it('should generate the base64 version of large thumb', function () {
        var base64Version = fs.readFileSync('test/assets/large-thumb.base64', 'utf8');

        genJson.load(sampleParams);
        expect(genJson.large_thumb).to.equal(base64Version);
    });

});

describe("save", function () {
    var genJson,
        sampleParams,
        testOutputfile;

    beforeEach(function () {
        testOutputfile = "test/assets/testOutput.json";
        sampleParams = extend({}, params);

        //remove module from cache
        delete require.cache[require.resolve('../')];
        genJson = require('../');
    });

    it("should throw an error if the filename is not defined", function () {
        genJson.load(sampleParams);
        expect(function () {
            genJson.save();
        }).to.throw(Error);
    });

    it("should throw an error if required properties aren't set", function () {
        expect(function () {
            genJson.save(testOutputfile);
        }).to.throw(Error);
    });

    it("should save file as a json file", function () {
        var obj,
            objStr;

        genJson.load(sampleParams);
        genJson.save(testOutputfile);
        objStr = fs.readFileSync(testOutputfile);
        obj = JSON.parse(objStr);

        expect(obj.app_name).to.equal(genJson.app_name);
        expect(obj.app_id).to.equal(genJson.app_id);
        expect(obj.url_scheme).to.equal(genJson.url_scheme);
        expect(obj.small_thumb).to.equal(genJson.small_thumb);
        expect(obj.large_thumb).to.equal(genJson.large_thumb);
    });

});
