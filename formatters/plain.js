import _ from "lodash";

export default (value) => {
  const iter = (currentValue, parentName) => {
    if (!_.isObject(currentValue)) {
      return [];
    }
    const lines = Object.entries(currentValue)
      .sort(([key1], [key2]) => {
        const k1 = key1.slice(0, -1);
        const k2 = key2.slice(0, -1);
        if (k1 > k2) return 1;
        if (k1 < k2) return -1;
        if (key1.endsWith("+")) return 1;
        if (key1.endsWith("-")) return -1;
        return 0;
      })
      .map(([key, val], idx, arr) => {
        const key0 = key.slice(0, -1);
        const retKey = (parentName !== "") ? `${parentName}.${key0}` : `${key0}`;
        const [nextKey, nextVal] = arr[idx + 1] ?? [];
        const [prevKey] = arr[idx - 1] ?? [];
        const retValue = (v) => {
          if (_.isObject(v)) return "[complex value]";
          if (typeof v === 'string') return `'${v}'`
          return v; // .toString();
        };
        if (key.endsWith('-')) {
          if (idx < arr.length && nextKey.slice(0, -1) === key0) {
            return `Property '${retKey}' was updated. From ${retValue(val)} to ${retValue(nextVal)}`;
          }
          return `Property '${retKey}' was removed`;
        }
        if (key.endsWith('+')) {
          if (idx > 0 && prevKey.slice(0, -1) === key0) return [];
          return `Property '${retKey}' was added with value: ${retValue(val)}`;
        }
        if (key.endsWith('=')) {
          return iter(val, retKey);
        }
        return [];
      }, '');
    const ret = [...lines];
    return ret.flat().join("\n");
  };

  return iter(value, '');
};
