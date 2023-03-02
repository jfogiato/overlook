// IMPORTS 📥
import './css/styles.css';
import './images/hotel-logo.png';
import './images/hotel-room.png';
import User from './classes/User';
import Booking from './classes/Booking';
import Room from './classes/Room';
import apiRequest from './api-calls';
import testData from '../test/test-data';
import BookingRepository from './classes/BookingRepository';

// DOM VARIABLES 🖥️
const userName = document.getElementById('userName');
const totalSpent = document.getElementById('totalSpent');
const totalRewards = document.getElementById('totalRewards');
const modalSection = document.getElementById('modalSection');
const miniRoomCards = document.getElementById('miniRoomCards');
const upcomingMinis = document.getElementById('upcomingMinis');
const pastMinis = document.getElementById('pastMinis');
const reservationDate = document.getElementById('reservationDate');

const searchButton = document.getElementById('searchButton');
const filter = document.getElementById('filters');

// GLOBAL VARIABLES 🌍
let currentUser = new User({"id": 1, "name": "Leatha Ullrich"});
let bookingRepo = new BookingRepository(testData.bookings, testData.rooms);

// EVENT LISTENERS 👂
window.addEventListener('load', () => {
  currentUser.getBookings(bookingRepo.bookings);
  currentUser.calculateTotalSpent(bookingRepo.rooms);
  updateUserName(currentUser);
  updateUserSpent(currentUser);
  generateReservations(currentUser.bookings);
});

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  let availableRooms = bookingRepo.getAvailableRooms(reservationDate.value.replace(/-/g, "/"));
  generateAvailableRooms(availableRooms);
});


// apiRequest('GET', 'customers/1').then(data => currentUser = new User(data));
// apiRequest('GET', 'rooms').then(data => rooms = data.map(room => new Room(room)));
// apiRequest('GET', 'bookings').then(data => bookings = data.map(booking => new Booking(booking)));


// FUNCTIONS ⚙️
function generateAvailableRooms(rooms) {
  miniRoomCards.innerHTML = "";

  rooms.forEach(room => {
    let bed = room.numBeds > 1 ? 'beds' : 'bed';

    miniRoomCards.innerHTML += `
    <div class="mini-room" id="${room.number}">
      <div class="mini-room-left">
        <h3>${room.roomType}</h3>
        <p>${room.numBeds} ${room.bedSize} ${bed}</p>
      </div>
      <h3>$${room.costPerNight}/night</h3>
    </div>
    `;
  });
}

function generateReservations(bookings) {
  // let today = (new Date(Date.now()).toISOString()).substring(0, 10).replace(/-/g, "/");
  let today = Date.now();

  let futureBookings = bookings

}

function updateUserName(user) {
  userName.innerText = user.name;
}

function updateUserSpent(user) {
  totalSpent.innerText = user.totalSpent.toFixed(2);
  totalRewards.innerText = user.totalRewards;
}