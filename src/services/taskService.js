//Camada de Service
//Contém a lógica de negócio "coração da aplicação"

import { createTask } from '../models/taskModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

function readTasks() {
  ensureDataFile();
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(content);
}

function writeTasks(tasks) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

function nextId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((t) => t.id)) + 1;
}

const addTask = (title) => {
  const tasks = readTasks();
  const task = createTask(nextId(tasks), title);
  tasks.push(task);
  writeTasks(tasks);
  return task;
};

const getTasks = () => readTasks();

const getTaskById = (id) => {
  const tasks = readTasks();
  return tasks.find((t) => t.id === id) || null;
};

const updateTask = (id, { title, completed }) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  writeTasks(tasks);
  return task;
};

const deleteTask = (id) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  writeTasks(tasks);
  return true;
};

export default { addTask, getTasks, getTaskById, updateTask, deleteTask };