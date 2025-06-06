const express = require('express');
const cors = require('cors'); 
const pool = require('./db'); 
const app = express();
const port = 5000; 


app.use(cors()); 
app.use(express.json()); 

// --- Rutas para la entidad Objetivos (CRUD) ---

app.post('/objetivos', async (req, res) => {
    try {
        const { nombre, fecha_inicio, fecha_planeada_final } = req.body; 
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre del objetivo es requerido.' });
        }
        const newObjetivo = await pool.query(
            'INSERT INTO objetivos (nombre, fecha_inicio, fecha_planeada_final) VALUES ($1, $2, $3) RETURNING *',
            [nombre, fecha_inicio, fecha_planeada_final]
        );
        res.status(201).json(newObjetivo.rows[0]); 
    } catch (err) {
        console.error('Error al crear objetivo:', err.message);
        res.status(500).send('Error del servidor');
    }
});


app.get('/objetivos', async (req, res) => {
    try {
        const allObjetivos = await pool.query('SELECT * FROM objetivos ORDER BY id ASC');
        res.json(allObjetivos.rows);
    } catch (err) {
        console.error('Error al obtener objetivos:', err.message);
        res.status(500).send('Error del servidor');
    }
});


app.get('/objetivos/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const objetivo = await pool.query('SELECT * FROM objetivos WHERE id = $1', [id]);
        if (objetivo.rows.length === 0) {
            return res.status(404).json({ error: 'Objetivo no encontrado.' });
        }
        res.json(objetivo.rows[0]);
    } catch (err) {
        console.error('Error al obtener objetivo por ID:', err.message);
        res.status(500).send('Error del servidor');
    }
});

app.put('/objetivos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fecha_inicio, fecha_planeada_final } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre del objetivo es requerido.' });
        }
        const updateObjetivo = await pool.query(
            'UPDATE objetivos SET nombre = $1, fecha_inicio = $2, fecha_planeada_final = $3 WHERE id = $4 RETURNING *',
            [nombre, fecha_inicio, fecha_planeada_final, id]
        );
        if (updateObjetivo.rows.length === 0) {
            return res.status(404).json({ error: 'Objetivo no encontrado.' });
        }
        res.json(updateObjetivo.rows[0]);
    } catch (err) {
        console.error('Error al actualizar objetivo:', err.message);
        res.status(500).send('Error del servidor');
    }
});

app.delete('/objetivos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteObjetivo = await pool.query('DELETE FROM objetivos WHERE id = $1 RETURNING *', [id]);
        if (deleteObjetivo.rows.length === 0) {
            return res.status(404).json({ error: 'Objetivo no encontrado.' });
        }
        res.json({ message: 'Objetivo eliminado exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar objetivo:', err.message);
        res.status(500).send('Error del servidor');
    }
});

// --- Rutas para la entidad Tareas (CRUD) ---

app.post('/objetivos/:objetivo_id/tareas', async (req, res) => {
    try {
        const { objetivo_id } = req.params;
        const { titulo, descripcion } = req.body;
        if (!titulo) {
            return res.status(400).json({ error: 'El título de la tarea es requerido.' });
        }
        const newTarea = await pool.query(
            'INSERT INTO tareas (titulo, descripcion, objetivo_id) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descripcion, objetivo_id]
        );
        res.status(201).json(newTarea.rows[0]);
    } catch (err) {
        console.error('Error al crear tarea:', err.message);
        res.status(500).send('Error del servidor');
    }
});

app.get('/objetivos/:objetivo_id/tareas', async (req, res) => {
    try {
        const { objetivo_id } = req.params;
        const allTareas = await pool.query('SELECT * FROM tareas WHERE objetivo_id = $1 ORDER BY id ASC', [objetivo_id]);
        res.json(allTareas.rows);
    } catch (err) {
        console.error('Error al obtener tareas por objetivo:', err.message);
        res.status(500).send('Error del servidor');
    }
});

// Nota: Aunque las tareas están anidadas en objetivos, es común tener una ruta directa para detalle y actualización/eliminación si el ID de la tarea es único globalmente.
app.get('/tareas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await pool.query('SELECT * FROM tareas WHERE id = $1', [id]);
        if (tarea.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.json(tarea.rows[0]);
    } catch (err) {
        console.error('Error al obtener tarea por ID:', err.message);
        res.status(500).send('Error del servidor');
    }
});

app.put('/tareas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        if (!titulo) {
            return res.status(400).json({ error: 'El título de la tarea es requerido.' });
        }
        const updateTarea = await pool.query(
            'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *',
            [titulo, descripcion, id]
        );
        if (updateTarea.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.json(updateTarea.rows[0]);
    } catch (err) {
        console.error('Error al actualizar tarea:', err.message);
        res.status(500).send('Error del servidor');
    }
});


app.delete('/tareas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTarea = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
        if (deleteTarea.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.json({ message: 'Tarea eliminada exitosamente.' });
    } catch (err) {
        console.error('Error al eliminar tarea:', err.message);
        res.status(500).send('Error del servidor');
    }
});


app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});