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


