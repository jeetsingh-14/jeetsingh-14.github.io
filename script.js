document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        // Save theme preference in local storage
        const isLightTheme = document.body.classList.contains("light-theme");
        localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    });

    // Load theme preference from local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }
});
