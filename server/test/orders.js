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
  it('Tests for fetch single order not found', (done) => {
    chai.request(app)
      .get('/api/v1/orders/100')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Order not found!');
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
      .send({
        meals:
        [{
          mealId: 3,
          quantity: 1,
        },
        {
          mealId: 1,
          quantity: 2,
        },
        ],
      })
      .end((err, response) => {
        response.body.message.should.eql('Updates a specific order');
        done();
      });
  });
  it('Cannot update an invalid order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/10000')
      .set('Accept', 'application/json')
      .send({})
      .end((err, response) => {
        response.body.message.should.eql('Order not found!');
        done();
      });
  });
});
