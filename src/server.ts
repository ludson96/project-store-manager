import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = Number(process.env.PORT) || 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Store Manager API running on http://${HOST}:${PORT}`);
  console.log(`📖 Swagger API Docs available at http://${HOST}:${PORT}/api-docs`);
  console.log(`🩺 Health check at http://${HOST}:${PORT}/health`);
});
