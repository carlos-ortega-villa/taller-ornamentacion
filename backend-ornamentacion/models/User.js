const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  }
});

// Hash automático antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
