import React, {useReducer} from 'react';
import AuthContext from "./authContext"; 
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios'

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

    // las funciones

    const RegistrarUsario =  async datos =>{
        try{
            const respuesta = await clienteAxios.post('/register', datos);
            console.log(respuesta.headers);
            console.log(respuesta.data);
            console.log(respuesta.status);

            dispatch({
                type: REGISTRO_EXITO,
                payload: respuesta.data
            });
        } catch(error){
            // console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }

         // Retorna el usuario autenticado
        // const usuarioAutenticado = async () => {
        //     const token = localStorage.getItem('token');
        //     if(token) {
        //         tokenAuth(token);
        //     }

        //     try {
        //         const respuesta = await clienteAxios.get('/api/auth');
        //         // console.log(respuesta);
        //         dispatch({
        //             type: OBTENER_USUARIO,
        //             payload: respuesta.data.usuario
        //         });

        //     } catch (error) {
        //         console.log(error.response);
        //         dispatch({
        //             type: LOGIN_ERROR
        //         })
        //     }
        // }
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                usuario: state.usuario,
                autenticado: state.autenticado,
                cargando: state.cargando,
                mensaje: state.mensaje,
                RegistrarUsario
            }}

        >{props.children}
        
        </AuthContext.Provider>

        
    )
}

export default AuthState;