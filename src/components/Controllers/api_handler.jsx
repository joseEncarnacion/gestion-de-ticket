import axios from 'axios';
import BussinessListModel from "./Models/BussinessListModel";
import Services from "./Models/Services";
import UserDetailsModel from "./Models/UserDetailsModel";
import AppointmentModel from "./Models/AppointmentModel";
import EmployeeModel from "./Models/EmployeeModel";
import JobApplicationMapper from "../Controllers/Notificatios/Mappers/JobApplicationMapper";
import JobAppNotification from "../Controllers/Notificatios/Notificatios-Types/JobApplicationNotification";
// import JobApplicationMapper from '../Controllers/Notificatios/Mappers/JobApplicationMapper';

// Update the base URL according to your environment
const baseUrl = 'https://localhost:7207/api/v1/';
const headers = { 'Content-Type': 'application/json' };

// Utility functions for handling multipart form data
const createMultipartFormData = (fields, files) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  files.forEach(file => {
    formData.append(file.name, file.file);
  });
  return formData;
};

const ApiHandler = {
  userDetails: null,
  bussinessList: [],
  myBussinessList: [],
  bussinesServices: [],
  getUsersByUsername: [],
  userInfo: null,

  //registrar un usuario 
  async userRegister({ name, lastname, username, email, phone, password, image }) {
    const url = `${baseUrl}Account/register`;
    const formData = createMultipartFormData(
      {
        FirstName: name,
        LastName: lastname,
        UserName: username,
        Email: email,
        PhoneNumber: phone,
        Password: password,
      },
      [{ name: 'ImageFile', file: image }]
    );

    try {
      const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },


  
//el usuario puede entrar a la app... Done
  async login(username, password) {
    const url = `${baseUrl}Account/login`;
    const body = { userName: username, password: password };

    try {
        const response = await axios.post(url, body, { headers });
        return response;
      } catch (error) {
        return error.response;
      }

    // try {
    //   const response = await axios.post(url, body, { headers });
    //   if (response.status === 200 || response.status === 204) {
    //     this.userDetails = response.data;
    //   }
    //   return response;
    // } catch (error) {
    //   return error.response;
    // }
  },

  //logout: function Done
  async logout() {
    const url = `${baseUrl}Account/logout`;
    try {
      const response = await axios.get(url);
      if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
      }
      throw new Error('Logout failed');
    } catch (error) {
        console.log(error.response.data);
        console.error('Logout failed', error);
    }
  },

//   update user data 

  async updateUser(data) {
    const url = `${baseUrl}update/${data.id}`;
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('updateUser: something went wrong', error);
      throw error;
    }
  },

