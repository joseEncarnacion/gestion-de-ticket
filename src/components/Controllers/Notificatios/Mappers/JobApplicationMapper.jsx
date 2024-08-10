// class JobApplicationMapper {
//     constructor({ id, userId, establishmentId, roleId, status }) {
//       this.id = id;
//       this.userId = userId;
//       this.establishmentId = establishmentId;
//       this.roleId = roleId;
//       this.status = status;
//     }
  
//     static fromJson(json) {
//       return new JobApplicationMapper({
//         id: json.id,
//         userId: json.userId,
//         establishmentId: json.establishmentId,
//         roleId: json.roleId,
//         status: json.status,
//       });
//     }
//   }
  
//   export default JobApplicationMapper;


// src/Notifications/Mappers/JobApplicationMapper.js

class JobApplicationMapper {
  constructor(id, userId, establishmentId, roleId, status) {
      this.id = id;
      this.userId = userId;
      this.establishmentId = establishmentId;
      this.roleId = roleId;
      this.status = status;
  }

  static fromJson(json) {
      return new JobApplicationMapper(
          json.id,
          json.userId,
          json.establishmentId,
          json.roleId,
          json.status
      );
  }
}

export default JobApplicationMapper;

  