let currentTheme = "light";

function setTheme(theme, persist = true) {
  currentTheme = "light";
  document.documentElement.setAttribute("data-theme", "light");
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  if (!sidebar || !overlay) return;

  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
}

(function initPreferences() {
  setTheme("light", false);
})();
