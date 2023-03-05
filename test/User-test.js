import chai from 'chai';
import Booking from '../src/classes/Booking';
import User from '../src/classes/User';
import testData from './test-data';

const expect = chai.expect;

describe('User', () => {
  let user, allBookings, relevantBookings, rooms;

  beforeEach( () => {
    user = new User(testData.customers[0]);
    rooms = testData.rooms;
    allBookings = testData.bookings.map(booking => new Booking(booking));
    relevantBookings = allBookings.filter(booking => booking.userID === 1);
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

  it('Should have total dollars spent', () => {
    expect(user.totalSpent).to.equal(0);
  });

  it('Should have total rewards earned', () => {
    expect(user.totalRewards).to.equal(0);
  });

  it('Should have a list of booked days', () => {
    expect(user.bookings).to.deep.equal([]);
  });

  it('Should be able to find all the bookings relevant to that user', () => {
    user.getBookings(allBookings);
    expect(user.bookings).to.deep.equal(relevantBookings);
  });

  it('Should be able to calculate the total spent', () => {
    user.getBookings(allBookings);
    user.calculateTotalSpent(rooms);
    expect(user.totalSpent).to.equal(172.09);
  });

  it('Should be able to calculate rewards', () => {
    user.getBookings(allBookings);
    user.calculateTotalSpent(rooms);
    expect(user.totalRewards).to.equal(8);
  });
});