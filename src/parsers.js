import * as fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export default (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const extNameInUppCase = path.extname(filePath).toUpperCase();
  const f1 = fs.openSync(filePath);
  const fileStr1 = fs.readFileSync(f1, "utf8");
  let obj = {};
  if (extNameInUppCase === ".JSON") {
    obj = JSON.parse(fileStr1);
  } else if (extNameInUppCase === ".YAML" || extNameInUppCase === ".YML") {
    [obj] = yaml.load(fileStr1);
  }
  return obj;
};
