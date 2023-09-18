// JavaScript para cambiar el idioma
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("language-toggle");
  const languageDropdown = document.querySelector(".language-dropdown");

  // Manejar clic en el botón de idioma
  languageToggle.addEventListener("click", function () {
    languageDropdown.classList.toggle("show");
  });

  // Manejar clic en una opción de idioma
  const languageOptions = languageDropdown.querySelectorAll("a");
  languageOptions.forEach(function (option) {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedLanguage = option.textContent;
      // Aquí puedes realizar acciones para cambiar el idioma en tu sitio
      // Por ejemplo, actualizar etiquetas y contenido en el idioma seleccionado
      languageToggle.textContent = selectedLanguage;
      languageDropdown.classList.remove("show");
    });
  });
});
