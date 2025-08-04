document.getElementById("btnLogin").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      msg.innerHTML = "✅ Login berhasil, membuka undangan...";
      setTimeout(() => { window.location.href = "/index.html"; }, 1000);
    } else {
      msg.innerHTML = "❌ " + data.message;
    }
  } catch (error) {
    msg.innerHTML = "❌ Gagal terhubung ke server";
  }
});
