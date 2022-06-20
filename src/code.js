import _ from 'lodash';
import parseFile from './parsers.js';
import formatObj from '../formatters/index.js';

const genDiff = (file1, file2, formatName) => {
  if (!file1 || !file2) return JSON.stringify({});
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);

  const iter = (o1, o2) => {
    if (!_.isObject(o1) && !_.isObject(o2) && o1 === o2) return o1;
    const ob1 = _.isArray(o1) ? o1[0] : o1;
    const ob2 = _.isArray(o2) ? o2[0] : o2;
    const entries1 = Object.entries(ob1);
    const entries2 = Object.entries(ob2);
    const keys1 = Object.keys(ob1);
    const keys2 = Object.keys(ob2);
    const unionEntrs = _.unionWith(entries1, entries2, _.isEqual); // no repeats
    const ob = unionEntrs.reduce((acc, [key, value]) => {
      // const ac = {};
      if (keys1.includes(key) && keys2.includes(key)) {
        if (_.isObject(ob1[key]) && _.isObject(ob2[key])) {
          if (acc[`${key}=`] !== undefined) return acc;
          return { ...acc, [`${key}=`]: iter(ob1[key], ob2[key]) };
        }
        if (!_.isEqual(ob2[key], value)) {
          return { ...acc, [`${key}-`]: iter(value, value) };
        }
        if (!_.isEqual(ob1[key], value)) {
          return { ...acc, [`${key}+`]: iter(value, value) };
        }
        return { ...acc, [`${key}=`]: iter(value, value) };
      } if (!keys1.includes(key)) {
        return { ...acc, [`${key}+`]: iter(value, value) };
      } if (!keys2.includes(key)) {
        return { ...acc, [`${key}-`]: iter(value, value) };
      }
      return { ...acc };
    }, {});
    return ob;
  };

  return formatObj(iter(obj1, obj2), formatName);
};

export default genDiff;
