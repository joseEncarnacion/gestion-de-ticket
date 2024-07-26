import React, { useReducer } from 'react';
import AlertaContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertState = props => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const mostrarAlerta = (mensaje, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        mensaje,
        categoria
      }
    });

    setTimeout(() => {
      dispatch({ type: OCULTAR_ALERTA });
    }, 5000);
  };

  return (
    <AlertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  );
};

export default AlertState;
