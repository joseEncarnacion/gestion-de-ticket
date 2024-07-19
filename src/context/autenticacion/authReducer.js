import {
    REGISTRO_ERROR,
    REGISTRO_EXITO,
    OBTENER_USUARIO,
    LOGIN_EXITO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {

        case REGISTRO_EXITO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            };

        case REGISTRO_ERROR:
            return {
               ...state,
                token: null,
                mensaje: action.payload
            };
       
        default:
            return state;

    }
}