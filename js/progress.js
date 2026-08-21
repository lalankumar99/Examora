/* =========================================================
   EXAMORA
   Premium Page Loading Progress
   File: js/progress.js
   ========================================================= */


/* =========================================================
   PROGRESS CONTROLLER
========================================================= */

const ExamoraProgress = (() => {

    let progressElement = null;

    let progressBar = null;

    let progressValue = 0;

    let progressTimer = null;


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function init() {

        progressElement =
            document.getElementById(
                "pageProgress"
            );

        if (!progressElement) {

            console.warn(
                "Examora Progress Bar not found."
            );

            return false;

        }


        progressBar =
            progressElement.querySelector(
                ".page-progress-bar"
            );

        if (!progressBar) {

            console.warn(
                "Progress bar element not found."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       START
    ===================================================== */

    function start() {

        if (!progressElement || !progressBar) {

            if (!init()) {
                return;
            }

        }


        clearInterval(
            progressTimer
        );


        progressValue = 8;


        progressElement.classList.remove(
            "complete"
        );

        progressElement.classList.add(
            "loading"
        );


        progressBar.style.width =
            `${progressValue}%`;


        /* Smooth fake progress */

        progressTimer =
            setInterval(() => {

                if (progressValue >= 88) {

                    clearInterval(
                        progressTimer
                    );

                    return;

                }


                const remaining =
                    88 - progressValue;


                const increment =
                    Math.max(
                        0.5,
                        remaining * 0.08
                    );


                progressValue +=
                    increment;


                progressBar.style.width =
                    `${progressValue}%`;


            }, 180);

    }


    /* =====================================================
       SET PROGRESS
    ===================================================== */

    function set(value) {

        if (!progressElement || !progressBar) {

            if (!init()) {
                return;
            }

        }


        progressValue =
            Math.min(
                100,
                Math.max(
                    0,
                    value
                )
            );


        progressElement.classList.add(
            "loading"
        );


        progressElement.classList.remove(
            "complete"
        );


        progressBar.style.width =
            `${progressValue}%`;

    }


    /* =====================================================
       COMPLETE
    ===================================================== */

    function complete() {

        if (!progressElement || !progressBar) {

            if (!init()) {
                return;
            }

        }


        clearInterval(
            progressTimer
        );


        progressValue = 100;


        progressBar.style.width =
            "100%";


        progressElement.classList.remove(
            "loading"
        );

        progressElement.classList.add(
            "complete"
        );


        setTimeout(() => {

            progressBar.style.width =
                "0%";

            progressElement.classList.remove(
                "complete"
            );

        }, 450);

    }


    /* =====================================================
       AUTO PAGE LOADING
    ===================================================== */

    function autoLoad() {

        if (!init()) {
            return;
        }


        start();


        window.addEventListener(
            "load",
            () => {

                complete();

            }
        );

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    return {

        init,

        start,

        set,

        complete,

        autoLoad

    };

})();


/* =========================================================
   START EXAMORA PROGRESS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        ExamoraProgress.autoLoad();

    }
);