// Done
  async createBussiness({ userid, bussiness, location, workinghours, desc, image }) {
    const url = `${baseUrl}Establishments`;
    const formData = createMultipartFormData(
      {
        UserId: userid,
        BusinessName: bussiness,
        Location: location,
        WorkingHours: workinghours,
        Description: desc,
      },
      [{ name: 'ImageFile', file: image }]
    );

    try {
      const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },

  //
  async fetchBussinessList() {
    const url = `${baseUrl}Establishments`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        this.bussinessList = response.data.data.items.map(item => BussinessListModel.fromJson(item));
      }
      return this.bussinessList;
    } catch (error) {
      return this.bussinessList;
    }
  },

  async miBussinessList(userID) {
    const url = `${baseUrl}Establishments?UserID=${userID}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        this.miBussinessList = response.data.data.items.map(item => BussinessListModel.fromJson(item));
      }
      return this.miBussinessList;
    } catch (error) {
      return this.miBussinessList;
    }
  },

  async getBussinessServices(id) {
    const url = `${baseUrl}Establishments/${id}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        this.bussinesServices = response.data.data.services.map(service => Services.fromJson(service));
      }
      return this.bussinesServices;
    } catch (error) {
      return this.bussinesServices;
    }
  },

  async createService({ bussinessId, serviceName, duration, price, serviceImage }) {
    const url = `${baseUrl}Services`;
    const formData = createMultipartFormData(
      {
        EstablishmentId: bussinessId.toString(),
        ServiceName: serviceName,
        Duration: duration.toString(),
        Price: price.toString(),
      },
      [{ name: 'imageFile', file: serviceImage }]
    );

    try {
      const response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },

  //buscar un usuario en Accaount
//   async searchUserById(id) {
//     const url = `${baseUrl}Account/userbyid/${id}`;

//     try {
//       const response = await axios.get(url);
//       if (response.status === 200) {
//         this.userInfo = UserDetailsModel.fromJson(response.data.data);
//         return this.userInfo;
//       }
//     } catch (error) {
//       console.error(error.response.data);
//       return this.userInfo;
//     }
//   },

//   // user name
//   async findUserByUsername(username) {
//     const url = `${baseUrl}Account/users?username=${username}`;

//     try {
//       const response = await axios.get(url);
//       if (response.status === 200) {
//         this.getUsersByUsername = response.data.data.map(user => UserDetailsModel.fromJson(user));
//       }
//       return this.getUsersByUsername;
//     } catch (error) {
//       this.getUsersByUsername = [];
//       return this.getUsersByUsername;
//     }
//   },
 

  async searchUserById(id) {
    const url = `${baseUrl}Account/userbyid/${id}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        this.userInfo = UserDetailsModel.fromJson(response.data.data);
        return this.userInfo;
      }
    } catch (error) {
      console.error(error.response.data);
      return this.userInfo;
    }
  },

  async findUserByUsername(username) {
    const url = `${baseUrl}Account/users?username=${username}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        this.getUsersByUsername = response.data.data.map(user => UserDetailsModel.fromJson(user));
      }
      return this.getUsersByUsername;
    } catch (error) {
      this.getUsersByUsername = [];
      return this.getUsersByUsername;
    }
  },


  async findUser() {
    const url = `${baseUrl}Account/users`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        this.getUsersByUsername = response.data.data.map(user => UserDetailsModel.fromJson(user));
      }
      return this.getUsersByUsername;
    } catch (error) {
      this.getUsersByUsername = [];
      return this.getUsersByUsername;
    }
  },

  async sendJobApplication({ userid, bussinessid, roleid }) {
    const url = `${baseUrl}JobApplication`;
    const body = { userId: userid, establishmentId: bussinessid, roleId: roleid, status: 'pending' };

    try {
      const response = await axios.post(url, body, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },

  async checkJobApplications(id) {
    const url = `${baseUrl}JobApplication?UserId=${id}&status=Pending`;
    let listado = [];

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        listado = response.data.data.items.map(jobsApps => new JobAppNotification(JobApplicationMapper.fromJson(jobsApps)));
      }
      return listado;
    } catch (error) {
        console.error("checkJobApplications: something went wrong", error);
      return listado;
    }
  },

  async addEmployeeToBussiness({ bussinessid, userid }) {
    const url = `${baseUrl}Employee`;
    const body = { userId: userid, establishmentId: bussinessid, availabe: true };

    try {
      const response = await axios.post(url, body, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },

  async addRoleToEmployee({ userid, role }) {
    const url = `${baseUrl}Account/${userid}/role`;

    try {
      const response = await axios.post(url, role, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },

  async updateJobApplicationStatus({ jobAppId, roleid, status }) {
    const url = `${baseUrl}JobApplication/${jobAppId}`;
    const body = { id: jobAppId, roleId: roleid, status: status };

    try {
      const response = await axios.put(url, body, { headers });
      console.log("updateJobApplicationStatus: operation successful");
    } catch (error) {
      console.error("updateJobApplicationStatus: something went wrong");
    }
  },

  async getBussinessEmployees(bussinessId) {
    const url = `${baseUrl}Employee?EstablishmentId=${bussinessId}`;
    let data = [];

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        for (const item of response.data.data.items) {
          const userinfo = await this.searchUserById(item.userId);
          data.push(new EmployeeModel(item, userinfo));
        }
      }
      return data;
    } catch (error) {
      console.error("getBussinessEmployees: something went wrong");
      return data;
    }
  },

  async searchBussinessById(id) {
    const url = `${baseUrl}Establishments/${id}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return new BussinessListModel(response.data.data);
      }
      return null;
    } catch (error) {
      console.error(error.response.data);
      return null;
    }
  },

//Jose Luis Crear citas 
  async createAppointment({ userId, bussinesId, serviceId, employeeId, status }) {
    const url = `${baseUrl}Appointments`;
    const body = { userId, establishmentId: bussinesId, serviceId, employeeId, statusId: status };

    try {
      const response = await axios.post(url, body, { headers });
      console.log("createAppointment: appointment successfully scheduled");
    } catch (error) {
      console.error("createAppointment: something went wrong");
    }
  },

  async getAppointments({ userId, bussinesId, serviceId, employeeId, status, page, pageSize }) {
    const url = `${baseUrl}Appointments?UserId=${userId}&EstablishmentId=${bussinesId}&ServiceId=${serviceId}&EmployeeId=${employeeId}&StatusId=${status}&page=${page}&pageSize=${pageSize}`;
    let appointments = [];

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        appointments = response.data.data.items.map(item => new AppointmentModel(item));
      }
      return appointments;
    } catch (error) {
      console.error("getAppointments: something went wrong");
      return appointments;
    }
  },

  async updateAppointmentStatus({ appointmentId, statusId }) {
    const url = `${baseUrl}Appointments/${appointmentId}/status`;
    const body = { statusId };

    try {
      const response = await axios.put(url, body, { headers });
      console.log("updateAppointmentStatus: operation successful");
    } catch (error) {
      console.error("updateAppointmentStatus: something went wrong");
    }
  },
};

export default ApiHandler;
