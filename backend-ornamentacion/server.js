const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Quote = require('./models/Quote'); // Importa el modelo de Quote

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para poder leer los datos JSON enviados en el body

// Rutas
app.post('/contact', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    // Crear una nueva cotización usando el modelo
    const newQuote = new Quote({
      nombre,
      correo,
      mensaje
    });

    // Guardar en MongoDB
    await newQuote.save();

    // Respuesta de éxito
    res.status(200).json({ message: 'Formulario enviado con éxito!', data: newQuote });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Hubo un error al procesar tu solicitud' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/quotes', async (req, res) => {
  try {
    // Obtener todas las cotizaciones desde MongoDB
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las cotizaciones' });
  }
});

app.delete('/quotelist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Cotizacion.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cotización eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cotización' });
  }
});