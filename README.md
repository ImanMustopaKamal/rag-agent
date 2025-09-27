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

Buat file `.env` di root project berdasarkan file `.env.template`

> Pastikan `OPENAI_API_KEY` diisi dengan API key yang valid.

---

### 3. Menjalankan Aplikasi

1. **Build & Run container**

```bash
docker-compose up --build -d
```

2. **Cek service berjalan**

```bash
docker ps
```

3. **Cek logs aplikasi**

```bash
docker logs -f <container_id_app>
```

---

## API Documentation

Swagger UI tersedia di:

```
http://localhost:3000/api-docs
```

---

## Alur Penggunaan API

1. **Upload Dokumen ke Database (Ingestion API)**

  Endpoint:

  ```
  POST /api/ingestion
  ```

  Request (multipart/form-data):

  | Field | Type | Required | Deskripsi              |
  | ----- | ---- | -------- | ---------------------- |
  | file  | file | ✅       | Dokumen untuk diunggah |

  Contoh dengan cURL:

  ```bash
  curl -X POST http://localhost:3000/api/ingestion      -F "file=@./documents/sample.pdf"
  ```

  👉 Wajib dilakukan sebelum menggunakan API Chat.

---

2. **Chat dengan Dokumen (Chat API)**

  Endpoint:

  ```
  POST /api/chat
  ```

  Request (JSON):

  ```json
  {
    "message": "Apa isi dari dokumen yang saya upload?"
  }
  ```

  Response (JSON):

  ```json
  {
    "answer": "Dokumen menjelaskan tentang ..."
  }
  ```

## Status Healthcheck

- API Healthcheck:

  ```
  GET http://localhost:3000/health
  ```

  Response: `200 OK`

- PostgreSQL Healthcheck otomatis dijalankan oleh Docker Compose.

---
