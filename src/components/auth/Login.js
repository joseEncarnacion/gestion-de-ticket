import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(){


    // initialize state
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })

    //extract password and Email 
    const {email, password} = usuario;

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

                    <div className="form-group mt-3">
                        <input 
                            type='submit' 
                            className='btn btn-primary btn-block' 
                            value="inicio de sesion" 
                        />
                       

                    </div>
                    
                </form>

                
                <Link 
                    to={'/register'} 
                    className='get-account btn-outliner btn-light'>
                    Resgistrarme 
                </Link>
            </div> 
        </div>
     );
}
 
export default Login;