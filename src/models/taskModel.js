// Camada de Model
// Define a estrutura (formato) de uma tarefa

export const createTask = (id, title) => {
  return {
    id,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
};