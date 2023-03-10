import chai from 'chai';
import BookingRepository from '../src/classes/BookingRepository';
import testData from './test-data';
import User from '../src/classes/User';

const expect = chai.expect;

describe('Booking Repository', () => {
  let bookingRepo, bookings, rooms, users;

  beforeEach( () => {
    bookings = testData.bookings;
    rooms = testData.rooms;
    users = testData.customers;
    bookingRepo = new BookingRepository(bookings, rooms, users);
  });

  it('Should be an instance of Booking Repository', () => {
    expect(bookingRepo).to.be.an.instanceOf(BookingRepository);
  });

  it('Should have current bookings', () => {
    expect(bookingRepo.bookings).to.deep.equal(bookings);
  });

  it('Should have a list of all rooms', () => {
    expect(bookingRepo.rooms).to.deep.equal(rooms);
  });

  it('Should have a list of all customers', () => {
    expect(bookingRepo.users).to.deep.equal(users.map(user => new User(user)));
  });

  it('Should have a list of all available rooms', () => {
    expect(bookingRepo.availableRooms).to.deep.equal([]);
  });

  it('Should be able to show available rooms for a given date', () => {
    let availableRooms = [
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 3,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      },
      {
        "number": 4,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      },
      {
        "number": 5,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
      },
      {
        "number": 6,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
      {
        "number": 7,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 231.46
      },
      {
        "number": 8,
        "roomType": "junior suite",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 261.26
      },
      {
        "number": 9,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 200.39
      },
      {
        "number": 10,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 1,
        "costPerNight": 497.64
      },
      {
        "number": 11,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 207.24
      },
      {
        "number": 12,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 172.09
      },
      {
        "number": 13,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 423.92
      },
      {
        "number": 14,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 1,
        "costPerNight": 457.88
      },
      {
        "number": 16,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 325.6
      },
      {
        "number": 17,
        "roomType": "junior suite",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 328.15
      },
      {
        "number": 18,
        "roomType": "junior suite",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 2,
        "costPerNight": 496.41
      },
      {
        "number": 19,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 374.67
      },
      {
        "number": 20,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 343.95
      },
      {
        "number": 21,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 429.32
      },
      {
        "number": 22,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 350.31
      },
      {
        "number": 23,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 176.36
      },
      {
        "number": 24,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 327.24
      },
      {
        "number": 25,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 305.85
      }
    ];
    expect(bookingRepo.getAvailableRooms('2022/04/22')).to.deep.equal(availableRooms);
    expect(bookingRepo.availableRooms).to.deep.equal(availableRooms);
  });

  it('Should be able to get the total booked dollars for a given date', () => {
    expect(bookingRepo.getTotalBookedDollars('2022/04/22')).to.equal(295);
  });

  it('Should be able find a user based on the username', () => {
    let user = new User(users[0]);
    expect(bookingRepo.getUserInfo('Leatha Ullrich')).to.deep.equal(user);
    expect(bookingRepo.getUserInfo('Johnny Bravo')).to.equal(undefined);
  });


});