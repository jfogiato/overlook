import chai from 'chai';
import User from '../src/classes/User';
import testData from './test-data';

const expect = chai.expect;

describe('User', () => {
  let user;

  beforeEach( () => {
    user = new User(testData.customers[0]);
  });

  it('Should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('Should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('Should have a name', () => {
    expect(user.name).to.equal('Leatha Ullrich');
  });

  it('Should have a username', () => {
    expect(user.userName).to.equal('customer1');
  });

  it('Should have a password', () => {
    expect(user.password).to.equal('overlook2021');
  });

});