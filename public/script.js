document.getElementById("btnLogin").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.textContent = "Email dan Password wajib diisi!";
    return;
  }

  try {
    const res = await fetch("/api/simpan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      // Simpan status login ke browser
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email);

      msg.style.color = "green";
      msg.textContent = "Login berhasil! Mengarahkan ke undangan...";
      setTimeout(() => { window.location.href = "index.html"; }, 1200);
    } else {
      msg.textContent = "Login gagal: " + data.message;
    }
  } catch (error) {
    msg.textContent = "❌ Gagal menghubungi server";
  }
});
