import React, {useReducer} from 'react'

import AlertaContext from "./alertContext";
import AlertReducer from "./alertReducer";

const AlertState = props => {
   
    const initialState = {
        alerta: null,
        mostrarAlerta: false
    };

    const [state, dispatch] = useReducer(AlertReducer, initialState);


    return (
        <AlertaContext.Provider>

        </AlertaContext.Provider>
    );
}

export default AlertState;

