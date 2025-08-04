import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "db_simulasi",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
    return;
  }
  console.log("✅ Terkoneksi ke MySQL!");
});

// API untuk simpan data login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Error insert:", err);
      res.status(500).json({ message: "❌ Gagal menyimpan data" });
    } else {
      res.json({ message: "✅ Data berhasil disimpan!", id: result.insertId });
    }
  });
});

// API untuk ambil semua data
app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM users ORDER BY waktu DESC", (err, rows) => {
    if (err) {
      console.error("❌ Error ambil data:", err);
      res.status(500).json({ message: "❌ Gagal ambil data" });
    } else {
      res.json(rows);
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
