import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Koneksi ke MySQL Railway
const db = mysql.createConnection({
  host: process.env.DB_HOST || "containers-us-west-55.railway.app",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "passwordmu",
  database: process.env.DB_NAME || "db_simulasi",
  port: process.env.DB_PORT || 3306,
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database:", err);
  } else {
    console.log("✅ Terhubung ke database Railway");
  }
});

// Route default
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Berjalan!");
});

// API untuk login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email dan password harus diisi" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Query error:", err);
      return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
    }

    if (results.length > 0) {
      return res.json({ success: true, message: "Login berhasil" });
    } else {
      return res.status(401).json({ success: false, message: "Login gagal: email atau password salah" });
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
