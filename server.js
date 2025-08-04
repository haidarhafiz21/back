import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Route default (cek backend hidup)
app.get("/", (req, res) => {
  res.send("🚀 Backend Railway Aktif dan Berjalan!");
});

// Route login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email dan password wajib diisi!" });
  }

  // Dummy validasi user
  if (email === "admin@example.com" && password === "12345") {
    return res.json({ success: true, message: "Login berhasil 🎉" });
  }

  res.status(401).json({ success: false, message: "Login gagal ❌, email atau password salah" });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
