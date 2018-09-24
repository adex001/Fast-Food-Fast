import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();
// Signs in an admin user
let adminToken = null;
let userToken = null;
const wrongToken = 'jkwvweocneovnweovnwkvkwdnvewvewlkjewgew.ewgewgwekjgowehgowqehgqewgwegwqegeq.qrghrgkhwdiohgwuge';

describe('Test for Menu', () => {
  const adminLoginDetails = {
    email: 'tester@gmail.com',
    password: 'password',
  };
  const userLoginDetails = {
    email: 'tester2@gmail.com',
    password: 'password',
  }
  const correctMenuItem = {
    mealName: 'eba and abula',
    mealImageUrl: 'http://mealImageId.com/image1',
    mealDescription: 'A very great meal',
    mealPrice: 300,
  };
  const incorrectMenuItem = {
    mealName: 'eba and abula',
    mealImageUrl: 'http://mealImageId.com/image1',
    mealDescription: 'A very great meal',
    mealPrice: 'createerror',
  };
  it('Logins an admin account to get the token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(adminLoginDetails)
      .end((err, response) => {
        adminToken = response.body.token;
        done();
      });
  });
  it('Logins an user account to get the token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(userLoginDetails)
      .end((err, response) => {
        userToken = response.body.token;
        done();
      });
  });
  it('should add a new menu', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(correctMenuItem)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.status.should.eql('success');
        response.body.message.should.eql('Meal has been added to the menu');
        response.body.data.should.be.an('object');
        done();
      });
  });
  it('should not add a new meal if price is not integer ', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(incorrectMenuItem)
      .end((err, response) => {
        response.should.have.status(500);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('internal server error');
        done();
      });
  });
  it('should display error when token is not present', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .send(correctMenuItem)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('No token provided!');
        done();
      });
  });
  it('should display error when wrong token is presented', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('token', wrongToken)
      .send(correctMenuItem)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('Token cannot be verified');
        done();
      });
  });
  it('should not add a new meal if user is not an admin ', (done) => {
    chai.request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('token', userToken)
      .send(incorrectMenuItem)
      .end((err, response) => {
        response.should.have.status(403);
        response.body.status.should.eql('failed');
        response.body.message.should.eql('You do not have the permission to access this resource!');
        done();
      });
  });
});
