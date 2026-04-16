//Camada de Controller
//Intermediário entre requisição HTTP e a lógica de negócio (Service)

import taskService from '../services/taskService.js';

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
  });
};

const createTask = async (req, res) => {
  const body = await getRequestBody(req);

  if (!body.title || body.title.trim() === '') {
    res.statusCode = 400;
    return res.end(JSON.stringify({ message: 'Campo "title" é obrigatório' }));
  }

  const task = taskService.addTask(body.title.trim());
  res.statusCode = 201;
  res.end(JSON.stringify(task));
};

const listTasks = (req, res) => {
  const tasks = taskService.getTasks();
  res.statusCode = 200;
  res.end(JSON.stringify(tasks));
};

const getTaskById = (req, res, id) => {
  const task = taskService.getTaskById(id);

  if (!task) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Tarefa não encontrada' }));
  }

  res.statusCode = 200;
  res.end(JSON.stringify(task));
};

const updateTask = async (req, res, id) => {
  const body = await getRequestBody(req);
  const task = taskService.updateTask(id, body);

  if (!task) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Tarefa não encontrada' }));
  }

  res.statusCode = 200;
  res.end(JSON.stringify(task));
};

const deleteTask = (req, res, id) => {
  const success = taskService.deleteTask(id);

  if (!success) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Tarefa não encontrada' }));
  }

  res.statusCode = 200;
  res.end(JSON.stringify({ message: 'Removida' }));
};

export default { createTask, listTasks, getTaskById, updateTask, deleteTask };