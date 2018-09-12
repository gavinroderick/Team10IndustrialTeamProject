const chai = require("chai");
const expect = chai.expect;
const request = require("superagent");
const url = "http://localhost:5000";
  
describe("Index page", function(){
  it("should return 200", function(done){
    request
      .get(url)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(err => {
        done(new Error(err.status + " - " + err.message));
      });
  });
});

describe("TestMap page", function(){
  it("should return 200", function(done){
    request
      .get(url + "/TestMap")
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(err => {
        done(new Error(err.status + " - " + err.message));
      });
  });
});
