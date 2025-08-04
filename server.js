// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Koneksi ke database db_simulasi
const dbConfig = {
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "db_simulasi",
  port: process.env.MYSQLPORT || 3306,
};

let connection;
async function initDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ MySQL Connected ke db_simulasi!");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}
initDB();

// ✅ Route root untuk test
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Berjalan!");
});

// ✅ Route login
app.post("/api/simpan", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Login berhasil!", user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: "Login gagal, email atau password salah" });
    }
  } catch (err) {
    console.error("❌ Error saat login:", err.message);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
});

// ✅ Port Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
