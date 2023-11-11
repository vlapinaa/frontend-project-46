#!/usr/bin/env node
/* eslint-disable import/extensions */

import { program } from 'commander';
import { parseFile, compareObjects } from '../src/parsing.js';
import stylish from '../src/stylish.js';

program.version('0.0.1', '-V, --version', 'output the version number');
program.argument('<filepath1>');
program.argument('<filepath2>');
program.option('-f, --format <type>', 'output format', stylish);
program.description('Compares two configuration files and shows a difference.');
program.helpOption('-h, --help', 'output usage information');
program.action((filepath1, filepath2, type) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const compare = compareObjects(file1, file2);
  console.log(stylish(compare));
});

program.parse();
