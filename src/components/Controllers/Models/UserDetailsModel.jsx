class UserDetailsModel {
    constructor(id, firstName, lastName, userName, email, phoneNumber, profileImage, roles) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.userName = userName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.profileImage = profileImage;
      this.roles = roles;
    }
  
    static fromJson(json) {
      return new UserDetailsModel(
        json['id'],
        json['firstName'],
        json['lastName'],
        json['userName'],
        json['email'],
        json['phoneNumber'],
        json['profileImage'],
        json['roles']
      );
    }
  }
  
  export default UserDetailsModel;
  