const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

// Registro
router.post('/register', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new User({ correo, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id }, 'secreto123', { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ error: 'Error al intentar iniciar sesión' });
  }
});

// Ruta protegida
router.get('/perfil', verifyToken, (req, res) => {
  res.json({ message: 'Bienvenido al perfil protegido', userId: req.user.id });
});

module.exports = router;
