class UserModel {
  constructor(name, phoneNumber, role, cuisine) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.cuisines = cuisines;
  }

  toFirestore() {
    return {
      name: this.name,
      phoneNumber: this.phoneNumber,
      role: this.role,
      cuisines: this.cuisines,
    };
  }
}

export default UserModel;
