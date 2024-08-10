import BussinessListModel from './BussinessListModel';
import UserDetailsModel from './UserDetailsModel';
import Services from './Services';

class AppointmentModel {
  constructor(id, userId, establishmentId, serviceId, employeeId, position, date, statusId, bussinessDetails, userDetails, serviceDetails, employeeDetails) {
    this.id = id;
    this.userId = userId;
    this.establishmentId = establishmentId;
    this.serviceId = serviceId;
    this.employeeId = employeeId;
    this.position = position;
    this.date = date;
    this.statusId = statusId;
    this.bussinessDetails = bussinessDetails;
    this.userDetails = userDetails;
    this.serviceDetails = serviceDetails;
    this.employeeDetails = employeeDetails;
  }

  static fromJson(json, bussiness, user, service, employee) {
    return new AppointmentModel(
      json["id"],
      json["userId"],
      json["establishmentId"],
      json["serviceId"],
      json["employeeId"],
      json["position"],
      json["date"],
      json["statusId"],
      bussiness,
      user,
      service,
      employee
    );
  }
}

export default AppointmentModel;
