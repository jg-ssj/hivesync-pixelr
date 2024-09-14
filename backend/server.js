import dotenv from 'dotenv'; 
import express from 'express';
import cors from 'cors';
import { generateJwtToken } from './jwtUtils.js'; 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://hivesync-pixelr.vercel.app',
}));

app.get('/api/get-token', (req, res) => {
  try {
    const token = generateJwtToken();
    res.json({ token });
  } catch (error) {
    console.error('Error al generar el token:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
