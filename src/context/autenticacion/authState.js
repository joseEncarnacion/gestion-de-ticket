import React, { useReducer } from 'react';
import AuthContext from "./authContext"; 
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import {
  REGISTRO_ERROR,
  REGISTRO_EXITO,
  OBTENER_USUARIO,
  LOGIN_EXITO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    usuario: null,
    autenticado: null,
    cargando: null,
    mensaje: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const RegistrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/Account/register', datos);
      console.log(respuesta.data)
      dispatch({
        type: REGISTRO_EXITO,
        payload: respuesta.data
      });
    } catch (error) {
        console.log(error)
      const alerta = {
        mensaje: error.response.data.message,
        categoria: 'alerta-error'
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        usuario: state.usuario,
        autenticado: state.autenticado,
        cargando: state.cargando,
        mensaje: state.mensaje,
        RegistrarUsuario
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
