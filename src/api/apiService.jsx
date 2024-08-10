// src/api/apiService.jsx
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
    return apiClient.delete(endpoint, { data })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  },

  // Función para iniciar sesión
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

  // Obtener un usuario por su nombre de usuario
  getUserByUsername: (userName) => {
    return apiClient.get(`/Account/userbyusername/${userName}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  // Añadir un rol a un usuario
  addRoleToUser: async (userId, role) => {
    try {
      const url = `/Account/${userId}/role`;
      const response = await apiClient.post(url, JSON.stringify(role), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response;
    } catch (error) {
      throw error;
    };
  },
};

export default apiService;
