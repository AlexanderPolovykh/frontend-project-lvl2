import formatObjByStylish from "./stylish.js";
import formatObjByPlain from "./plain.js";
import formatObjByJSON from "./json.js";

const formatObj = (obj, formatter) => {
  const formatBy = formatter !== undefined ? formatter : "stylish";
  switch (formatBy) {
    case "stylish":
      return formatObjByStylish(obj);
    case "plain":
      return formatObjByPlain(obj);
    case "json":
      return formatObjByJSON(obj);
    default:
      return "Unknown formatter!";
  }
};

export default formatObj;
