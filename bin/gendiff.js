#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2> ')

program.parse(process.argv);
