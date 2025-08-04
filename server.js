import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Buat koneksi ke MySQL Railway
const db = await mysql.createConnection({
  host: process.env.MYSQLHOST,   // dari Railway variables
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// API Login
app.post("/api/simpan", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Login berhasil!" });
    } else {
      res.status(401).json({ success: false, message: "Email atau password salah" });
    }
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
