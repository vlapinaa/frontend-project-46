#!/usr/bin/env node
import { program } from 'commander';
import calculateDifference from '../src/index.js';

program.version('0.0.1', '-V, --version', 'output the version number');
program.argument('<filepath1>');
program.argument('<filepath2>');
program.option('-f, --format <type>', 'output format', 'stylish');
program.description('Compares two configuration files and shows a difference.');
program.helpOption('-h, --help', 'output usage information');
program.action((filepath1, filepath2, type) => {
  console.log(calculateDifference(filepath1, filepath2, type.format));
});

program.parse();
