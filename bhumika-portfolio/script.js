document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CONTACT FORM
    ========================================= */

    const form = document.getElementById("contact-form");

    if (form) {

        const button = form.querySelector(".message-submit");
        const success = document.getElementById("form-success");
        const error = document.getElementById("form-error");

        form.addEventListener("submit", async function (event) {

            // Stop the browser from opening the Formspree page
            event.preventDefault();

            // Hide previous messages
            if (success) {
                success.classList.remove("show");
            }

            if (error) {
                error.classList.remove("show");
            }

            // Disable button while sending
            if (button) {
                button.disabled = true;
                button.innerHTML = "Sending...";
            }

            try {

                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {

                    // Clear the form
                    form.reset();

                    // Show success message
                    if (success) {
                        success.classList.add("show");
                    }

                    // Restore button
                    if (button) {
                        button.disabled = false;
                        button.innerHTML = 'Send Message <span>↗</span>';
                    }

                } else {

                    // Show error message
                    if (error) {
                        error.classList.add("show");
                    }

                    // Restore button
                    if (button) {
                        button.disabled = false;
                        button.innerHTML = 'Send Message <span>↗</span>';
                    }
                }

            } catch (err) {

                console.error("Form submission error:", err);

                // Show error message
                if (error) {
                    error.classList.add("show");
                }

                // Restore button
                if (button) {
                    button.disabled = false;
                    button.innerHTML = 'Send Message <span>↗</span>';
                }
            }
        });
    }


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar = document.querySelector(".portfolio-navbar");

    if (navbar) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });
    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".portfolio-navbar .navbar-nav");

    if (menuIcon && navLinks) {

        menuIcon.addEventListener("click", function () {

            navLinks.classList.toggle("show");

        });
    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".section-intro, .project-card, .build-item, .about-content, .skills-grid, .process-item, .contact-intro, .message-form"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


});