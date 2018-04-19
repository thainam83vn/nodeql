const operators = require(`${process.cwd()}/filter/operators`);
const arrOperators = Object.keys(operators);
module.exports = class Filter {
  clean(s) {
    let r = "";
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "{" || s[i] === "}") r += ` ${s[i]} `;
      else r += s[i];
    }
    while (~r.indexOf("  ")) r = r.replace("  ", " ");
    return r;
  }

  exec(s) {
    s = this.clean(s);
    const arr = s.split(" ");
    return this.extract(arr);
  }

  extract(arr) {
    let result = {};
    for (let i = 0; i < arr.length; ) {
      if (arr[i] === "{" || arr[i] === "}" || arr[i] === " ") continue;
      if (i + 1 < arr.length && arr[i + 1] === "{") {
        let level = 1;
        let inners = [];
        let j = i + 2;
        for (; j < arr.length; j++) {
          if (arr[j] === "{") {
            level++;
            inners.push("{");
          } else if (arr[j] === "}") {
            level--;

            if (level === 0) {
              break;
            } else {
              inners.push("}");
            }
          } else inners.push(arr[j]);
        }
        let innerResult = this.extract(inners);
        result = { ...result, ...operators[arr[i]](innerResult) };
        i = j + 1;
        continue;
      } else {
        let operator;
        for (let op of arrOperators) {
          if (~arr[i].indexOf(op)) operator = op;
        }
        const [field, value] = arr[i].split(operator);
        if (operator) {
          result = {
            ...result,
            ...operators[operator](field, value)
          };
        }
      }
      i++;
    }
    return result;
  }
};
