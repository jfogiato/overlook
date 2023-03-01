class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.userName = `customer${userData.id}`;
    this.password = 'overlook2021';
  }
}

export default User;