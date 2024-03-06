class UserModel {
    constructor(name, phoneNumber, role) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.role = role;
    }
  
    toFirestore() {
      return {
        name: this.name,
        phoneNumber: this.phoneNumber,
        role: this.role,
      };
    }
  }
  
  export default UserModel;