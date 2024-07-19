import React, {useReducer} from 'react';
import AuthContext from "./authContext"; 
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios;'

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
        error: null,
        mensaje: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // las funciones

    const RegistrarUsario =  async datos =>{
        try{
            const respuesta = await clienteAxios.post('/api/v1/account/register', datos);
            console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITO,
                payload: respuesta.data.data
            });
        } catch(error){
            console.log(error);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                usuario: state.usuario,
                autenticado: state.autenticado,
                error: state.error,
                mensaje: state.mensaje
            }}

        >{props.children}
        
        </AuthContext.Provider>

        
    )
}

export default AuthState;