import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Setup agar bisa kirim file HTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Route default -> tampilkan login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// API login
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "12345") {
    return res.json({ success: true, message: "Login berhasil 🎉" });
  }

  res.status(401).json({ success: false, message: "Login gagal ❌" });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
