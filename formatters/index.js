import formatObjByStylish from "./stylish.js";
import formatObjByPlain from "./plain.js";

const formatObj = (obj, formatter) => {
  switch (formatter) {
    case "stylish":
      return formatObjByStylish(obj);
    case "plain":
      return formatObjByPlain(obj);
    default:
      return "unknown formatter!";
  }
};

export default formatObj;
