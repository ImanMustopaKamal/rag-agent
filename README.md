# Mastra Agent API

Service ini adalah REST API berbasis **Express + TypeScript** dengan integrasi **OpenAI + PostgreSQL (pgvector)** untuk mendukung fitur **RAG (Retrieval-Augmented Generation)**.  
Aplikasi dijalankan menggunakan **Docker & Docker Compose**, Dokumentasi API tersedia melalui **Swagger UI** di `/api-docs`

---

## Prasyarat

Sebelum menjalankan proyek, pastikan sudah menginstal:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

> Pastikan docker berjalan 

---

## Instalasi & Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/ImanMustopaKamal/rag-agent.git
cd rag-agent
```
> Pastikan code up to date gunakan ```git pull```

### 2. Konfigurasi Environment

Buat file `.env` di root project berdasarkan file `.env.template`

> Pastikan `OPENAI_API_KEY` diisi dengan API key yang valid.
> Pastikan `DB_PASSWORD` diisi dengan Password yang valid

---

### 3. Menjalankan Aplikasi

**Reset container & volume (optional)**
```bash
docker-compose down -v
```

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

  👉 Wajib dilakukan sebelum menggunakan API Chat. Contoh file markdown yang dapat digunakan terdapat pada folder documents

---

2. **Chat dengan Dokumen (Chat API)**

  Endpoint:

  ```
  POST /api/chat
  ```

  Request (JSON):

  ```json
  {
    "userId": "user-1",
    "threadId": "thread-1",
    "message": "pengajuan cuti?"
  }
  ```

  Response (JSON):

  ```json
  {
    "response": "Berikut adalah informasi mengenai pengajuan cuti:\n\n1. **Cuti Tahunan**: Karyawan berhak atas 12 hari cuti tahunan berbayar per tahun. Permintaan cuti harus diajukan melalui sistem HRIS minimal 7 hari kerja sebelumnya. Cuti yang tidak digunakan tidak dapat diakumulasikan ke tahun berikutnya.\n\n2. **Cuti Sakit**: Karyawan berhak atas 5 hari cuti sakit berbayar per tahun tanpa perlu surat dokter. Untuk cuti sakit lebih dari 2 hari berturut-turut, surat keterangan dokter wajib dilampirkan.\n\n3. **Cuti Hamil dan Melahirkan**: Karyawati berhak atas 3 bulan cuti melahirkan berbayar sesuai dengan peraturan pemerintah.\n\n4. **Cuti Khusus**: Cuti untuk acara keluarga penting (misalnya, pernikahan, duka cita) akan dipertimbangkan secara kasus per kasus oleh manajemen."
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
