class UserLoggedModel {
    constructor(id, userName, email, roles, isVerified, accessToken, expiresIn, success, message) {
      this.id = id;
      this.userName = userName;
      this.email = email;
      this.roles = roles;
      this.isVerified = isVerified;
      this.accessToken = accessToken;
      this.expiresIn = expiresIn;
      this.success = success;
      this.message = message;
    }
  
    static fromJson(json) {
      return new UserLoggedModel(
        json['data']['id'],
        json['data']['userName'],
        json['data']['email'],
        json['data']['roles'],
        json['data']['isVerified'],
        json['data']['accessToken'],
        json['data']['expiresIn'],
        json['success'],
        json['message']
      );
    }
  }
  
  export default UserLoggedModel;
  