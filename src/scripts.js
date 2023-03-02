// IMPORTS 📥
import "./css/styles.css";
import "./images/hotel-logo.png";
import "./images/hotel-room.png";
import User from "./classes/User";
import Booking from "./classes/Booking";
import apiObject from "./api-calls";
import BookingRepository from "./classes/BookingRepository";

// DOM VARIABLES 🖥️
const userName = document.getElementById("userName");
const totalSpent = document.getElementById("totalSpent");
const totalRewards = document.getElementById("totalRewards");
const modalSection = document.getElementById("modalSection");
const miniRoomCards = document.getElementById("miniRoomCards");
const upcomingMinis = document.getElementById("upcomingMinis");
const pastMinis = document.getElementById("pastMinis");
const reservationDate = document.getElementById("reservationDate");

const searchButton = document.getElementById("searchButton");
const searchDate = document.getElementById("reservationDate");
const filter = document.getElementById("filters");

// GLOBAL VARIABLES 🌍
let currentUser;
let bookingRepo;
const roomDescriptions = {
  "residential suite": "Very posh suite with stuff",
  "suite": "Slightly posh with less stuff",
  "junior suite": "Like the suite, but more junior",
  "single room": "meh"
}

// EVENT LISTENERS 👂
window.addEventListener("load", () => {
  apiObject.getAllData()
  .then(data => {
    console.log(data);
    currentUser = new User(data[0].customers[0]); // need to adjust this logic to iterate through customers based on login
    bookingRepo = new BookingRepository(data[2].bookings, data[1].rooms);
    currentUser.getBookings(bookingRepo.bookings);
    currentUser.calculateTotalSpent(bookingRepo.rooms);
    updateUserName(currentUser);
    updateUserSpent(currentUser);
    generateReservations(currentUser.bookings);
  })
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let availableRooms = bookingRepo.getAvailableRooms(reservationDate.value.replace(/-/g, "/"));
  generateAvailableRooms(availableRooms);
});

filter.addEventListener("change", (e) => {
  e.preventDefault();
  filterAvailableRooms(filter.value, bookingRepo.availableRooms)
});

miniRoomCards.addEventListener("click", (e) => {
  let roomNumber = e.target.parentNode.parentNode.id;
  generateModal(bookingRepo.availableRooms, roomNumber);
  show(modalSection);
});

modalSection.addEventListener("click", (e) => {
  e.target.id === "modalSection" ? hide(modalSection) : null;
});


// FUNCTIONS ⚙️
function bookRoom(room) {
  let date = searchDate.value.replace(/-/g, "/");

  apiObject.apiRequest("POST", "bookings", currentUser.id, date, room.number)
    .then(() => {
      apiObject.apiRequest("GET", "bookings")
        .then(response => {
          bookingRepo.bookings = response.bookings.map(booking => new Booking(booking));
          currentUser.getBookings(bookingRepo.bookings);
          generateReservations(currentUser.bookings);
        })
    })
}

function generateModal(roomList, roomNumber) {
  let room = roomList.find(room => room.number === parseInt(roomNumber));

  let bed = room.numBeds > 1 ? "beds" : "bed";
  let multiplier = room.bedSize === "twin" ? 1 : 2;
  let bidet = room.bidet ? "Bidet" : "";
  
  modalSection.innerHTML = "";
  modalSection.innerHTML = `
    <section class="modal" id="modal">
      <h3 tabindex="0">${room.roomType}</h3>
      <img src="./images/hotel-room.png" alt="Hotel Room" tabindex="0">
      <div class="modal-room-info" id="modalRoomInfo">
        <p tabindex="0">${room.numBeds * multiplier} People</p>
        <p tabindex="0">${room.numBeds} ${room.bedSize} ${bed}</p>
        <p tabindex="0">${bidet}</p>
      </div>
      <p tabindex="0">${roomDescriptions[room.roomType]}</p>
      <button id="bookButton">Book it!</button>
    </section>
  `;
  document.getElementById("bookButton").addEventListener("click", () => {
    bookRoom(room);
  });
}

function filterAvailableRooms(type, rooms) {
  let filteredRooms = rooms.filter(room => room.roomType === type.toLowerCase());
  generateAvailableRooms(filteredRooms);
}

function generateAvailableRooms(rooms) {

  miniRoomCards.innerHTML = "";
  
  if(rooms.length) {
    rooms.forEach(room => {
        let bed = room.numBeds > 1 ? "beds" : "bed";
  
        miniRoomCards.innerHTML += `
        <div class="mini-room" id="${room.number}">
          <div class="mini-room-left">
            <h3 tabindex="0">${room.roomType}</h3>
            <p tabindex="0">${room.numBeds} ${room.bedSize} ${bed}</p>
          </div>
          <div class="mini-room-right">
            <h3 tabindex="0">$${room.costPerNight}/night</h3>
          </div>
        </div>
        `;
      })
  } else {
    miniRoomCards.innerHTML = `<div tabindex="0">Oh no!! It looks like we don't have any rooms that match your search. Please try a different search criteria!</div>`
  }
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
      <h3 tabindex="0">Residential Suite</h3>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });

  pastReservations.forEach(reservation => {
    pastMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.roomNumber}">
      <h3 tabindex="0">Residential Suite</h3>
      <h3 tabindex="0">${reservation.date}</h3>
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
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}