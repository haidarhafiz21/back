import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Konfigurasi CORS: izinkan domain frontend
app.use(cors({
  origin: "https://nama-project.onrender.com", // ganti sesuai domain frontend kamu
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

// Route login contoh
app.post("/api/simpan", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    res.json({ success: true, message: "Login berhasil!" });
  } else {
    res.status(401).json({ success: false, message: "Email atau password salah" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});
