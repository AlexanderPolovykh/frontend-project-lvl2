import { test, expect } from "@jest/globals";
import { fileURLToPath } from "node:url";
import * as nodePath from "node:path";
import genDiff from "../src/code.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const getFixturePath = (filename) => nodePath.join(__dirname, "..", "__fixtures__", filename);

test("genDiff", () => {
  expect(genDiff("", "")).toEqual("No names of files!");
  expect(genDiff(getFixturePath("file1.json"), getFixturePath("file2.json")))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(genDiff(getFixturePath("file1.yaml"), getFixturePath("file2.yaml")))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  //   expect(genDiff(getFixturePath("file1.yaml"), getFixturePath("file2.yaml")))
  //     .toEqual(`{
  //   - follow: false
  //     host: hexlet.io
  //   - proxy: 123.234.53.22
  //   - timeout: 50
  //   + timeout: 20
  //   + verbose: true
  // }`);
});
