
import jwt from 'jsonwebtoken'; 

export function generateJwtToken() {
  const payload = {
    sub: process.env.CLIENT_KEY,
    mode: 'embedded',
    origin: 'https://hivesync-pixelr.vercel.app/',
  };

  const token = jwt.sign(payload, process.env.CLIENT_SECRET, {
    algorithm: 'HS256',
  });

  return token;
}
