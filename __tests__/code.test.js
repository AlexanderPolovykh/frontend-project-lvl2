import { test, expect } from "@jest/globals";
import { fileURLToPath } from "node:url";
import * as nodePath from "node:path";
import genDiff from "../src/code.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const getFixturePath = (filename) => nodePath.join(__dirname, "..", "__fixtures__", filename);

test("genDiff", () => {
  expect(genDiff("", "")).toEqual("under construction..");
  expect(genDiff(getFixturePath("file1.json"), getFixturePath("file2.json")))
    .toEqual(`{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
}`);
});
