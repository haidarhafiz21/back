import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// koneksi database
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
    return;
  }
  console.log("✅ Terhubung ke database MySQL");
});

// route root
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

// endpoint simpan data login
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

app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
