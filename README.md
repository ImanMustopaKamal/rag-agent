# Mastra Agent API

Service ini adalah REST API berbasis **Express + TypeScript** dengan integrasi **OpenAI + PostgreSQL (pgvector)** untuk mendukung fitur **RAG (Retrieval-Augmented Generation)**.  
Aplikasi dijalankan menggunakan **Docker & Docker Compose**, Dokumentasi API tersedia melalui **Swagger UI** di `/api-docs`

---

## Prasyarat

Sebelum menjalankan proyek, pastikan sudah menginstal:

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

## Instalasi & Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/ImanMustopaKamal/rag-agent.git
cd rag-agent
```

### 2. Konfigurasi Environment

Buat file `.env` di root project berdasarkan file `.env.template`, Pastikan OPENAI_API_KEY diisi dengan API key yang valid.

### 3. Build & Run container

```bash
docker-compose up --build -d
```
