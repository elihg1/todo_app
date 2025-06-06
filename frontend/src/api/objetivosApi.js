import axios from 'axios';

const API_URL = 'http://localhost:5000/objetivos'; 

export const getObjetivos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getObjetivoById = async (id) => {
    const response = await axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
    return response.data;
};

export const createObjetivo = async (objetivo) => {
    const response = await axios.post(API_URL, objetivo);
    return response.data;
};

export const updateObjetivo = async (id, objetivo) => {
    const response = await axios.put(`<span class="math-inline">\{API\_URL\}/</span>{id}`, objetivo);
    return response.data;
};

export const deleteObjetivo = async (id) => {
    const response = await axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
    return response.data;
};