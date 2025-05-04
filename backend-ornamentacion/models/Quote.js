const mongoose = require('mongoose');

// Definir el esquema de cotización
const quoteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

// Crear el modelo basado en el esquema
const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
