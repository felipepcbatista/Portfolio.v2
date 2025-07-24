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
});
