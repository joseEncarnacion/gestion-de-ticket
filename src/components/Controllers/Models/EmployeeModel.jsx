import UserDetailsModel from './UserDetailsModel';

class EmployeeModel {
  constructor(id, userId, establishmentId, availabe, userInfo) {
    this.id = id;
    this.userId = userId;
    this.establishmentId = establishmentId;
    this.availabe = availabe;
    this.userInfo = userInfo;
  }

  static fromJson(json, explicitData) {
    return new EmployeeModel(
      json['id'],
      json['userId'],
      json['establishmentId'],
      json['availabe'],
      explicitData
    );
  }
}

export default EmployeeModel;
