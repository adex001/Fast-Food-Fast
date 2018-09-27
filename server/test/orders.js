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
        response.body.status.should.eql('success');
        response.should.have.status(200);
        done();
      });
  });
  it('Tests for fetch a single order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.status.should.eql('success');
        response.should.have.status(200);
        done();
      });
  });
  it('Tests for fetch single order not found', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1000')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Order not found!');
        response.should.have.status(404);
        done();
      });
  });
  it('Tests to place a single order', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Delivered',
        totalPrice: 9000,
        meals: [{
          mealsId: 1,
          quantity: 0,
        }],
      })
      .end((err, response) => {
        response.body.message.should.eql('Order was placed');
        done();
      });
  });
  it('It should give an error when no totalPrice', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Delivered',
        totalPrice: '',
        meals: [{
          mealsId: 1,
          quantity: 2,
        }],
      })
      .end((err, response) => {
        response.body.message.should.eql('Total price should be a number greater than zero');
        done();
      });
  });
  it('It should give an error when given invalid parameters', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'SHOW ME ERROR',
        totalPrice: 9000,
        meals: [{
          mealsId: 1,
          quantity: 2,
        }],
      })
      .end((err, response) => {
        response.body.message.should.eql('Order status should be either Pending, Delivered or Cancelled');
        response.should.have.status(400);
        done();
      });
  });
  it('It should give an error when meals is a string', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Delivered',
        totalPrice: 9000,
        meals: '[{mealsId: 1,quantity, 2,}]',
      })
      .end((err, response) => {
        response.body.message.should.eql('Meals should be an array!');
        response.should.have.status(400);
        done();
      });
  });
  it('It should give an error when meal is a number', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Delivered',
        totalPrice: 9000,
        meals: [1, 2],
      })
      .end((err, response) => {
        response.body.message.should.eql('Meal is not an object!');
        response.should.have.status(400);
        done();
      });
  });
  it('It should give an error when quantity is a not a number', (done) => {
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Delivered',
        totalPrice: 9000,
        meals: [{
          mealsId: 1,
          quantity: '234',
        }],
      })
      .end((err, response) => {
        response.body.message.should.eql('Meal or quantity is not a number or less than 1!');
        response.should.have.status(400);
        done();
      });
  });
  it('Tests to update the status of an order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Cancelled',
        totalPrice: 4000,
        meals: [{
          mealsId: 1,
          quantity: 2,
        }],
      })
      .end((err, response) => {
        response.body.message.should.eql('Order was updated');
        response.should.have.status(200);
        done();
      });
  });
  it('Cannot update an invalid order', (done) => {
    chai.request(app)
      .put('/api/v1/orders/10000')
      .set('Accept', 'application/json')
      .send({
        orderStatus: 'Cancelled',
        totalPrice: 4000,
        meals: [{
          mealsId: 1,
          quantity: 2,
        }],
      })
      .end((err, response) => {
        response.body.message.should.eql('Order not found!');
        response.should.have.status(404);
        done();
      });
  });
});
