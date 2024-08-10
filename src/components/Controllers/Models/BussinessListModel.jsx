class BussinessListModel {
    constructor(id, userId, bussinessName, location, workingHours, description, profileImage) {
      this.id = id;
      this.userId = userId;
      this.bussinessName = bussinessName;
      this.location = location;
      this.workingHours = workingHours;
      this.description = description;
      this.profileImage = profileImage;
    }
  
    static fromJson(json) {
      return new BussinessListModel(
        json['id'],
        json['userId'],
        json['businessName'],
        json['location'],
        json['workingHours'],
        json['description'],
        json['profileImage']
      );
    }
  }
  
  export default BussinessListModel;
  