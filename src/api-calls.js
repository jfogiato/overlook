function apiRequest(request, path, userID, date, roomNumber) {
  return fetch(`https://overlook-api-jfogiato.vercel.app/api/v1/${path}`, {
    method: request,
    body: userID ? JSON.stringify({ "userID": userID, "date": date, "roomNumber": roomNumber }) : null,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .catch(err => console.log(err));
}

const getAllData = () => {
  return Promise.all([
    apiRequest('GET', 'customers'),
    apiRequest('GET', 'rooms'),
    apiRequest('GET', 'bookings')
  ]);
}

export default { apiRequest, getAllData };