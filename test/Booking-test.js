import chai from 'chai';
import Booking from '../src/classes/Booking';
import testData from './test-data';

const expect = chai.expect;

describe('Booking', () => {
  let booking;

  beforeEach( () => {
    booking = new Booking(testData.bookings[0]);
  });

  it('Should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceOf(Booking);
  });
  
  it('Should have an ID', () => {
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz');
  });
  
  it('Should have a date', () => {
    expect(booking.date).to.equal('2023/04/22');
  });
  
  it('Should have a room number', () => {
    expect(booking.roomNumber).to.equal(1);
  });
});