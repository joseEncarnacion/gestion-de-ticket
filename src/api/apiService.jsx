//apiService.jsx
import apiClient from './axiosConfig';

const apiService = {
  getAll: (endpoint, params = {}) => {
    return apiClient.get(endpoint, { params })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  getById: (endpoint, id) => {
    return apiClient.get(`${endpoint}/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  create: (endpoint, data) => {
    return apiClient.post(endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  },

  update: (endpoint, data) => {
    return apiClient.put(endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  },

  delete: (endpoint, data) => {
    return apiClient.delete(endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  },

  // es para el login iniciar sesion
  login: (data) => {
    return apiClient.post('/Account/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  },
};

export default apiService;
