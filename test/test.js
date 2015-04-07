/*global it, describe, beforeEach */
/*jslint node: true */
'use strict';
var expect = require('chai').expect;

describe('gen-json module initial state ', function () {
    var genJson;

    beforeEach(function () {
        genJson = require('../');
    });

    it('must have load property', function () {
        expect(genJson).to.have.property('load');
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

    it('must have an small_thumb property', function () {
        expect(genJson).to.have.property('small_thumb');
    });

    it('must have an large_thumb property', function () {
        expect(genJson).to.have.property('large_thumb');
    });

    it('must have an large_thumb_path property', function () {
        expect(genJson).to.have.property('large_thumb_path');
    });

    it('must have an large_thumb_path property', function () {
        expect(genJson).to.have.property('large_thumb_path');
    });
});

describe('load', function () {
    var genJson,
        sampleParams;

    beforeEach(function () {
        sampleParams = {
            app_name: "test_name",
            app_id: "test_id",
            url_scheme: "testscheme",
            small_thumb_path: "assets/small-thumb.png",
            large_thumb_path: "assets/large-thumb.png"
        };

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

});
