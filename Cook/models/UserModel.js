class UserModel {
  constructor(name, phoneNumber, role, followers = [], following = []) { // Add followers parameter with a default empty array
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.followers = followers;
    this.following = following
  }

  toFirestore() {
    return {
      name: this.name,
      phoneNumber: this.phoneNumber,
      role: this.role,
      followers: this.followers,
      following: this.following, 
    };
  }
}

export default UserModel;
