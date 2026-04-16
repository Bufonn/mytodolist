# 📝 Gerenciador de Tarefas — React To-Do List

Projeto desenvolvido como atividade da disciplina de **Programação Web**, seguindo o guia da Etec Bento Quirino.

## 📋 Descrição do Projeto

Aplicação web de lista de tarefas (To-Do List) construída com **React + Vite**, implementando todos os desafios propostos no guia.

## ✅ Funcionalidades Implementadas

### Base
- Adicionar tarefas (botão ou tecla Enter)
- Remover tarefas individualmente

### Desafio 1 — Estilização
- Tema dark com paleta coesa usando CSS Variables
- Tipografia com fontes Syne + DM Sans
- Animações de entrada e micro-interações nos botões
- Layout responsivo para mobile

### Desafio 2 — Marcar como concluída
- Botão de check em cada tarefa
- Tarefa concluída recebe riscado + opacidade reduzida
- Botão "Limpar concluídas" aparece quando há tarefas concluídas

### Desafio 3 — Persistência com localStorage
- Tarefas salvas automaticamente no `localStorage`
- Lista restaurada ao recarregar a página

### Desafio 4 — Ordenação
- Ordenar por **data de adição** (padrão)
- Ordenar por **ordem alfabética**
- Controle de ordenação visível quando há mais de 1 tarefa

## 🛠️ Tecnologias Utilizadas

- React 18
- Vite
- CSS3 (variáveis, animações, flexbox)
- localStorage API

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/Bufonn/mytodolist.git
cd mytodolist

# Instale as dependências
npm install
```

## ▶️ Execução

```bash
npm run dev:full
```

Acesse: [http://localhost:5174](http://localhost:5174)

## 📁 Estrutura do Projeto

```
MYTODOLIST/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ListaTarefas.jsx
│   ├── controllers/
│   │   └── taskController.js
│   ├── data/
│   │   └── tasks.json
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── taskService.js
│   ├── style/
│   │   ├── App.css
│   │   ├── index.css
│   │   └── ListaTarefas.css
│   ├── app.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 💡 Explicação da Solução

O estado das tarefas é gerenciado com `useState`, onde cada tarefa é um objeto com `id`, `texto`, `concluida` e `dataAdicao`. O `useEffect` observa mudanças no array de tarefas e sincroniza com o `localStorage` automaticamente. A ordenação é feita derivando uma cópia do array com `sort()` sem mutar o estado original.
