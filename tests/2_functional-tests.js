const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2

    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });

    // #3 - FAIL
   test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "Colombo" }) // send payload
        .end(function (err, res) {
          assert.equal(res.status, 200, 'status must be 200');
          assert.equal(res.type, 'application/json', 'reponse type must be json');
          assert.equal(res.body.name, 'Cristoforo', 'body.name must be "Cristoforo"');
          assert.equal(res.body.surname, 'Colombo', 'body.surname must be "Colombo"');
          done();
        });
    }); // test Colombo
  });

  // #4
test('send {surname: "da Verrazzano"}', function (done) {
    chai.request(server)
      .put("/travellers")
      .send({ surname: "da Verrazzano" })
      .end(function (err, res) {
        //console.log('>>>RES BODY =', res.body); // OK
        assert.equal(res.status, 200, 'status must be 200');
        assert.equal(res.type, 'application/json', 'reponse type must be json');
        assert.equal(res.body.name, 'Giovanni', 'res.body.name must be "Giovanni"');
        assert.equal(res.body.surname, 'da Verrazzano', 'res.body.surname must be "da Verrazzano"');
        done();
      });
  }); // end test


}); // functiona; tests

/*
const Browser = require("zombie");


suite("Functional Tests with Zombie.js", function () {

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton("submit", function () {
        assert.fail();

        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      assert.fail();

      done();
    });
  });
  
});
*/