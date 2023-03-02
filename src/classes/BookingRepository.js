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

  addBooking(room, date, user) {
    let bookingObject = {
      id: Date.now(),
      userID: user,
      date: date,
      roomNumber: room
    };

    let newBooking = new Booking(bookingObject);

    this.bookings.push(newBooking);

    this.availableRooms.forEach((availRoom, index) => {
      if (availRoom.number === room) {
        this.availableRooms.splice(index, 1);
      }
    });
  }

}

export default BookingRepository;