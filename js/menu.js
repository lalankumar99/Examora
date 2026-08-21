/* =========================================================
   EXAMORA
   Menu Component JavaScript
   File: js/menu.js
   ========================================================= */


function initializeMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const menuDropdown =
        document.getElementById("menuDropdown");


    if (!menuToggle || !menuDropdown) {

        console.warn(
            "Menu component not found."
        );

        return;

    }


    /* =========================
       TOGGLE MENU
    ========================= */

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const isOpen =
                !menuDropdown.hasAttribute("hidden");


            if (isOpen) {

                menuDropdown.setAttribute(
                    "hidden",
                    ""
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                menuDropdown.removeAttribute(
                    "hidden"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );


    /* =========================
       CLOSE ON OUTSIDE CLICK
    ========================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !menuDropdown.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                menuDropdown.setAttribute(
                    "hidden",
                    ""
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =========================
       CLOSE WITH ESCAPE
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                menuDropdown.setAttribute(
                    "hidden",
                    ""
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.focus();

            }

        }
    );

}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeMenu
);
