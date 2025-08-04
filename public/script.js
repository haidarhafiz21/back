document.getElementById("btnLogin").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {
    const res = await fetch("/api/simpan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      // Simpan status login di browser
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email);

      msg.style.color = "green";
      msg.innerHTML = "✅ Login berhasil, membuka undangan...";
      setTimeout(() => { window.location.href = "index.html"; }, 1200);
    } else {
      msg.innerHTML = "❌ " + data.message;
    }
  } catch (error) {
    msg.innerHTML = "❌ Gagal menghubungi server";
  }
});
