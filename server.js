import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Konfigurasi path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // layani file di folder public

// Koneksi Database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_simulasi",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
  } else {
    console.log("✅ Koneksi database berhasil");
  }
});

// Route root (cek backend aktif)
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

// Route simpan login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email dan password wajib diisi" });
  }

  const sql = "INSERT INTO users (email, password, waktu) VALUES (?, ?, NOW())";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Gagal simpan:", err);
      return res.status(500).json({ success: false, message: "Gagal simpan ke database" });
    }
    res.json({ success: true, message: "Data berhasil disimpan" });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
