const expect = require("chai").expect,
  request = require("request"),
  url = "http://localhost:5000" 

describe("Website", function(){
  
  describe("Index page", function(){
    it("loads", function(){
      request(url + '/', function(error, response, body){
        expect(response.statusCode.to.equal(200))
        done()
      })
    })
  })

  describe("Map page", function(){
    it("loads", function(){
      request(url + "/TestMap", function(error, response, body){
        expect(response.statusCode.to.equal(200))
        done()
      })
    })
  })

  describe("404 page", function(){
    it("returns 404 correctly", function(){
      request(url + "/fdghdfdgjhgnjf", function(error, response, body){
        expect(response.statusCode.to.equal(404))
        done()
      })
    })
  })

})
