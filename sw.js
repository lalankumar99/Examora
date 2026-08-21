/* =========================================================
   EXAMORA
   Progressive Web App — Service Worker
   File: sw.js
   Version: 1.0.0
   ========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CACHE_VERSION = "examora-v1";

const STATIC_CACHE = `${CACHE_VERSION}-static`;

const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;


/* =========================================================
   APP SHELL
   Core files required for the basic application
========================================================= */

const APP_SHELL = [

    "./",

    "./index.html",

    "./manifest.json",


    /* -------------------------
       Global CSS
    ------------------------- */

    "./css/style.css",


    /* -------------------------
       Component CSS
    ------------------------- */

    "./css/header.css",
    "./css/hero.css",
    "./css/category.css",
    "./css/test.css",
    "./css/footer.css",
    "./css/menu.css",
    "./css/progress.css",


    /* -------------------------
       JavaScript
    ------------------------- */

    "./js/app.js",
    "./js/menu.js",
    "./js/progress.js",


    /* -------------------------
       HTML Components
    ------------------------- */

    "./components/header.html",
    "./components/hero.html",
    "./components/category.html",
    "./components/test.html",
    "./components/footer.html",
    "./components/menu.html"

];


/* =========================================================
   INSTALL
========================================================= */

self.addEventListener(
    "install",
    event => {

        console.log(
            "[Examora SW] Installing..."
        );


        event.waitUntil(

            caches
                .open(STATIC_CACHE)
                .then(cache => {

                    console.log(
                        "[Examora SW] Caching app shell..."
                    );


                    return cache.addAll(
                        APP_SHELL
                    );

                })

        );


        /*
         * Activate the new Service Worker
         * without waiting for the old one.
         */

        self.skipWaiting();

    }
);


/* =========================================================
   ACTIVATE
========================================================= */

self.addEventListener(
    "activate",
    event => {

        console.log(
            "[Examora SW] Activating..."
        );


        event.waitUntil(

            caches
                .keys()
                .then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName.startsWith(
                                        "examora-"
                                    ) &&
                                    !cacheName.startsWith(
                                        CACHE_VERSION
                                    )
                            )
                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                    );

                })

        );


        /*
         * Take control of already opened pages.
         */

        self.clients.claim();

    }
);


/* =========================================================
   FETCH STRATEGY
========================================================= */

self.addEventListener(
    "fetch",
    event => {

        const request =
            event.request;


        /*
         * Only handle GET requests.
         */

        if (
            request.method !== "GET"
        ) {

            return;

        }


        /*
         * Ignore browser extensions
         * and unsupported requests.
         */

        if (
            !request.url.startsWith(
                self.location.origin
            )
        ) {

            return;

        }


        event.respondWith(

            fetch(request)

                .then(response => {

                    /*
                     * Store successful responses
                     * in runtime cache.
                     */

                    if (
                        response &&
                        response.status === 200
                    ) {

                        const clonedResponse =
                            response.clone();


                        caches
                            .open(RUNTIME_CACHE)
                            .then(cache => {

                                cache.put(
                                    request,
                                    clonedResponse
                                );

                            });

                    }


                    return response;

                })


                .catch(() => {

                    /*
                     * Internet unavailable.
                     * Try cached version.
                     */

                    return caches
                        .match(request)
                        .then(cachedResponse => {

                            if (
                                cachedResponse
                            ) {

                                return cachedResponse;

                            }


                            /*
                             * If navigation request
                             * fails, show Home Page.
                             */

                            if (
                                request.mode ===
                                "navigate"
                            ) {

                                return caches.match(
                                    "./index.html"
                                );

                            }


                            return new Response(
                                "Offline",
                                {
                                    status: 503,
                                    statusText:
                                        "Offline"
                                }
                            );

                        });

                })

        );

    }
);


/* =========================================================
   MESSAGE HANDLER
========================================================= */

self.addEventListener(
    "message",
    event => {

        if (
            !event.data
        ) {

            return;

        }


        /*
         * Force Service Worker update
         */

        if (
            event.data.type ===
            "SKIP_WAITING"
        ) {

            self.skipWaiting();

        }

    }
);


/* =========================================================
   SERVICE WORKER READY
========================================================= */

console.log(
    "[Examora SW] Service Worker loaded."
);