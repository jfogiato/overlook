function apiRequest(request, path, userID, date, roomNumber) {
  fetch(`http://localhost:3001/api/v1/${path}`, {
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

export default apiRequest;