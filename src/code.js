import _ from "lodash";
import parseFile from "./parsers.js";

export default (file1, file2) => {
  let retStr = "No names of files!";
  if (!file1 || !file2) return retStr;
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  const generalEntries = _
    .intersectionWith(entries1, entries2, _.isEqual)
    .map((el) => [...el, 0]);
  const unionEntries = _.unionWith(entries1, entries2, _.isEqual);
  const diffEntries1 = _
    .xorWith(unionEntries, entries2, _.isEqual)
    .map((el) => [...el, -1]);
  const diffEntries2 = _
    .xorWith(unionEntries, entries1, _.isEqual)
    .map((el) => [...el, 1]);
  const allEntries = [...generalEntries, ...diffEntries1, ...diffEntries2];
  const sortedUnionEntries = _.sortBy(allEntries, (el) => el[0]);
  const arrStr = ["{"];
  sortedUnionEntries.forEach(([key, value, flag]) => {
    let ch = " ";
    switch (flag) {
      case 0:
        ch = " ";
        break;
      case -1:
        ch = "-";
        break;
      case 1:
        ch = "+";
        break;
      default:
    }
    arrStr.push(`  ${ch} ${key}: ${value}`);
  });
  arrStr.push(["}"]);
  retStr = arrStr.join("\n");
  return retStr;
};
