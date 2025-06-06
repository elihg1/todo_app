import React, { useState, useEffect } from 'react';

function ObjetivoForm({ initialData = null, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        nombre: '',
        fecha_inicio: '',
        fecha_planeada_final: ''
    });

    useEffect(() => {
        if (initialData) {
            // Formatear las fechas para el input type="date"
            setFormData({
                nombre: initialData.nombre || '',
                fecha_inicio: initialData.fecha_inicio ? new Date(initialData.fecha_inicio).toISOString().split('T')[0] : '',
                fecha_planeada_final: initialData.fecha_planeada_final ? new Date(initialData.fecha_planeada_final).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({ nombre: '', fecha_inicio: '', fecha_planeada_final: '' });
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
            setFormData({ nombre: '', fecha_inicio: '', fecha_planeada_final: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-section">
            <h3>{initialData ? 'Editar Objetivo' : 'Crear Nuevo Objetivo'}</h3>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre del Objetivo"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <label>Fecha de Inicio:</label>
            <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
            />
            <label>Fecha Planeada Final:</label>
            <input
                type="date"
                name="fecha_planeada_final"
                value={formData.fecha_planeada_final}
                onChange={handleChange}
            />
            <button type="submit">{initialData ? 'Actualizar Objetivo' : 'Agregar Objetivo'}</button>
            {initialData && <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>}
        </form>
    );
}

export default ObjetivoForm;