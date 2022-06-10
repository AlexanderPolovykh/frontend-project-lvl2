import * as fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export default (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const extNameInUppCase = path.extname(filePath).toUpperCase();
  const fd = fs.openSync(filePath);
  const fileStr = fs.readFileSync(fd, "utf8");
  let obj = {};
  if (extNameInUppCase === ".JSON") {
    obj = JSON.parse(fileStr);
  } else if (extNameInUppCase === ".YAML" || extNameInUppCase === ".YML") {
    [obj] = yaml.load(fileStr);
  }
  return obj;
};
