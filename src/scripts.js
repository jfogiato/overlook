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
const loginPage = document.getElementById("loginPage");
const loginErrorText = document.getElementById("loginErrorText");
const header = document.querySelector("header");
const userNameDisplay = document.getElementById("userNameDisplay");
const subHeader = document.getElementById("subHeader");
const userSpentHeader = document.getElementById("userSpentHeader");
const main = document.querySelector("main");
const modalSection = document.getElementById("modalSection");
const miniRoomCards = document.getElementById("miniRoomCards");
const upcomingMinis = document.getElementById("upcomingMinis");
const pastMinis = document.getElementById("pastMinis");

// DOM VARIABLES - BUTTONS AND INPUTS 🔠 🔢 ----------------------------------------
const loginForm = document.getElementById("loginForm");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const logoutButton = document.getElementById("logoutButton");
const userSearchForm = document.getElementById("userSearchForm");
const userSearchValue = document.getElementById("userSearchValue");
const searchButton = document.getElementById("searchButton");
const reservationDate = document.getElementById("reservationDate");
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
};

// EVENT LISTENERS 👂 -----------------------------------------------
window.addEventListener("load", () => {
  apiObject.getAllData()
    .then(data => {
      bookingRepo = new BookingRepository(data[2].bookings, data[1].rooms, data[0].customers);
    });
});

loginForm.addEventListener("submit", e => {
  e.preventDefault();

  let userNameAttempt = userName.value;
  let passwordAttempt = password.value;
  let userNameString = userNameAttempt.split(/[0-9]/)[0];
  let userNumber = parseInt(userNameAttempt.match(/\d+/g));
  let isUser = (userNameString === 'customer' || userNameString === 'manager');
  let isValidPassword = passwordAttempt === 'overlook2021';
  let isManager = userName.value === 'manager';
  let isValidUserNumber = isManager ? true : (userNumber >= 1 && userNumber <= 50);
  let isValidUser = (userNameAttempt && isUser && isValidPassword && isValidUserNumber);

  if (!isValidPassword) {
    unsuccessfulLogin("password");
  } else if (!isValidUser) {
    unsuccessfulLogin("username");
  } else if (isValidUser && isManager) {
    updateSpentRewardsHeader(userNameAttempt);
    updateuserNameDisplay({name: 'Manager'});
    show(userSearchForm);
    successfulLogin();
  } else if (isValidUser && isValidUserNumber) {
    apiObject.apiRequest("GET", `customers/${userNumber}`)
      .then(data => {
        currentUser = new User(data);
        currentUser.getBookings(bookingRepo.bookings);
        currentUser.calculateTotalSpent(bookingRepo.rooms);
        updateSpentRewardsHeader(currentUser);
        updateuserNameDisplay(currentUser);
        generateReservations(currentUser.bookings);
        successfulLogin();
      })
      .catch(err => showUserFetchError(err));
  } 
});

searchButton.addEventListener("click", e => {
  e.preventDefault();
  if (reservationDate.value) {
    let availableRooms = bookingRepo.getAvailableRooms(convertDateDashes(reservationDate.value));
    generateAvailableRooms(availableRooms);
    show(filterForm);
  }
});

logoutButton.addEventListener("click", logout);

filter.addEventListener("change", e => {
  e.preventDefault();
  filterAvailableRooms(filter.value, bookingRepo.availableRooms);
});

miniRoomCards.addEventListener("click", e => {
  if (e.target.id !== "miniRoomCards") {
    triggerModal(e);
  }
});

miniRoomCards.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    triggerModal(e);
  }
});

modalSection.addEventListener("click", e => {
  e.target.id === "modalSection" ? hide(modalSection) : null;
});

userSearchForm.addEventListener("submit", e => {
  e.preventDefault();
  currentUser = bookingRepo.getUserInfo(userSearchValue.value);
  let userBookings = currentUser.getBookings(bookingRepo.bookings);
  generateReservations(userBookings);
  currentUser.calculateTotalSpent(bookingRepo.rooms);
  updateUserSpentHeader(currentUser);
  show(userSpentHeader);
});

upcomingMinis.addEventListener('click', e => {
  if (e.target.id !== 'upcomingMinis') {
    let currentMiniCard = e.target.parentNode;
    let deleteButton = currentMiniCard.children[1]
    hide(currentMiniCard.children[0]);
    show(currentMiniCard.children[1]);
    deleteButton.addEventListener('click', () => {
      deleteBooking(currentMiniCard.id);
    });
  }
});

// FUNCTIONS ⚙️ -----------------------------------------------
function bookRoom(room, user) {
  let date = convertDateDashes(reservationDate.value);
  apiObject.apiRequest("POST", "bookings", user.id, date, room.number)
    .then(() => {
      apiObject.apiRequest("GET", "bookings")
        .then(response => {
          bookingRepo.bookings = response.bookings.map(booking => new Booking(booking));
          currentUser.getBookings(bookingRepo.bookings);
          currentUser.calculateTotalSpent(bookingRepo.rooms);
          userNameDisplay.innerText === "Manager"
            ? updateSpentRewardsHeader("manager")
            : updateSpentRewardsHeader(currentUser);
          generateReservations(currentUser.bookings);
          hide(modalSection);
          generateAvailableRooms(bookingRepo.getAvailableRooms(convertDateDashes(reservationDate.value)));
        })
    })
}

function deleteBooking(id) {
  apiObject.apiRequest("DELETE", `bookings/${id}`)
    .then(() => {
      apiObject.apiRequest("GET", "bookings")
        .then(data => {
          bookingRepo.bookings = data.bookings.map(booking => new Booking(booking));
          currentUser.getBookings(bookingRepo.bookings);
          currentUser.calculateTotalSpent(bookingRepo.rooms);
          userNameDisplay.innerText === "Manager"
            ? updateSpentRewardsHeader("manager")
            : updateSpentRewardsHeader(currentUser);
          generateReservations(currentUser.bookings);
        });
    });
}

