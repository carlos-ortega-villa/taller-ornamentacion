const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Quote = require('./models/Quote');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);


// ✅ Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ornamentacionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');

  // Iniciar el servidor solo si la DB se conecta bien
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });

})
.catch((error) => {
  console.error('❌ Error al conectar con MongoDB:', error);
});

// Ruta para enviar formulario
app.post('/contact', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    const newQuote = new Quote({ nombre, correo, mensaje });
    await newQuote.save();
    res.status(200).json({ message: 'Formulario enviado con éxito!', data: newQuote });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Hubo un error al procesar tu solicitud' });
  }
});

// Obtener cotizaciones
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las cotizaciones' });
  }
});

// Eliminar cotización
app.delete('/quotelist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Quote.findByIdAndDelete(id); // 🔁 Asegúrate de que esté usando el modelo `Quote`, no `Cotizacion`
    res.status(200).json({ message: 'Cotización eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cotización' });
  }
});
