import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  const filePath = path.resolve(process.cwd(), file);
  const extNameInUppCase = path.extname(filePath).toUpperCase();
  const fd = fs.openSync(filePath);
  const fileStr = fs.readFileSync(fd, 'utf8');
  if (extNameInUppCase === '.JSON') {
    return JSON.parse(fileStr);
  }
  if (extNameInUppCase === '.YAML' || extNameInUppCase === '.YML') {
    return yaml.load(fileStr);
  }
  return 0;
};
