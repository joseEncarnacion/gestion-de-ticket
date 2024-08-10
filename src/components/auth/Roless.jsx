// src/components/Roless.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import Swal from 'sweetalert2';
import './Roless.css';

function Roless() {
    const [userId, setUserId] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile) {
            setUserId(userProfile.id);
            setRoles(userProfile.roles);
        }
    }, []);

    const addRole = async (role) => {
        if (!userId) {
            Swal.fire({
                title: 'Error',
                text: 'Usuario no encontrado. Por favor, asegúrate de estar autenticado.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await apiService.addRoleToUser(userId, role);
            if (response.status === 204) {
                Swal.fire({
                    title: 'Éxito',
                    text: `Rol ${role} añadido correctamente.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                setRoles([...roles, role]); // Actualizar los roles en el estado
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo añadir el rol. Intenta nuevamente.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al añadir el rol:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al intentar añadir el rol. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="roless-container">
            <h2>Asignar Roles al Usuario</h2>
            <div className="buttons-container">
                <button onClick={() => addRole('Propietario')}>Agregar Propietario</button>
                <button onClick={() => addRole('Empleado')}>Agregar Empleado</button>
            </div>
            <div className="current-roles">
                <h3>Roles actuales:</h3>
                <ul>
                    {roles.map((role, index) => (
                        <li key={index}>{role}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Roless;
