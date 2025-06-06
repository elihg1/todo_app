import React, { useState, useEffect } from 'react';
import { getObjetivos, createObjetivo, updateObjetivo, deleteObjetivo } from '../api/objetivosApi';
import ObjetivoForm from '../components/ObjetivoForm'; // Importar el nuevo componente de formulario
import ObjetivoCard from '../components/ObjetivoCard'; // Importar el nuevo componente de tarjeta

function ObjetivosPage() {
    const [objetivos, setObjetivos] = useState([]);
    const [editingObjetivo, setEditingObjetivo] = useState(null); // Para pasar datos al formulario de edición

    useEffect(() => {
        fetchObjetivos();
    }, []);

    const fetchObjetivos = async () => {
        const data = await getObjetivos();
        setObjetivos(data);
    };

    const handleSaveObjetivo = async (formData) => {
        if (editingObjetivo) {
            // Actualizar objetivo existente
            await updateObjetivo(editingObjetivo.id, formData);
        } else {
            // Crear nuevo objetivo
            await createObjetivo(formData);
        }
        setEditingObjetivo(null); // Salir del modo edición
        fetchObjetivos(); // Recargar la lista
    };

    const handleEditClick = (objetivo) => {
        setEditingObjetivo(objetivo); // Establecer el objetivo para editar
    };

    const handleDeleteObjetivo = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este objetivo y todas sus tareas?')) {
            await deleteObjetivo(id);
            fetchObjetivos();
        }
    };

    const handleCancelEdit = () => {
        setEditingObjetivo(null); // Cancelar la edición
    };

    return (
        <div>
            <h2>Gestión de Objetivos</h2>

            <ObjetivoForm
                initialData={editingObjetivo}
                onSubmit={handleSaveObjetivo}
                onCancel={handleCancelEdit}
            />

            <div className="objetivos-list">
                {objetivos.length > 0 ? (
                    objetivos.map((objetivo) => (
                        <ObjetivoCard
                            key={objetivo.id}
                            objetivo={objetivo}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteObjetivo}
                        />
                    ))
                ) : (
                    <p>No hay objetivos creados aún. ¡Empieza creando uno!</p>
                )}
            </div>
        </div>
    );
}

export default ObjetivosPage;