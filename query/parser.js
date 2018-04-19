module.exports = class QueryParser {
  clean(s) {
    s = s.replace("{", " { ").replace("}", " } ");
    while (~s.indexOf("  ")) s = s.replace("  ", " ");
    return s;
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
        let r = { [arr[i]]: this.extract(inners) };
        result = { ...result, ...r };
        i = j + 1;
        continue;
      } else {
        result = { ...result, [arr[i]]: true };
      }
      i++;
    }
    return result;
  }
};
