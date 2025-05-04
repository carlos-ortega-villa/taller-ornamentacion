const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:Z18k2rH4DLN5m3zn@ornamentacion.xyf1jva.mongodb.net/?retryWrites=true&w=majority&appName=Ornamentacion', 
        {
      useNewUrlParser: true,
      useUnifiedTopology: true
        });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
