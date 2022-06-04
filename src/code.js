import * as fs from "node:fs";
import path from "node:path";
import _ from "lodash";

export default (file1, file2) => {
  let retStr = "under construction..";
  const filePath1 = path.resolve(process.cwd(), file1);
  const filePath2 = path.resolve(process.cwd(), file2);
  const extName1 = path.extname(filePath1);
  const extName2 = path.extname(filePath2);
  const f1 = fs.openSync(filePath1);
  const fileStr1 = fs.readFileSync(f1, "utf8");
  let obj1 = {};
  if (extName1.toUpperCase() === ".json".toUpperCase()) {
    obj1 = JSON.parse(fileStr1);
  }
  const f2 = fs.openSync(filePath2);
  const fileStr2 = fs.readFileSync(f2, "utf8");
  let obj2 = {};
  if (extName2.toUpperCase() === ".json".toUpperCase()) {
    obj2 = JSON.parse(fileStr2);
  }
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  const arrStr = ["{"];
  entries1.map(([key1, val1]) => {
    entries2.map(([key2, val2], idx, arr) => {
      if (key1 === key2) {
        if (val1 === val2) {
          arrStr.push(`    ${key1}: ${val1}`);
        } else {
          arrStr.push(`  - ${key1}: ${val1}`);
          arrStr.push(`  + ${key2}: ${val2}`);
        }
      } else if (idx === arr.length - 1) {
        arrStr.push(`  - ${key1}: ${val1}`);
      }
    });
  });
  arrStr.push(["}"]);
  retStr = arrStr.join("\n");
  return retStr;
};
