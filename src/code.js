import _ from "lodash";
import parseFile from "./parsers.js";

export default (file1, file2) => {
  let retStr = "No names of files!";
  if (!file1 || !file2) return retStr;
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  const generalEntries = _.intersectionWith(entries1, entries2, _.isEqual);
  const unionEntries = _.unionWith(entries1, entries2, _.isEqual);
  const sortedUnionEntries = _.sortBy(unionEntries, (el) => el[0]);
  const arrStr = ["{"];
  sortedUnionEntries.forEach(([key, value]) => {
    let dontExit = true;
    generalEntries.forEach((el) => {
      if (_.isEqual(el, [key, value])) {
        arrStr.push(`    ${key}: ${value}`);
        dontExit = false;
      }
    });
    if (dontExit) {
      entries1.forEach((el) => {
        if (_.isEqual(el, [key, value])) {
          arrStr.push(`  - ${key}: ${value}`);
          dontExit = false;
        }
      });
    }
    if (dontExit) {
      entries2.forEach((el) => {
        if (_.isEqual(el, [key, value])) {
          arrStr.push(`  + ${key}: ${value}`);
        }
      });
    }
  });
  arrStr.push(["}"]);
  retStr = arrStr.join("\n");
  return retStr;
};
