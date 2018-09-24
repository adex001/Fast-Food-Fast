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
describe('Auth Controller Signin TEst', () => {
  const correctSigninDetails = {
    email: 'tester@gmail.com',
    password: 'password',
  };
  const incorrectSigninDetails = {
    email: 'incorrect@gmail.com',
    password: 'password',
  };
  const incorrectSigninDetails2 = {
    email: 'tester@gmail.com',
    password: 'incorrectpassword',
  };
  it('Signin to the app with correct details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(correctSigninDetails)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.status.should.eql('success');
        response.body.message.should.eql('user authenticated and signed in');
        response.body.token.should.be.an('string');
        done();
      });
  });
  it('Not Signin to the app with incorrect email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(incorrectSigninDetails)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('Email does not exist');
        done();
      });
  });
  it('Not Signin to the app with incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(incorrectSigninDetails2)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('Login failed');
        done();
      });
  });
});
