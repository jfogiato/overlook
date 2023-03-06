import Booking from "./Booking";
import Room from "./Room";
import User from "./User";

class BookingRepository {
  constructor(bookings, rooms, users) {
    this.bookings = bookings.map(booking => new Booking(booking));
    this.rooms = rooms.map(room => new Room(room));
    this.users = users.map(user => new User(user));
    this.availableRooms = [];
  }

  getAvailableRooms(date) {
    let unavailableRooms = this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, []);

    this.availableRooms = this.rooms.reduce((acc, room) => {
        if (!unavailableRooms.includes(room.number)) {
          acc.push(room);
        }
      return acc;
    }, []);

    return this.availableRooms;
  }

  getTotalBookedDollars(date) {
    return Math.round(this.bookings.reduce((acc, booking) => {
      if(booking.date === date) {
        this.rooms.forEach(room => {
          if (room.number === booking.roomNumber) {
            acc += room.costPerNight;
          }
        });
      }
      return acc;
    }, 0));
  }

  getUserInfo(name) {
    return this.users.find(user => user.name === name);
  }

}

export default BookingRepository;