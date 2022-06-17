import { test, expect } from "@jest/globals";
import { fileURLToPath } from "node:url";
import * as nodePath from "node:path";
import * as fs from "node:fs";
import genDiff from "../src/code.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const getFixturePath = (filename) => nodePath.join(__dirname, "..", "__fixtures__", filename);
const diffResult = fs.readFileSync(fs.openSync(getFixturePath("diff.txt")), "utf8");

test("genDiff", () => {
  expect(genDiff("", "")).toEqual("{}");
  expect(genDiff(getFixturePath("file1.json"), getFixturePath("file2.json")))
    .toEqual(diffResult);
  expect(genDiff(getFixturePath("file1.yaml"), getFixturePath("file2.yaml")))
    .toEqual(diffResult);
});
