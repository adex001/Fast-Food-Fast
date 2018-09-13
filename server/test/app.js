import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Display the homepage message', () => {
  it('should display "Welcome to fast-food-fast API" and a status of 200', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.body.message.should.eql('Welcome to fast-food-fast API');
        done();
      });
  });
  it('should have a status of 200', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});