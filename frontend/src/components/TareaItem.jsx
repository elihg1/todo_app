import React from 'react';

function TareaItem({ tarea, onEdit, onDelete }) {
    return (
        <div className="tarea-item">
            <h4>{tarea.titulo}</h4>
            <p>{tarea.descripcion}</p>
            <button onClick={() => onEdit(tarea)}>Editar</button>
            <button onClick={() => onDelete(tarea.id)} className="delete-button">Eliminar</button>
        </div>
    );
}

export default TareaItem;