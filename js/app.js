/* =========================================================
   EXAMORA
   Main Application JavaScript
   File: js/app.js
   ========================================================= */


/* =========================
   COMPONENT LOADER
========================= */

async function loadComponent(elementId, componentPath) {

    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element not found: #${elementId}`);
        return false;
    }

    try {

        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(
                `Unable to load ${componentPath}`
            );
        }

        const html = await response.text();

        element.innerHTML = html;

        return true;

    } catch (error) {

        console.error(error);

        return false;
    }
}


/* =========================
   LOAD COMPONENTS
========================= */

async function loadComponents() {

    await loadComponent(
        "header",
        "components/header.html"
    );

    await loadComponent(
        "hero",
        "components/hero.html"
    );

    await loadComponent(
        "category",
        "components/category.html"
    );

    await loadComponent(
        "tests",
        "components/test.html"
    );

    await loadComponent(
        "footer",
        "components/footer.html"
    );

    /* Menu Component */
    const menuLoaded = await loadComponent(
        "menu",
        "components/menu.html"
    );


    /* Initialize Menu AFTER menu.html is loaded */
    if (menuLoaded) {

        initializeMenu();

    }

}


/* =========================
   START APPLICATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadComponents();

    }
);
