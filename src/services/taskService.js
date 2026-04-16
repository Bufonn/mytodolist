// Camada de Service
// Contém a lógica de negócio — "coração da aplicação"
// Service NÃO conhece HTTP (sem req/res aqui)

const { createTask } = require('../models/taskModel');
const fs = require('fs');
const path = require('path');

// ===== NÍVEL SÊNIOR — Persistência em arquivo JSON =====
const DATA_FILE = path.join(__dirname, '../data/tasks.json');

// Garante que o arquivo e a pasta existem
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

// Lê tarefas do arquivo
function readTasks() {
  ensureDataFile();
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(content);
}

// Salva tarefas no arquivo
function writeTasks(tasks) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

// Gera próximo ID com base no arquivo
function nextId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((t) => t.id)) + 1;
}

// ===== CRUD =====

// Criar tarefa
const addTask = (title) => {
  const tasks = readTasks();
  const task = createTask(nextId(tasks), title);
  tasks.push(task);
  writeTasks(tasks);
  return task;
};

// Listar todas
const getTasks = () => {
  return readTasks();
};

// Buscar por ID — Desafio Pleno
const getTaskById = (id) => {
  const tasks = readTasks();
  return tasks.find((t) => t.id === id) || null;
};

// Atualizar título e/ou completed — Desafio Júnior 2
const updateTask = (id, { title, completed }) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  writeTasks(tasks);
  return task;
};

// Deletar
const deleteTask = (id) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  writeTasks(tasks);
  return true;
};

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
