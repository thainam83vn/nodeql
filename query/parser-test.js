const cwd = process.cwd();
const QueryParser = new (require(`${cwd}/query/parser`))();
const expect = require("chai").expect;

describe("Query Parser", () => {
  it("extractInner", () => {
    let r = QueryParser.extractInner("query{id name}");
    expect(r).to.deep.eq(["query", "id name"]);
  });

  it("extract", () => {
    let r = QueryParser.extract("query{id customer{id name}}");
    console.log(r);
    // expect(r).to.deep.eq();
  });
});
