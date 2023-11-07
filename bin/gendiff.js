#!/usr/bin/env node
/* eslint-disable import/extensions */

import { program } from 'commander';
import { parseFile, compareFiles } from '../src/parsing.js';

program.version('0.0.1', '-V, --version', 'output the version number');
program.argument('<filepath1>');
program.argument('<filepath2>');
program.option('-f, --format <type>', 'output format');
program.description('Compares two configuration files and shows a difference.');
program.helpOption('-h, --help', 'output usage information');
program.action((filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  console.log(compareFiles(file1, file2));
});

program.parse();
