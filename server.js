import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Gunakan PORT dari Railway atau fallback ke 5000
const PORT = process.env.PORT || 5000;

// Mendapatkan __dirname (karena pakai ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk melayani file statis dari folder 'front'
app.use(express.static(path.join(__dirname, "front")));

// Route utama -> tampilkan index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "index.html"));
});

// Route login -> tampilkan login.html
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "login.html"));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di port ${PORT}`);
});
