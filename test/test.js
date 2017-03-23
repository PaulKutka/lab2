const app = require('../expressApp').app;
const request = require('supertest');
const assert = require('assert');


describe('Test Todo Api', () =>  {
  describe('Repository is empty',() => {
    it('should return repository is empty', () => {
        return request(app)
      .get('/todo/api/')
      .set('Accept', 'application/json')
      .expect(200, 'Repository is empty');
    });
  });

  //   describe('#indexOf()', function() {
  //   it('should return -1 when the value is not present', function() {
  //     assert.equal(-1, [1,2,3].indexOf(4));
  //   });
  // });

});