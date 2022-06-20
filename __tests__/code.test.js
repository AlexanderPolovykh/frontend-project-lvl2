import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as nodePath from 'path';
import * as fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import genDiff from '@hexlet/code';

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const getFixturePath = (filename) => nodePath.join(__dirname, '..', '__fixtures__', filename);
const diffStylishResult = fs.readFileSync(
  fs.openSync(getFixturePath('diff-stylish.txt')),
  'utf8',
);
const diffPlainResult = fs.readFileSync(
  fs.openSync(getFixturePath('diff-plain.txt')),
  'utf8',
);
const diffJSONResult = fs.readFileSync(
  fs.openSync(getFixturePath('diff-json.txt')),
  'utf8',
);

test('genDiff', () => {
  expect(genDiff('', '')).toEqual('{}');
  expect(
    genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'stylish',
    ),
  ).toEqual(diffStylishResult);
  expect(
    genDiff(
      getFixturePath('file1.yaml'),
      getFixturePath('file2.yaml'),
      'stylish',
    ),
  ).toEqual(diffStylishResult);
  expect(
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'),
  ).toEqual(diffPlainResult);
  expect(
    genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain'),
  ).toEqual(diffPlainResult);
  expect(
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'),
  ).toEqual(diffJSONResult);
  expect(
    genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json'),
  ).toEqual(diffJSONResult);
});
