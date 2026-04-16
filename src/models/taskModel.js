// Camada de Model
// Define a estrutura (formato) de uma tarefa

const createTask = (id, title) => {
  return {
    id,
    title,
    completed: false,       // Desafio Júnior 1 — campo completed
    createdAt: new Date().toISOString(),
  };
};

module.exports = { createTask };
