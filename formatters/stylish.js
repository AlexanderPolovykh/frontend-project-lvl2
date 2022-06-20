import _ from "lodash";

export default (value) => {
  const spacesCount = 2;
  const replacer = " ".repeat(spacesCount);

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
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
      .map(([key, val]) => {
        const key0 = key.slice(0, -1);
        let ch = "  ";
        if (key.endsWith("-")) {
          ch = "- ";
        } else if (key.endsWith("+")) {
          ch = "+ ";
        }
        const currentIndent0 = `${currentIndent.slice(0, -2)}${ch}`;
        return `${currentIndent0}${key0}: ${iter(val, depth + 1)}`;
      });

    return ["{", ...lines, `${bracketIndent}}`].join("\n");
  };

  return iter(value, 1);
};
