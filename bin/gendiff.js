#!/usr/bin/env node

const { program } = require('commander');

program.version('0.0.1', '-V, --version', 'output the version number');
program.description('Compares two configuration files and shows a difference.')
program.helpOption('-h, --help', 'output usage information');

program.parse();