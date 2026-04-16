import { useState, useEffect } from 'react';
import '../style/ListaTarefas.css';

const API = 'http://localhost:3000';

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTarefas(data));
  }, []);

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === '') return;
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: novaTarefa.trim() }),
    });
    const nova = await res.json();
    setTarefas(prev => [...prev, nova]);
    setNovaTarefa('');
  };

  const toggleConcluida = async (tarefa) => {
    const res = await fetch(`${API}/tasks/${tarefa.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !tarefa.completed }),
    });
    const atualizada = await res.json();
    setTarefas(prev => prev.map(t => t.id === atualizada.id ? atualizada : t));
  };

  const removerTarefa = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    setTarefas(prev => prev.filter(t => t.id !== id));
  };

  const pendentes = tarefas.filter(t => !t.completed);
  const concluidas = tarefas.filter(t => t.completed);
  const ordenadas = [...pendentes, ...concluidas];

  return (
    <div className="container">
      <div className="input-row">
        <input
          type="text"
          value={novaTarefa}
          onChange={e => setNovaTarefa(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && adicionarTarefa()}
          placeholder="Nova tarefa..."
        />
        <button className="btn-add" onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <p className="section-label">Pendentes</p>

      <ul className="task-list">
        {ordenadas.length === 0 && (
          <li className="empty">Nenhuma tarefa ainda.</li>
        )}
        {ordenadas.map(tarefa => (
          <li key={tarefa.id} className={`task${tarefa.completed ? ' done' : ''}`}>
            <button
              className={`check${tarefa.completed ? ' checked' : ''}`}
              onClick={() => toggleConcluida(tarefa)}
              aria-label="Marcar como concluída"
            >
              {tarefa.completed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <span className="task-title">{tarefa.title}</span>
            <button className="btn-del" onClick={() => removerTarefa(tarefa.id)}>✕</button>
          </li>
        ))}
      </ul>

      <div className="stats">
        <div className="stat"><span className="stat-val">{tarefas.length}</span><span className="stat-lbl">Total</span></div>
        <div className="stat"><span className="stat-val">{concluidas.length}</span><span className="stat-lbl">Concluídas</span></div>
        <div className="stat"><span className="stat-val">{pendentes.length}</span><span className="stat-lbl">Pendentes</span></div>
      </div>
    </div>
  );
}

export default ListaTarefas;