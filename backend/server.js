import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer'; // Importamos multer para manejar la subida de archivos
import { generateJwtToken } from './jwtUtils.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración para almacenar archivos en la carpeta "uploads"
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.get('/api/get-token', (req, res) => {
  try {
    console.log('Request received for token generation');
    const token = generateJwtToken();
    res.send(token); // Envía el token directamente sin envolver
    console.log('Token sent successfully');
  } catch (error) {
    console.error('Error al generar el token:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Nueva ruta para manejar la imagen guardada desde Pixlr
app.post('/save-image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo');
  }

  console.log('Imagen guardada exitosamente:', req.file.path);
  res.json({ message: 'Imagen guardada exitosamente', filePath: req.file.path });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
