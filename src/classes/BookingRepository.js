import Booking from "./Booking";
import Room from "./Room";

class BookingRepository {
  constructor(bookings, rooms) {
    this.bookings = bookings.map(booking => new Booking(booking));
    this.rooms = rooms.map(room => new Room(room));
  }

  getAvailableRooms(date) {
    let unavailableRooms = this.bookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking.roomNumber);
      }
      return acc;
    }, []);

    return this.rooms.reduce((acc, room) => {
        if (!unavailableRooms.includes(room.number)) {
          acc.push(room);
        }
      return acc;
    }, []);
  }

}

export default BookingRepository;