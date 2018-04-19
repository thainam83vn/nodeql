module.exports = {
  "=": (field, value) => {
    return { [field]: { $eq: value } };
  },
  "~": (field, value) => {
    return { [field]: { $regex: value, $options: "i" } };
  },
  "<>": (field, value) => {
    return { [field]: { $ne: value } };
  },
  ">": (field, value) => {
    return { [field]: { $gt: value } };
  },
  "<": (field, value) => {
    return { [field]: { $lt: value } };
  },
  ">=": (field, value) => {
    return { [field]: { $ge: value } };
  },
  "<=": (field, value) => {
    return { [field]: { $le: value } };
  },
  and: inner => {
    let values = [];
    for (let k in inner) {
      values.push({ [k]: inner[k] });
    }
    return { $and: values };
  },
  or: inner => {
    let values = [];
    for (let k in inner) {
      values.push({ [k]: inner[k] });
    }
    return { $or: values };
  }
};
