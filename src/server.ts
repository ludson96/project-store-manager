import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Store Manager API running on http://localhost:${PORT}`);
  console.log(`📖 Swagger API Docs available at http://localhost:${PORT}/api-docs`);
  console.log(`🩺 Health check at http://localhost:${PORT}/health`);
});
