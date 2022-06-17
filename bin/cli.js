#!/usr/bin/env node

import { Command } from "commander";
import genDiff from "../index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.1.0")
  .helpOption("-h, --help", "output usage information")
  .option("-f, --format <type>", "output format", "stylish")
  .argument("<filepath1>", "first file to compare")
  .argument("<filepath2>", "second file to compare")
  // .formatHelp
  // .parse();
  .action((filepath1, filepath2, opts) => {
    let result = "nothing done!";
    if (opts.format === "stylish") {
      result = genDiff(filepath1, filepath2);
    }
    console.log(`${result}`);
  })
  .parse();

// const options = program.opts;
// const format = options.format;
// let result = 'none done!';
// if (format === 'normal' && program.args) {
//   result = genDiff(program)
// }
// console.log()
