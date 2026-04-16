import ListaTarefas from './components/ListaTarefas';

import './style/App.css';

function App() {

  return (
    <>
      <h1>Tarefas</h1>
      <p className="subtitle">Mantenha o foco no que importa.</p>
      <ListaTarefas />
    </>
  );
}

export default App;