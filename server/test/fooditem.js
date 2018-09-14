import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Food Item Routes API test', () => {
  it('Tests for Get all food items', (done) => {
    chai.request(app)
      .get('/api/v1/fooditem')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('gets all fast-food items');
        done();
      });
  });
  it('Tests for add a food item', (done) => {
    chai.request(app)
      .post('/api/v1/fooditem')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Adds a fast-food item');
        done();
      });
  });
  it('Tests to update a particular food item', (done) => {
    chai.request(app)
      .put('/api/v1/fooditem/1')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        response.body.message.should.eql('Updates a particular food item');
        done();
      });
  });
  it('Tests to delete a particular food item', (done) => {
    chai.request(app)
      .delete('/api/v1/fooditem/1')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        response.body.message.should.eql('Deletes a particular food item');
        done();
      });
  });
});