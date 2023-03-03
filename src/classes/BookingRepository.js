import Booking from "./Booking";
import Room from "./Room";

class BookingRepository {
  constructor(bookings, rooms) {
    this.bookings = bookings.map(booking => new Booking(booking));
    this.rooms = rooms.map(room => new Room(room));
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
    return this.bookings.reduce((acc, booking) => {
      if(booking.date === date) {
        this.rooms.forEach(room => {
          if (room.number === booking.roomNumber) {
            acc += room.costPerNight;
          }
        });
      }
      return acc
    }, 0);
  }

}

export default BookingRepository;