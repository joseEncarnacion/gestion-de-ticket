import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Registro(){


    // initialize state
    const [usuario, guardarUsuario] = useState({
        Nombre: '',
        Apellido: '',
        NombreUsuario: '',
        telefone: '',
        email: '',
        password: '',
        confirmar: ''
    })

    //extract password and Email 
    const {Nombre, Apellido, NombreUsuario, telefone, email, password, confirmar} = usuario;

   const onChange = e =>{
       guardarUsuario({
        ...usuario,
        [e.target.name]: e.target.value
       })
   }

    const onSubmit = e =>{
        e.preventDefault();
        console.log(usuario);

        //validate the input


        //Do de action
    }

    return ( 
        <div className="User-form">
            <div className="form-container dark-shadow">
                <h2>Iniciar session</h2>
                <form
                    onSubmit={onSubmit}
                >

                    <div className="form-group">
                        <label htmlFor="Nombre">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='Nombre'
                            id="Nombre" 
                            value={Nombre}
                            aria-describedby="NombreHelp" 
                            placeholder="Enter Nombre"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Aprellidos">Aprellidos</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='Aprellidos'
                            id="Aprellidos" 
                            value={Apellido}
                            aria-describedby="AprellidosHelp" 
                            placeholder="Enter Aprellidos"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="NombreUsuario">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='NombreUsuario'
                            id="NombreUsuario" 
                            value={NombreUsuario}
                            aria-describedby="NombreUsuarioHelp" 
                            placeholder="Enter Nombre del Usuario"
                            onChange={onChange}
                        />
                    </div>
                    

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name='telefone'
                            id="telefone" 
                            value={telefone}
                            aria-describedby="telefoneHelp" 
                            placeholder="Enter telefone"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name='email'
                            id="email" 
                            value={email}
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password}
                            name='password' 
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="confirmar" 
                            className="form-control" 
                            id="confirmar" 
                            value={confirmar}
                            name='confirmar'  
                            placeholder="confirmar password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <input 
                            type='submit' 
                            className='btn btn-primary btn-block' 
                            value="Registrar usuario" 
                        />
                       

                    </div>
                    
                </form>

                
                <Link 
                    to={'/'} 
                    className='get-account btn-outliner btn-light'>
                    Ya poseeo una cuenta ir al login 
                </Link>
            </div> 
        </div>
     );
}
 
export default Registro;