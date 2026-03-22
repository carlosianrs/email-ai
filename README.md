# 🚀 Email AI

Aplicação web que utiliza Inteligência Artificial para **classificar emails** e **gerar respostas automáticas**, com foco em otimizar o fluxo de trabalho em ambientes corporativos de alto volume.

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como solução para um cenário do setor financeiro, onde há grande volume de emails que precisam ser analisados manualmente.

A aplicação automatiza esse processo utilizando IA, sendo capaz de:

* 📥 Receber emails (texto ou arquivo)
* 🧠 Classificar como **Produtivo** ou **Improdutivo**
* 💬 Gerar respostas automáticas adequadas
* ⚡ Melhorar a eficiência operacional da equipe

---

## 🧠 Classificação

* **Produtivo** → Requer ação ou resposta
  *Ex: suporte, dúvidas, solicitações*

* **Improdutivo** → Não requer ação
  *Ex: agradecimentos, felicitações*

---

## 🏗️ Arquitetura

```
Frontend (Next.js)
        ↓
Backend API (FastAPI)
        ↓
OpenAI (gpt-4o-mini)
```

---

## ⚙️ Tecnologias Utilizadas

### 🔹 Frontend

* Next.js
* React
* Fetch API

### 🔹 Backend

* FastAPI
* Uvicorn
* Pydantic
* OpenAI API
* PyPDF

### 🔹 IA

* Modelo: `gpt-4o-mini`
* Classificação + geração de resposta via prompt engineering

---

## 🔐 Variáveis de Ambiente

### 🐍 Backend (`/server/.env`)

```
OPENAI_API_KEY=sua_chave_aqui
```

---

### 🌐 Frontend (`/frontend/.env`)

```
HOST_SERVER=http://localhost
PORT_SERVER=8000
```

---

## ▶️ Como Rodar o Projeto

### 🔹 1. Clone o repositório

```
git clone <seu-repo>
cd email-ai
```

---

## 🐍 Backend

### 1. Acesse a pasta

```
cd server
```

### 2. Crie e ative o ambiente virtual

```
python -m venv venv

# Windows (PowerShell)
venv\Scripts\activate
```

### 3. Instale as dependências

```
pip install -r requirements.txt
```

### 4. Configure o `.env`

```
OPENAI_API_KEY=your_key_here
```

### 5. Rode o servidor

```
uvicorn app.main:app --reload
```

---

### 📄 Documentação automática da API

* Swagger: http://localhost:8000/docs

---

## 🌐 Frontend

### 1. Acesse a pasta

```
cd frontend
```

### 2. Instale dependências

```
npm install
```

### 3. Configure o `.env`

```
HOST_SERVER=http://localhost
PORT_SERVER=8000
```

### 4. Rode o projeto

```
npm run dev
```

---

## 🔌 Endpoints da API

### 📥 POST `/analyze-text`

Analisa texto direto

**Request:**

```json
{
  "text": "Olá, gostaria de saber o status do meu chamado."
}
```

---

### 📁 POST `/analyze-file`

Upload de arquivos `.txt` ou `.pdf`

---

## 💡 Diferenciais do Projeto

* ✅ Uso de IA para classificação e resposta
* ✅ Validação robusta com Pydantic
* ✅ Arquitetura organizada (service, schema, utils)
* ✅ Documentação automática (Swagger)
* ✅ Suporte a PDF e texto
* ✅ Código limpo e escalável

---

## 🧠 Decisões Técnicas

Optou-se pelo uso de LLMs ao invés de modelos tradicionais de machine learning devido a:

* Maior assertividade
* Menor tempo de desenvolvimento
* Flexibilidade via prompt engineering

---

## 🎯 Objetivo

Reduzir o esforço manual na triagem de emails e permitir que equipes foquem em tarefas mais estratégicas.