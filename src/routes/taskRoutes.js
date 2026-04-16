// Camada de Rotas
// Mapeia URLs para funções do Controller

import taskController from '../controllers/taskController.js';

export default (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/tasks' && method === 'GET') {
    return taskController.listTasks(req, res);
  }

  if (url === '/tasks' && method === 'POST') {
    return taskController.createTask(req, res);
  }

  if (url.startsWith('/tasks/')) {
    const parts = url.split('/');
    const id = parseInt(parts[2]);

    if (isNaN(id)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: 'ID inválido' }));
    }

    if (method === 'GET') return taskController.getTaskById(req, res, id);
    if (method === 'PUT') return taskController.updateTask(req, res, id);
    if (method === 'DELETE') return taskController.deleteTask(req, res, id);
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};