// IMPORTS 📥 -----------------------------------------------
import "./css/styles.css";
import "./images/hotel-logo.png";
import "./images/single.png";
import "./images/suite.png";
import "./images/junior-suite.png";
import "./images/residential-suite.png";
import User from "./classes/User";
import Booking from "./classes/Booking";
import apiObject from "./api-calls";
import BookingRepository from "./classes/BookingRepository";

// DOM VARIABLES - ELEMENTS 🖥️ 🌱 -----------------------------------------------
const loginPage = document.getElementById('loginPage');
const header = document.querySelector('header');
const main = document.querySelector('main');
const userNameDisplay = document.getElementById("userNameDisplay");
const subHeader = document.getElementById("subHeader");
const modalSection = document.getElementById("modalSection");
const miniRoomCards = document.getElementById("miniRoomCards");
const upcomingMinis = document.getElementById("upcomingMinis");
const pastMinis = document.getElementById("pastMinis");
const reservationDate = document.getElementById("reservationDate");

// DOM VARIABLES - BUTTONS AND INPUTS 🔠 🔢 ----------------------------------------
const loginForm = document.getElementById('loginForm');
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const searchButton = document.getElementById("searchButton");
const searchDate = document.getElementById("reservationDate");
const filterForm = document.getElementById("filterForm");
const filter = document.getElementById("filters");

// GLOBAL VARIABLES 🌍 -----------------------------------------------
let currentUser;
let bookingRepo;
const roomDescriptions = {
  "residential suite": ["Very posh suite with stuff.", "./images/residential-suite.png"],
  "suite": ["Slightly less posh with less stuff.", "./images/suite.png"],
  "junior suite": ["Like the regular suite, but more junior.", "./images/junior-suite.png"],
  "single room": ["You're broke and single too, huh?", "./images/single.png"]
}

// EVENT LISTENERS 👂 -----------------------------------------------
window.addEventListener("load", () => {
  apiObject.getAllData()
  .then(data => {
    bookingRepo = new BookingRepository(data[2].bookings, data[1].rooms);
  });
});

//  ---- * BELOW IS FUNCTIONAL WITHOUT LOGIN * ----
window.addEventListener("load", () => {
  apiObject.getAllData()
  .then(data => {
    currentUser = new User(data[0].customers[0]);
    bookingRepo = new BookingRepository(data[2].bookings, data[1].rooms);
    updateBookings(bookingRepo.bookings, bookingRepo.rooms, currentUser);
    generateReservations(currentUser.bookings);
  })
})

// ---- * BELOW IS FUNCTIONAL WITH LOGIN (FINAL PRODUCT) * ----
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   let userNameAttempt = userName.value;
//   let passwordAttempt = password.value;
//   let userNumber = parseInt(userNameAttempt.match(/\d+/g))

//   if (passwordAttempt === 'overlook2021' && userNumber >= 1 && userNumber <= 50) {
//     apiObject.apiRequest("GET", `customers/${userNumber}`)
//       .then(data => {
//         currentUser = new User(data);
//         updateBookings(bookingRepo.bookings, bookingRepo.rooms,currentUser)
//         generateReservations(currentUser.bookings);
//         hide(loginPage);
//         show(header);
//         show(main);
//       })
//       .catch(err => `do some stuff`) // add DOM handling here
//   } else {
//     alert('AHHHHHHHHHHHHHHHHHH')
//   }
// });

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let availableRooms = bookingRepo.getAvailableRooms(convertDateDashes(reservationDate.value));
  generateAvailableRooms(availableRooms);
  show(filterForm);
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


// FUNCTIONS ⚙️ -----------------------------------------------
function bookRoom(room, user) {
  let date = convertDateDashes(searchDate.value);

  apiObject.apiRequest("POST", "bookings", user.id, date, room.number)
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
      <img src=${roomDescriptions[room.roomType][1]} alt="Hotel Room" tabindex="0">
      <div class="modal-room-info" id="modalRoomInfo">
        <p tabindex="0">${room.numBeds * multiplier} People</p>
        <p tabindex="0">${room.numBeds} ${room.bedSize} ${bed}</p>
        <p tabindex="0">${bidet}</p>
      </div>
      <p tabindex="0">${roomDescriptions[room.roomType][0]}</p>
      <button id="bookButton">Book it!</button>
    </section>
  `;
  document.getElementById("bookButton").addEventListener("click", () => {
    bookRoom(room, currentUser);
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
    miniRoomCards.innerHTML = `<div class="sorry-message" tabindex="0">Hmpf. It appears that we do not have a room that matches your search. Please try a different search criteria.</div>`
  }
}

function updateBookings(allBookings, rooms, user) {
  currentUser.getBookings(allBookings);
  currentUser.calculateTotalSpent(rooms);
  updateuserNameDisplay(user);
  updateHeader(user);
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
      <h3 tabindex="0">Booking</h3>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });

  pastReservations.forEach(reservation => {
    pastMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.roomNumber}">
      <h3 tabindex="0">Booking</h3>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });
}

function updateuserNameDisplay(user) {
  userNameDisplay.innerText = user.name;
}

function updateHeader(user) {
  if (user === 'manager') {
    let today = convertDateDashes(new Date(Date.now()).toISOString().split('T')[0]);
    let totalBookedToday = bookingRepo.getTotalBookedDollars(today);
    let percentRoomsBooked = ((bookingRepo.getAvailableRooms(today).length) / bookingRepo.rooms.length)
    subHeader.innerText = `Today's revenue is $${totalBookedToday}, and we are ${percentRoomsBooked}% full.`
  } else {
    let totalSpent = new Intl.NumberFormat().format(user.totalSpent);
    let totalRewards = user.totalRewards;
    subHeader.innerText = `You have spent $${totalSpent} and accrued ${totalRewards} reward points.`;
  }
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

function convertDateDashes(date) {
  return date.replace(/-/g, "/");
}

function showManagerView() {

}