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
  },
  {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
    "number": 7,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 231.46
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  },
  {
    "number": 9,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 200.39
  },
  {
    "number": 10,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 497.64
  },
  {
    "number": 11,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 207.24
  },
  {
    "number": 12,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 172.09
  },
  {
    "number": 13,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 423.92
  },
  {
    "number": 14,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 457.88
  },
  {
    "number": 15,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 1,
    "costPerNight": 294.56
  },
  {
    "number": 16,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 325.6
  },
  {
    "number": 17,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 328.15
  },
  {
    "number": 18,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 2,
    "costPerNight": 496.41
  },
  {
    "number": 19,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 374.67
  },
  {
    "number": 20,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 343.95
  },
  {
    "number": 21,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 429.32
  },
  {
    "number": 22,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 350.31
  },
  {
    "number": 23,
    "roomType": "residential suite",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 176.36
  },
  {
    "number": 24,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 327.24
  },
  {
    "number": 25,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 305.85
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
    "userID": 9,
    "date": "2022/04/22",
    "roomNumber": 15,

  },
  {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
    "date": "2022/01/24",
    "roomNumber": 24,

  },
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2022/01/10",
    "roomNumber": 12,

  },
  {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 20,
    "date": "2022/02/16",
    "roomNumber": 7,

  },
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 12,

  },
  {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 38,
    "date": "2023/12/14",
    "roomNumber": 14,

  },
  {
    "id": "5fwrgu4i7k55hl6ta",
    "userID": 25,
    "date": "2022/01/11",
    "roomNumber": 9,

  },
  {
    "id": "5fwrgu4i7k55hl6tb",
    "userID": 49,
    "date": "2022/02/06",
    "roomNumber": 5,

  },
  {
    "id": "5fwrgu4i7k55hl6tc",
    "userID": 22,
    "date": "2023/11/30",
    "roomNumber": 13,

  },
  {
    "id": "5fwrgu4i7k55hl6td",
    "userID": 27,
    "date": "2022/01/31",
    "roomNumber": 20,

  }
];

export default { bookings, customers, rooms };