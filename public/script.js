document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/simpan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success) {
      window.location.href = "/undangan.html"; // redirect jika sukses
    } else {
      document.getElementById("errorMsg").innerText = result.message;
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("errorMsg").innerText = "❌ Gagal menghubungi server";
  }
});
