class UserModel {
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      
    }
  
    toFirestore() {
      return {
        name: this.name,
        phoneNumber: this.phoneNumber,
      };
    }
  }
  
  export default UserModel;