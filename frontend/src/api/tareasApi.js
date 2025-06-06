import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

export const getTareasByObjetivo = async (objetivo_id) => {
    const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/objetivos/</span>{objetivo_id}/tareas`);
    return response.data;
};

export const createTarea = async (objetivo_id, tarea) => {
    const response = await axios.post(`<span class="math-inline">\{API\_BASE\_URL\}/objetivos/</span>{objetivo_id}/tareas`, tarea);
    return response.data;
};

export const updateTarea = async (id, tarea) => {
    const response = await axios.put(`<span class="math-inline">\{API\_BASE\_URL\}/tareas/</span>{id}`, tarea);
    return response.data;
};

export const deleteTarea = async (id) => {
    const response = await axios.delete(`<span class="math-inline">\{API\_BASE\_URL\}/tareas/</span>{id}`);
    return response.data;
};