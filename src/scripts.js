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

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  let availableRooms = bookingRepo.getAvailableRooms(reservationDate.value.replace(/-/g, "/"));
  generateAvailableRooms(availableRooms);
});

filter.addEventListener('change', () => {
  filterAvailableRooms(filter.value, bookingRepo.availableRooms)
});

miniRoomCards.addEventListener('click', (e) => {
  let roomNumber = e.target.parentNode.parentNode.id;
  generateModal(bookingRepo.availableRooms, roomNumber);
  show(modalSection);
});


// apiRequest('GET', 'customers/1').then(data => currentUser = new User(data));
// apiRequest('GET', 'rooms').then(data => rooms = data.map(room => new Room(room)));
// apiRequest('GET', 'bookings').then(data => bookings = data.map(booking => new Booking(booking)));


// FUNCTIONS ⚙️
function generateModal(roomList, roomNumber) {
  let room = roomList.find(room => room.number === parseInt(roomNumber));

  modalSection.innerHTML = "";

  modalSection.innerHTML = `
    <section class="modal" id="modal">
      <h3>Residential Suite</h3>
      <img src="./images/hotel-room.png" alt="Hotel Room">
      <div class="modal-room-info" id="modalRoomInfo">
        <p>4 People</p>
        <p>2 Queen Beds</p>
        <p>Bidet</p>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
    </section>
  `;
}

function filterAvailableRooms(type, rooms) {
  let filteredRooms = rooms.filter(room => room.roomType === type.toLowerCase());
  generateAvailableRooms(filteredRooms);
}

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
      <div class="mini-room-right">
        <h3>$${room.costPerNight}/night</h3>
      </div>
    </div>
    `;
  });
}

function generateReservations(bookings) {
  let today = Date.now();
  
  let futureReservations = bookings.filter(booking => {
    return Date.parse(booking.date) > today
  });

  let pastReservations = bookings.filter(booking => {
    return Date.parse(booking.date) < today
  });
  
  upcomingMinis.innerHTML = "";
  pastMinis.innerHTML = "";

  futureReservations.forEach(reservation => {
    upcomingMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.roomNumber}">
      <h3>Residential Suite</h3>
      <h3>${reservation.date}</h3>
    </div>
    `;
  });

  pastReservations.forEach(reservation => {
    pastMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.roomNumber}">
      <h3>Residential Suite</h3>
      <h3>${reservation.date}</h3>
    </div>
    `;
  });
}

function updateUserName(user) {
  userName.innerText = user.name;
}

function updateUserSpent(user) {
  totalSpent.innerText = user.totalSpent.toFixed(2);
  totalRewards.innerText = user.totalRewards;
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}