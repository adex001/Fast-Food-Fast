import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Auth Controller Signup Test', () => {
  const correctSignupDetails = {
    email: 'tester@gmail.com',
    password: 'password',
    firstname: 'Testing',
    lastname: 'Tester',
    isAdmin: true,
  };
  const serverErrorDetails = {
    email: 'testererror@gmail.com',
    password: 'password',
    firstname: 'Testing',
    lastname: 'Tester',
    isAdmin: 'badoooo',
  };

  it('Tests to signup successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(correctSignupDetails)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.status.should.eql('success');
        response.body.message.should.eql('User Registered and signed in');
        done();
      });
  });
  it('Tests to show email already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(correctSignupDetails)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('email address already exists.');
        done();
      });
  });
  it('Tests to make sure it results to internal server error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(serverErrorDetails)
      .end((err, response) => {
        response.should.have.status(500);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('internal server error!');
        done();
      });
  });
});
