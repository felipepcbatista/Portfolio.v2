document.addEventListener('DOMContentLoaded', function () {
  // Botão de Download do Currículo
  const downloadBtn = document.getElementById('download-cv');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const link = document.createElement('a');
      link.href = 'assets/docs/FelipePaz-Curriculo.pdf';
      link.download = 'FelipePaz-Curriculo.pdf';
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const originalHTML = this.innerHTML;
      this.innerHTML = 'Baixando... <i class="fas fa-spinner fa-spin"></i>';

      setTimeout(() => {
        this.innerHTML = originalHTML;
      }, 2000);
    });
  }

  // Formulário de Contato
  const form = document.querySelector("form");
  const formContainer = document.getElementById("form-container");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
      const res = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem })
      });

      const data = await res.json();

      if (res.ok) {
        formContainer.innerHTML = `
          <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <h3>Mensagem enviada!</h3>
            <p>Obrigado por entrar em contato. Responderei em breve.</p>
          </div>
        `;

        setTimeout(() => {
          formContainer.innerHTML = form.outerHTML;
          window.location.reload();
        }, 4000);
      } else {
        alert("Erro ao enviar: " + (data.error || "Tente novamente"));
      }

    } catch (err) {
      alert("Erro de conexão. Tente novamente.");
    }
  });
});
