import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_simulasi",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
    return;
  }
  console.log("✅ Koneksi database berhasil");
});

// Route cek backend aktif
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

// Route untuk menyimpan login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
  }

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Error simpan ke database:", err);
      return res.status(500).json({ success: false, message: "Gagal simpan ke database" });
    }
    console.log("✅ Data tersimpan:", email);
    res.json({ success: true, message: "Berhasil simpan data" });
  });
});

// Jalankan server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di port ${PORT}`);
});
