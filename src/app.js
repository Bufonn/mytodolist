// Servidor principal — Node.js puro (sem Express)
// Módulo HTTP nativo + CommonJS

const http = require('http');
const taskRoutes = require('./routes/taskRoutes');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Define cabeçalho JSON e habilita CORS básico
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde preflight CORS
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // Chama o roteador
  taskRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log('  GET    /tasks');
  console.log('  POST   /tasks');
  console.log('  GET    /tasks/:id');
  console.log('  PUT    /tasks/:id');
  console.log('  DELETE /tasks/:id');
});
