import axios from "axios";

const clienteAxios = axios.create({
  baseURL: 'https://localhost:7207/api/v1',
  //baseURL: process.env.REACT_APP_BACKEND_URL
  
  headers: {
    'Authorization': 'Bearer hajhfaafj@&^*^ffagdfd41s_4151*(*dd10 11',
    'Content-Type': 'application/json'
  }
});

export default clienteAxios;
