import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Koneksi Database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
  } else {
    console.log("✅ Koneksi database berhasil");
  }
});

// Route default untuk cek backend
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

// Registrasi user baru
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email dan password wajib diisi" });

  const sql = "INSERT INTO users (email, password, waktu) VALUES (?, ?, NOW())";
  db.query(sql, [email, password], (err) => {
    if (err) return res.status(500).json({ message: "❌ Gagal menyimpan data" });
    res.json({ success: true, message: "✅ Registrasi berhasil" });
  });
});

// Login user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email dan password harus diisi" });

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Kesalahan server" });
    if (result.length > 0) {
      res.json({ success: true, message: "✅ Login berhasil" });
    } else {
      res.status(401).json({ success: false, message: "❌ Email atau password salah" });
    }
  });
});

// Jalankan server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
