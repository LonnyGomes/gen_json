#!/usr/bin/env node
'use strict';
var meow = require('meow');
var genJson = require('./');

var cli = meow({
  help: [
    'Usage',
    '  gen-json <input>',
    '',
    'Example',
    '  gen-json Unicorn'
  ].join('\n')
});

genJson(cli.input[0]);
