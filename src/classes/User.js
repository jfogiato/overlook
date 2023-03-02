class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.userName = `customer${userData.id}`;
    this.password = 'overlook2021';
    this.bookings = [];
    this.totalSpent = 0;
    this.totalRewards = 0;
  }

  getBookings(allBookingData) {
    this.bookings = allBookingData.filter(booking => booking.userID === this.id);
    console.log(this.bookings);
  }

  calculateTotalSpent(allRooms) {
    this.totalSpent = this.bookings.reduce((acc, booking) => {
      acc += allRooms.find(room => room.number === booking.roomNumber).costPerNight
      return acc;
    }, 0);
    
    this.calculateRewards();
  }

  calculateRewards() {
    this.totalRewards = Math.floor(this.totalSpent * .05);
  }

}

export default User;