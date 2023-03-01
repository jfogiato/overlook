// IMPORTS 📥
import './css/styles.css';
import './images/hotel-logo.png';
import './images/hotel-room.png';
import User from './classes/User';
import Booking from './classes/Booking';
import Room from './classes/Room';
import apiRequest from './api-calls';
import testData from '../test/test-data';

// DOM VARIABLES 🖥️
const userName = document.getElementById('userName');
const totalSpent = document.getElementById('totalSpent');
const totalRewards = document.getElementById('totalRewards');
const modalSection = document.getElementById('modalSection');
const miniRoomCards = document.getElementById('miniRoomCards');
const upcomingMinis = document.getElementById('upcomingMinis');
const pastMinis = document.getElementById('pastMinis');

const searchButton = document.getElementById('searchButton');
const filter = document.getElementById('filters');

// GLOBAL VARIABLES 🌍
let currentUser = new User({"id": 1, "name": "Leatha Ullrich"})
let bookings = testData.bookings.map(date => new Booking(date)); // ALL bookings currently in test file - prune when done
let rooms = testData.rooms; // ALL rooms - delete when API successful


// EVENT LISTENERS 👂
window.addEventListener('load', () => {
  currentUser.getBookings(bookings);

});

// apiRequest('GET', 'customers/1').then(data => currentUser = new User(data));
// apiRequest('GET', 'rooms').then(data => rooms = data.map(room => new Room(room)));
// apiRequest('GET', 'bookings').then(data => bookings = data.map(booking => new Booking(booking)));


// FUNCTIONS ⚙️
