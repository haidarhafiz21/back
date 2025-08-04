import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",   // ganti kalau pakai Railway MySQL
  user: process.env.DB_USER || "root",        // username MySQL kamu
  password: process.env.DB_PASSWORD || "",    // password MySQL kamu
  database: process.env.DB_NAME || "db_simulasi",
  port: process.env.DB_PORT || 3306,
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
    process.exit(1);
  }
  console.log("✅ Terhubung ke database db_simulasi!");
});

// Route default (cek backend aktif)
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Berjalan!");
});

// API Login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan Password wajib diisi!" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login berhasil!" });
    } else {
      res.status(401).json({ success: false, message: "Email atau password salah" });
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
