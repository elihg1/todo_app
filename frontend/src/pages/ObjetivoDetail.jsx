import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getObjetivoById } from '../api/objetivosApi';
import { getTareasByObjetivo, createTarea, updateTarea, deleteTarea } from '../api/tareasApi';
import TareaForm from '../components/TareaForm'; 
import TareaItem from '../components/TareaItem'; 

function ObjetivoDetail() {
    const { id } = useParams();
    const [objetivo, setObjetivo] = useState(null);
    const [tareas, setTareas] = useState([]);
    const [editingTarea, setEditingTarea] = useState(null);

    useEffect(() => {
        fetchObjetivoAndTareas();
    }, [id]);

    const fetchObjetivoAndTareas = async () => {
        try {
            const objetivoData = await getObjetivoById(id);
            setObjetivo(objetivoData);
            const tareasData = await getTareasByObjetivo(id);
            setTareas(tareasData);
        } catch (error) {
            console.error("Error fetching objetivo or tareas:", error);
            
            setObjetivo(null); 
        }
    };

    const handleSaveTarea = async (formData) => {
        if (editingTarea) {
            
            await updateTarea(editingTarea.id, formData);
        } else {
            
            await createTarea(id, formData); 
        }
        setEditingTarea(null); 
        fetchObjetivoAndTareas(); 
    };

    const handleEditClick = (tarea) => {
        setEditingTarea(tarea);
    };

    const handleDeleteTarea = async (tarea_id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            await deleteTarea(tarea_id);
            fetchObjetivoAndTareas();
        }
    };

    const handleCancelEdit = () => {
        setEditingTarea(null);
    };

    if (objetivo === null) {
        return <div>Cargando objetivo o objetivo no encontrado...</div>;
    }

    return (
        <div>
            <h2>Objetivo: {objetivo.nombre}</h2>
            <p>Fecha de Inicio: {objetivo.fecha_inicio ? new Date(objetivo.fecha_inicio).toLocaleDateString() : 'N/A'}</p>
            <p>Fecha Planeada Final: {objetivo.fecha_planeada_final ? new Date(objetivo.fecha_planeada_final).toLocaleDateString() : 'N/A'}</p>

            <h3>Tareas</h3>
            <TareaForm
                initialData={editingTarea}
                onSubmit={handleSaveTarea}
                onCancel={handleCancelEdit}
            />

            <div className="tareas-list">
                {tareas.length > 0 ? (
                    tareas.map((tarea) => (
                        <TareaItem
                            key={tarea.id}
                            tarea={tarea}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteTarea}
                        />
                    ))
                ) : (
                    <p>No hay tareas para este objetivo. ¡Añade la primera!</p>
                )}
            </div>
        </div>
    );
}

export default ObjetivoDetail;