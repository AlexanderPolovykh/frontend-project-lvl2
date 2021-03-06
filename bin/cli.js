#!/usr/bin/env node

import { Command } from 'commander';
// eslint-disable-next-line import/no-extraneous-dependencies
import genDiff from '@hexlet/code';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'first file to compare')
  .argument('<filepath2>', 'second file to compare')
  // .formatHelp
  // .parse();
  .action((filepath1, filepath2, opts) => {
    // let result = "nothing done!";
    // if (opts.format === "stylish") {
    const result = genDiff(filepath1, filepath2, opts.format);
    // }
    console.log(result);
  })
  .parse();