function generateModal(roomList, roomNumber) {
  let room = roomList.find(room => room.number === parseInt(roomNumber));
  let multiplier = room.bedSize === "twin" ? 1 : 2;
  let bidet = room.bidet ? "Bidet" : "";
  modalSection.innerHTML = "";
  modalSection.innerHTML = `
    <section class="modal" id="modal">
      <h3 tabindex="0">${room.roomType}</h3>
      <img src=${roomDescriptions[room.roomType][1]} alt="Hotel Room" tabindex="0">
      <div class="modal-room-info" id="modalRoomInfo">
        <div class="room-info-icons">
          <span class="material-symbols-outlined">person</span>
          <p tabindex="0">${room.numBeds * multiplier}</p>
        </div>
        <div class="room-info-icons">
          <span class="material-symbols-outlined">bed</span>
          <p tabindex="0">${room.numBeds} ${room.bedSize}</p>
        </div>
      </div>
      <p tabindex="0">${roomDescriptions[room.roomType][0]}</p>
      <button id="bookButton">Book it.</button>
    </section>
  `;
  if (bidet) {
    document.getElementById("modalRoomInfo").innerHTML += `
    <div class="room-info-icons">
      <span class="material-symbols-outlined">sprinkler</span>
      <p tabindex="0">Bidet</p>
    </div>
    `;
  }
  let bookButton = document.getElementById("bookButton");
  setTimeout(() => bookButton.focus());
  bookButton.addEventListener("click", () => {
    bookRoom(room, currentUser);
  });
}

function triggerModal(e) {
  let roomNumber = e.target.parentNode.parentNode.id;
  generateModal(bookingRepo.availableRooms, roomNumber);
  show(modalSection);
}

function generateAvailableRooms(rooms) {
  miniRoomCards.innerHTML = "";
  if (rooms.length) {
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
    miniRoomCards.innerHTML = `<div class="sorry-message" tabindex="0">Hmpf. It appears that we do not have a room that matches your search. Please try a different search criteria.</div>`;
  }
}

function generateReservations(bookings) {
  let today = Date.now() - 86400000;
  let futureReservations = bookings.filter(booking => {
    return Date.parse(booking.date) > today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  let pastReservations = bookings.filter(booking => {
    return Date.parse(booking.date) < today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  upcomingMinis.innerHTML = "";
  futureReservations.forEach(reservation => {
    upcomingMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.id}">
      <h3 tabindex="0">Room ${reservation.roomNumber}</h3>
      <button class="delete-reservation hidden"id="deleteReservation">Delete.</button>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });
  pastMinis.innerHTML = "";
  pastReservations.forEach(reservation => {
    pastMinis.innerHTML += `
    <div class="mini-room-booked" id="${reservation.id}">
      <h3 tabindex="0">Room ${reservation.roomNumber}</h3>
      <h3 tabindex="0">${reservation.date}</h3>
    </div>
    `;
  });
}

function filterAvailableRooms(type, rooms) {
  let filteredRooms = rooms.filter(room => room.roomType === type.toLowerCase());
  generateAvailableRooms(filteredRooms);
}

function updateuserNameDisplay(user) {
  userNameDisplay.innerText = user.name;
}

function updateUserSpentHeader(user) {
  userSpentHeader.innerText = `${user.name} has spent $${convertSpent(user.totalSpent)} at the Grand Budapest Hotel.`;
}

function updateSpentRewardsHeader(user) {
  if (user === "manager") {
    let today = convertDateDashes(new Date(Date.now()).toISOString().split("T")[0]);
    let totalBookedToday = bookingRepo.getTotalBookedDollars(today);
    let percentRoomsBooked = ((1 - ((bookingRepo.getAvailableRooms(today).length) / bookingRepo.rooms.length)));
    subHeader.innerText = `Today's revenue is $${totalBookedToday} and we are ${Math.round(percentRoomsBooked * 100)}% full.`;
  } else {
    let totalSpent = convertSpent(user.totalSpent);
    let totalRewards = user.totalRewards;
    subHeader.innerText = `You have spent $${totalSpent} and accrued ${totalRewards} reward points.`;
  }
}

function successfulLogin() {
  hide(loginPage);
  show(header);
  show(main);
  setFormDate();
}

function setFormDate() {
  let today = new Date(Date.now()).toISOString().split("T")[0];
  reservationDate.setAttribute("min", today);
}

function logout() {
  show(loginPage);
  hide(header);
  hide(main);
  hide(userSearchForm);
  hide(userSpentHeader);
  hide(filterForm)
  upcomingMinis.innerHTML = "";
  pastMinis.innerHTML = "";
  miniRoomCards.innerHTML = "";
}

function unsuccessfulLogin(reason) {
  if (reason === "password") {
    loginErrorText.innerText = "Please enter a valid password";
  } else if (reason === "username") {
    loginErrorText.innerText = "Please enter a valid username";
  }
  show(loginErrorText);
  loginErrorText.classList.add("shake");
  setTimeout(() => {
    hide(loginErrorText);
    resetLoginForm();
    loginErrorText.innerText = "";
  }, 1000);
}

function convertDateDashes(date) {
  return date.replace(/-/g, "/");
}

function convertSpent(stringNum) {
  return new Intl.NumberFormat().format(stringNum);
}

function showUserFetchError() {
  alert(`We are so sorry! There has been an error. Please refresh the page and try logging in again.`);
}

function resetLoginForm() {
  userName.value = "";
  password.value = "";
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}