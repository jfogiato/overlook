import chai from 'chai';
import Room from '../src/classes/Room';
import testData from './test-data';

const expect = chai.expect;

describe('Room', function() {
  let room;

  beforeEach( () => {
    room = new Room(testData.rooms[0]);
  });

  it('Should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('Should have a number', () => {
    expect(room.number).to.equal(1);
  });

  it('Should have a type', () => {
    expect(room.roomType).to.equal('residential suite');
  });

  it('Should know whether or not it has a bidet', () => {
    expect(room.bidet).to.equal(true);
  });

  it('Should have a bed size', () => {
    expect(room.bedSize).to.equal('queen');
  });

  it('Should have the number of beds', () => {
    expect(room.numBeds).to.equal(1);
  });

  it('Should have a cost per night', () => {
    expect(room.costPerNight).to.equal(358.4);
  });
});
