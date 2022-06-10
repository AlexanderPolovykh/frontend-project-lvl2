export default (entries) => {
  const arrStr = ["{"];
  entries.forEach(([key, value, flag]) => {
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
  return arrStr.join("\n");
};
