import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Orders Routes API test', () => {
  it('Tests for Get all order', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Gets all orders!!');
        done();
      });
  });
  it('Tests for fetch a single order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Fetches a single order');
        done();
      });
  });
  it('Tests to place a single order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        response.body.message.should.eql('place a single order');
        done();
      });
  });
  it('Tests to update the status of an order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        response.body.message.should.eql('Updates the status of an order');
        done();
      });
  });
});