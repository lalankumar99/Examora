/* =========================================================
   EXAMORA
   Test Language Selection
   File: tests/components/language/language.js
   ========================================================= */


/* =========================
   LANGUAGE INITIALIZATION
========================= */

function initializeLanguageSelection() {

    const languageOptions =
        document.querySelectorAll(
            ".language-option"
        );

    const selectedLanguage =
        document.getElementById(
            "selectedLanguage"
        );

    const continueButton =
        document.getElementById(
            "languageContinue"
        );


    /* =========================
       CHECK ELEMENTS
    ========================= */

    if (
        !languageOptions.length ||
        !selectedLanguage ||
        !continueButton
    ) {

        console.warn(
            "Language component not found."
        );

        return;

    }


    let currentLanguage = null;


    /* =========================
       LANGUAGE SELECTION
    ========================= */

    languageOptions.forEach(
        (option) => {

            option.addEventListener(
                "click",
                () => {

                    /* Remove previous selection */

                    languageOptions.forEach(
                        (item) => {

                            item.classList.remove(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }
                    );


                    /* Select current language */

                    option.classList.add(
                        "selected"
                    );

                    option.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    /* Save language */

                    currentLanguage =
                        option.dataset.language;


                    /* Update selected text */

                    if (
                        currentLanguage === "hi"
                    ) {

                        selectedLanguage.textContent =
                            "Selected Language: हिन्दी";

                    } else {

                        selectedLanguage.textContent =
                            "Selected Language: English";

                    }


                    /* Enable Continue */

                    continueButton.disabled =
                        false;

                }
            );

        }
    );


    /* =========================
       CONTINUE
    ========================= */

    continueButton.addEventListener(
        "click",
        () => {

            if (!currentLanguage) {
                return;
            }


            /* Save selected language */

            sessionStorage.setItem(
                "examora_language",
                currentLanguage
            );


            /*
             * Next step:
             * Test Instructions / Warning
             */

            console.log(
                "Selected Language:",
                currentLanguage
            );


            /*
             * Later we can redirect:
             *
             * window.location.href =
             * "instructions.html";
             */

        }
    );

}


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeLanguageSelection
);
