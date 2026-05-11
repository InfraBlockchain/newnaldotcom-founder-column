let currentTheme = "light";

function setTheme(theme, persist = true) {
  if (theme !== "light" && theme !== "dark") return;

  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);

  document.querySelectorAll(".theme-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === theme);
  });

  if (persist) {
    try {
      localStorage.setItem("columns-theme", theme);
    } catch (err) {}
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  if (!sidebar || !overlay) return;

  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
}

(function initPreferences() {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("columns-theme");
  } catch (err) {}

  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme || (prefersDark ? "dark" : "light"), false);
})();
