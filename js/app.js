// ==========================================
// EXAMORA
// Main Component Loader
// ==========================================


// Load HTML Component
async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Failed to load: ${file}`
            );
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {

        console.error(error);

        element.innerHTML = `
            <p>
                Component could not be loaded.
            </p>
        `;

    }

}


// ==========================================
// LOAD COMPONENTS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadComponent(
            "header",
            "components/header.html"
        );

        loadComponent(
            "hero",
            "components/hero.html"
        );

        loadComponent(
            "category",
            "components/category.html"
        );

        loadComponent(
            "tests",
            "components/test.html"
        );

        loadComponent(
            "footer",
            "components/footer.html"
        );

    }
);
