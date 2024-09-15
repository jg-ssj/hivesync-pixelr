import jwt from 'jsonwebtoken'; 

export function generateJwtToken() {
  const payload = {
    sub: process.env.CLIENT_KEY,
    mode: 'http', // Cambiado a 'http' para el modo de operación correcto
    openUrl: 'https://yourdomain.com/image.png', // URL de la imagen que Pixlr abrirá inicialmente
    saveUrl: 'https://yourdomain.com/save-image', // URL donde Pixlr enviará la imagen guardada
  };

  console.log('Generating JWT with payload:', payload);

  const token = jwt.sign(payload, process.env.CLIENT_SECRET, {
    algorithm: 'HS256',
  });

  console.log('Generated token:', token);

  return token;
}
