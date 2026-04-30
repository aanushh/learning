const setThemeToLocalStorage = (theme) => {
  localStorage.setItem("theme", theme);
};

const setLightTheme = () => {
  document.documentElement.classList.add("light");
  document.documentElement.classList.remove("dark");
};

const setDarkTheme = () => {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
};

const isDarkSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const isDarkThemePersisted = () => localStorage.getItem("theme") === "dark";

const restoreSavedTheme = () => {
  const isDarkTheme = isDarkThemePersisted() || isDarkSystemTheme();

  if (isDarkTheme) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
};

const setSystemTheme = () => {
  if (isDarkSystemTheme()) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
};

window.addEventListener("DOMContentLoaded", restoreSavedTheme);
document
  .getElementById("btn-theme-system")
  .addEventListener("click", setSystemTheme);
document
  .getElementById("btn-theme-light")
  .addEventListener("click", setLightTheme);
document
  .getElementById("btn-theme-dark")
  .addEventListener("click", setDarkTheme);
