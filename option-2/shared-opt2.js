let currentTheme = "light";
let lastScrollY = 0;

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

(function initPreferences() {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("columns-theme");
  } catch (err) {}

  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme || (prefersDark ? "dark" : "light"), false);
})();

(function initGnbAutoHide() {
  const gnb = document.querySelector(".top-controls");
  if (!gnb) return;

  lastScrollY = window.scrollY || 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY || 0;

      if (currentScrollY <= 8) {
        gnb.classList.remove("gnb-hidden");
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 6) {
        gnb.classList.add("gnb-hidden");
      } else if (currentScrollY < lastScrollY - 6) {
        gnb.classList.remove("gnb-hidden");
      }

      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
})();
