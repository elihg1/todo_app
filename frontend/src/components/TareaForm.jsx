import React, { useState, useEffect } from 'react';

function TareaForm({ initialData = null, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                titulo: initialData.titulo || '',
                descripcion: initialData.descripcion || ''
            });
        } else {
            setFormData({ titulo: '', descripcion: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        if (!initialData) { // Solo limpiar si es un nuevo formulario
            setFormData({ titulo: '', descripcion: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-section">
            <h3>{initialData ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h3>
            <input
                type="text"
                name="titulo"
                placeholder="Título de la Tarea"
                value={formData.titulo}
                onChange={handleChange}
                required
            />
            <textarea
                name="descripcion"
                placeholder="Descripción de la Tarea"
                value={formData.descripcion}
                onChange={handleChange}
            ></textarea>
            <button type="submit">{initialData ? 'Actualizar Tarea' : 'Agregar Tarea'}</button>
            {initialData && <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>}
        </form>
    );
}

export default TareaForm;