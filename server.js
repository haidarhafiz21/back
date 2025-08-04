import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // untuk login.html & undangan.html

// koneksi db
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_simulasi",
});

// cek db
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi database:", err);
  } else {
    console.log("✅ Koneksi database berhasil");
  }
});

// endpoint simpan login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email dan password wajib diisi" });
  }
  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("❌ Error simpan:", err);
        return res.status(500).json({ success: false, message: "Gagal simpan ke database" });
      }
      res.json({ success: true, redirect: "/undangan.html" });
    }
  );
});

// default route
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Terhubung!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server jalan di port ${PORT}`);
});
