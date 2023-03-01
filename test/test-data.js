const rooms = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  },
  {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
  },
  {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
  }
];

const customers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 2,
    "name": "Rocio Schuster"
  },
  {
    "id": 3,
    "name": "Kelvin Schiller"
  },
  {
    "id": 4,
    "name": "Kennedi Emard"
  },
  {
    "id": 5,
    "name": "Rhiannon Little"
  }
];

const bookings = [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 1,
      "date": "2023/04/22",
      "roomNumber": 1,
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 1,
      "date": "2023/01/24",
      "roomNumber": 1,
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 1,
      "date": "2023/01/10",
      "roomNumber": 1,
    },
    {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 1,
      "date": "2023/02/16",
      "roomNumber": 1,
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2023/02/05",
      "roomNumber": 1,
    }
];

export default { bookings, customers, rooms };