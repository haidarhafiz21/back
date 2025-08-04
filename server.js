import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup __dirname (karena pakai ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve file statis (login.html, script.js, dll)
app.use(express.static(path.join(__dirname, "public")));

// Koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_simulasi",
  port: process.env.DB_PORT || 3306,
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
  } else {
    console.log("✅ Koneksi database berhasil");

    // Buat tabel jika belum ada
    const createTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        waktu DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;
    db.query(createTable, (err) => {
      if (err) console.error("❌ Gagal membuat tabel:", err);
      else console.log("✅ Tabel users siap digunakan");
    });
  }
});

// API simpan login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
  }

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err) => {
    if (err) {
      console.error("❌ Error simpan:", err);
      return res.status(500).json({ success: false, message: "Gagal simpan ke database" });
    }
    return res.json({ success: true, message: "Login berhasil" });
  });
});

// Route default untuk test
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
