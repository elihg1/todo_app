import React from 'react';
import { Link } from 'react-router-dom';

function ObjetivoCard({ objetivo, onEdit, onDelete }) {
    return (
        <div className="objetivo-card">
            <h3><Link to={`/objetivo/${objetivo.id}`}>{objetivo.nombre}</Link></h3>
            <p>Inicio: {objetivo.fecha_inicio ? new Date(objetivo.fecha_inicio).toLocaleDateString() : 'N/A'}</p>
            <p>Fin Planeado: {objetivo.fecha_planeada_final ? new Date(objetivo.fecha_planeada_final).toLocaleDateString() : 'N/A'}</p>
            <button onClick={() => onEdit(objetivo)}>Editar</button>
            <button onClick={() => onDelete(objetivo.id)} className="delete-button">Eliminar</button>
        </div>
    );
}

export default ObjetivoCard;