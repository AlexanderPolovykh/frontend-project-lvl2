import { test, expect } from "@jest/globals";
import { fileURLToPath } from "node:url";
import * as nodePath from "node:path";
import * as fs from "node:fs";
// eslint-disable-next-line import/no-extraneous-dependencies
import genDiff from "@hexlet/code";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const getFixturePath = (filename) => nodePath
  .join(__dirname, "..", "__fixtures__", filename);
const diffStylishResult = fs.readFileSync(
  fs.openSync(getFixturePath("diff-stylish.txt")),
  "utf8",
);
const diffPlainResult = fs.readFileSync(
  fs.openSync(getFixturePath("diff-plain.txt")),
  "utf8",
);

test("genDiff", () => {
  expect(genDiff("", "")).toEqual("{}");
  expect(
    genDiff(getFixturePath("file1.json"), getFixturePath("file2.json")))
    .toEqual(diffStylishResult);
  expect(
    genDiff(getFixturePath("file1.yaml"), getFixturePath("file2.yaml"), "stylish"),
  ).toEqual(diffStylishResult);
  expect(
    genDiff(getFixturePath("file1.json"), getFixturePath("file2.json"), "plain"),
  ).toEqual(diffPlainResult);
  expect(
    genDiff(getFixturePath("file1.yaml"), getFixturePath("file2.yaml"), "plain"),
  ).toEqual(diffPlainResult);
});
