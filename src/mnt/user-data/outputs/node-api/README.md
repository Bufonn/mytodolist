# 🚀 API To-Do List — Node.js Puro

API RESTful construída com **Node.js puro**, sem frameworks, usando apenas o módulo nativo `http` e o sistema de módulos **CommonJS**.

Projeto desenvolvido como atividade da disciplina **PW II** — Etec Bento Quirino.

---

## 📋 Descrição do Projeto

Uma API de gerenciamento de tarefas com arquitetura em camadas profissional (Routes → Controller → Service → Model), com persistência de dados em arquivo JSON.

## ✅ Níveis Implementados

### Nível Júnior — Menção R
- Campo `completed` adicionado ao Model
- Endpoint `PUT /tasks/:id` suporta atualizar `title` e/ou `completed`

### Nível Pleno — Menção B
- Endpoint `GET /tasks/:id` — busca tarefa por ID com validação de erro

### Nível Sênior — Menção MB
- Persistência em arquivo `data/tasks.json` usando o módulo `fs`
- Dados carregados ao iniciar o servidor
- Array em memória substituído por leitura/escrita em disco

---

## 📁 Estrutura do Projeto

```
TO_DO_LIST/
└── src/
    ├── controllers/
    │   └── taskController.js
    ├── models/
    │   └── taskModel.js
    ├── routes/
    │   └── taskRoutes.js
    ├── services/
    │   └── taskService.js
    └── app.js
data/
    └── tasks.json        ← gerado automaticamente
package.json
README.md
```

## 🛠️ Tecnologias Utilizadas

- Node.js (módulo `http` nativo)
- Módulo `fs` para persistência
- CommonJS (`require` / `module.exports`)
- Sem dependências externas

## ⚙️ Configuração do Ambiente

- Node.js v18 ou superior instalado
- Sem necessidade de banco de dados

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/api-todo-list.git
cd api-todo-list
```

Não há dependências externas — nenhum `npm install` necessário.

## ▶️ Execução

```bash
# Produção
npm start

# Desenvolvimento (com hot reload — Node 18+)
npm run dev
```

Servidor iniciará em: `http://localhost:3000`

---

## 🔌 Endpoints

| Método | Rota          | Descrição             |
|--------|---------------|-----------------------|
| GET    | /tasks        | Listar todas          |
| POST   | /tasks        | Criar tarefa          |
| GET    | /tasks/:id    | Buscar por ID         |
| PUT    | /tasks/:id    | Atualizar tarefa      |
| DELETE | /tasks/:id    | Deletar tarefa        |

### Exemplos

**Criar tarefa**
```
POST /tasks
{ "title": "Estudar Node.js" }

→ 201 { "id": 1, "title": "Estudar Node.js", "completed": false, "createdAt": "..." }
```

**Marcar como concluída**
```
PUT /tasks/1
{ "completed": true }

→ 200 { "id": 1, "title": "Estudar Node.js", "completed": true, "createdAt": "..." }
```

**Buscar por ID**
```
GET /tasks/1
→ 200 { "id": 1, ... }

GET /tasks/99
→ 404 { "message": "Tarefa não encontrada" }
```

---

## 💡 Explicação da Solução

A arquitetura segue o padrão de camadas:

- **Routes** (`taskRoutes.js`): recebe a requisição HTTP, identifica método + URL e delega ao Controller. Sem nenhuma lógica de negócio.
- **Controller** (`taskController.js`): extrai dados da requisição (body, parâmetros de URL), chama o Service e monta a resposta HTTP.
- **Service** (`taskService.js`): contém toda a lógica de negócio. Não conhece HTTP — opera apenas com dados. Usa o módulo `fs` para persistência em `data/tasks.json`.
- **Model** (`taskModel.js`): define o formato/estrutura de uma tarefa (factory function).

O arquivo `tasks.json` é criado automaticamente na primeira execução.
