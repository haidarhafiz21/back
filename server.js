import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
    return;
  }
  console.log("✅ Terhubung ke database MySQL");
});

// Root test
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

// API simpan login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email & Password wajib diisi" });
  }

  const sql = "INSERT INTO users (email, password, waktu) VALUES (?, ?, NOW())";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Error saat menyimpan:", err);
      return res.status(500).json({ success: false, message: "Gagal menyimpan data" });
    }
    res.json({ success: true, message: "Data berhasil disimpan" });
  });
});

app.listen(PORT, () => console.log(`✅ Server jalan di port ${PORT}`));
