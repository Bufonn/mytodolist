// Camada de Rotas (Routes)
// Porta de entrada da API — mapeia URLs para funções do Controller
// NÃO contém lógica de negócio

const taskController = require('../controllers/taskController');

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;

  // GET /tasks — Listar todas
  if (url === '/tasks' && method === 'GET') {
    return taskController.listTasks(req, res);
  }

  // POST /tasks — Criar tarefa
  if (url === '/tasks' && method === 'POST') {
    return taskController.createTask(req, res);
  }

  // Rotas com ID: /tasks/:id
  if (url.startsWith('/tasks/')) {
    const parts = url.split('/');
    const id = parseInt(parts[2]);

    if (isNaN(id)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: 'ID inválido' }));
    }

    // GET /tasks/:id — Buscar por ID (Desafio Pleno)
    if (method === 'GET') {
      return taskController.getTaskById(req, res, id);
    }

    // PUT /tasks/:id — Atualizar
    if (method === 'PUT') {
      return taskController.updateTask(req, res, id);
    }

    // DELETE /tasks/:id — Deletar
    if (method === 'DELETE') {
      return taskController.deleteTask(req, res, id);
    }
  }

  // Rota não encontrada
  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
};
