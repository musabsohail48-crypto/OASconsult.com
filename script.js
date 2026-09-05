/* =========================================================
   OAS TAX & CORPORATE CONSULTANTS
   FINAL FRONTEND SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const byId = (id) =>
        document.getElementById(id);


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElement = byId("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const mobileToggle = $(".mobile-menu-toggle");
    const mainNav = $(".main-nav");

    if (mobileToggle && mainNav) {

        mobileToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

            const expanded =
                mainNav.classList.contains("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                expanded ? "true" : "false"
            );
        });


        $$(".nav-link", mainNav).forEach(link => {

            link.addEventListener("click", () => {
                mainNav.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

    });


    /* =====================================================
       HERO IMAGE SLIDER
       6 IMAGES / CHANGE EVERY 2.5 SECONDS
       ===================================================== */

    const heroSlides = $$(".hero-slide");
    const heroDots = $$(".hero-dot");

    const nextButton =
        $(".hero-arrow.next") ||
        $(".hero-arrow[data-direction='next']");

    const previousButton =
        $(".hero-arrow.prev") ||
        $(".hero-arrow[data-direction='prev']");

    let currentSlide = 0;
    let sliderTimer = null;


    function showHeroSlide(index) {

        if (!heroSlides.length) return;

        currentSlide =
            (index + heroSlides.length) %
            heroSlides.length;


        heroSlides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        heroDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

            dot.setAttribute(
                "aria-current",
                i === currentSlide
                    ? "true"
                    : "false"
            );

        });

    }


    function nextHeroSlide() {
        showHeroSlide(currentSlide + 1);
    }


    function previousHeroSlide() {
        showHeroSlide(currentSlide - 1);
    }


    function startHeroSlider() {

        if (heroSlides.length <= 1) return;

        stopHeroSlider();

        sliderTimer = setInterval(() => {
            nextHeroSlide();
        }, 2500);
    }


    function stopHeroSlider() {

        if (sliderTimer) {

            clearInterval(sliderTimer);

            sliderTimer = null;
        }
    }


    if (heroSlides.length) {

        showHeroSlide(0);

        startHeroSlider();


        if (nextButton) {

            nextButton.addEventListener("click", () => {

                nextHeroSlide();

                startHeroSlider();
            });
        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                () => {

                    previousHeroSlide();

                    startHeroSlider();
                }
            );
        }


        heroDots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                showHeroSlide(index);

                startHeroSlider();
            });

        });


        const hero = $(".hero");

        if (hero) {

            hero.addEventListener(
                "mouseenter",
                stopHeroSlider
            );

            hero.addEventListener(
                "mouseleave",
                startHeroSlider
            );
        }
    }


    /* =====================================================
       HERO KEYBOARD CONTROL
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (!heroSlides.length) return;

        if (event.key === "ArrowRight") {

            nextHeroSlide();

            startHeroSlider();
        }

        if (event.key === "ArrowLeft") {

            previousHeroSlide();

            startHeroSlider();
        }

    });


   // ================= SERVICE DETAIL PAGE =================

const serviceDetails = {
  "ntn-registration": {
    title: "NTN Registration",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=85",
    overview: "NTN Registration is the essential first step for individuals and businesses entering Pakistan's formal tax system.",
    points: ["Taxpayer registration guidance", "Documentation review", "Application preparation", "Registration status assistance"],
    process: ["Initial information collection", "Document verification", "Application preparation", "Submission and follow-up"]
  },

  "income-tax-return": {
    title: "Income Tax Return Filing",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1400&q=85",
    overview: "Professional assistance for preparing and filing income tax returns accurately and on time.",
    points: ["Income and expense review", "Tax calculation assistance", "Return preparation", "Filing support"],
    process: ["Collect financial information", "Review documents", "Prepare return", "Final review and filing"]
  },

  "sales-tax-registration": {
    title: "Sales Tax Registration",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85",
    overview: "Complete guidance for businesses requiring sales tax registration and related compliance.",
    points: ["Eligibility assessment", "Documentation", "Registration application", "Compliance guidance"],
    process: ["Business assessment", "Document collection", "Application preparation", "Registration follow-up"]
  },

  "sales-tax-return": {
    title: "Sales Tax Return Filing",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1400&q=85",
    overview: "Professional sales tax return preparation and filing support for businesses.",
    points: ["Sales and purchase review", "Tax reconciliation", "Return preparation", "Filing assistance"],
    process: ["Collect records", "Verify transactions", "Prepare return", "Final review and submission"]
  },

  "company-registration": {
    title: "Company Registration",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
    overview: "Professional assistance with company formation and registration documentation.",
    points: ["Company structure guidance", "Documentation", "Registration support", "Post-registration guidance"],
    process: ["Business consultation", "Name and structure review", "Documentation", "Registration follow-up"]
  },

  "secp-compliance": {
    title: "SECP Compliance",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85",
    overview: "Support for maintaining corporate records and meeting applicable SECP compliance requirements.",
    points: ["Compliance review", "Corporate documentation", "Filing support", "Record management"],
    process: ["Requirement assessment", "Document review", "Compliance preparation", "Filing and follow-up"]
  },

  "lahore-chamber": {
    title: "Lahore Chamber of Commerce Registration",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    overview: "Guidance for businesses seeking Lahore Chamber of Commerce registration and membership support.",
    points: ["Eligibility guidance", "Documentation review", "Application preparation", "Registration assistance"],
    process: ["Business assessment", "Document verification", "Application preparation", "Submission support"]
  },

  "tax-notices": {
    title: "Tax Notices Compliance",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1400&q=85",
    overview: "Professional assistance in understanding and responding to tax notices and compliance matters.",
    points: ["Notice review", "Issue identification", "Response preparation", "Compliance guidance"],
    process: ["Notice assessment", "Information collection", "Response preparation", "Submission and follow-up"]
  },

  "accounting-bookkeeping": {
    title: "Accounting & Bookkeeping Services",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1400&q=85",
    overview: "Organized accounting and bookkeeping support designed to help businesses maintain accurate financial records.",
    points: ["Transaction recording", "Ledger management", "Reconciliation", "Financial record organization"],
    process: ["Record collection", "Classification", "Reconciliation", "Regular reporting"]
  },

  "financial-statements": {
    title: "Financial Statements Preparation",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85",
    overview: "Preparation and organization of professional financial statements based on available business records.",
    points: ["Financial data review", "Statement preparation", "Account reconciliation", "Management reporting"],
    process: ["Collect records", "Verify balances", "Prepare statements", "Final review"]
  },

  "stock-count": {
    title: "Weekly & Monthly Stock Count Services",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=85",
    overview: "Structured stock counting services to help businesses maintain reliable inventory records.",
    points: ["Physical stock counting", "Inventory reconciliation", "Variance identification", "Periodic reporting"],
    process: ["Inventory planning", "Physical count", "Record comparison", "Variance report"]
  },

  "internal-audit": {
    title: "Internal Audit Services",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=85",
    overview: "Independent internal review focused on processes, controls, records and operational efficiency.",
    points: ["Control review", "Process assessment", "Risk identification", "Audit reporting"],
    process: ["Scope definition", "Record review", "Testing and assessment", "Audit report"]
  },

  "pseb-registration": {
    title: "PSEB Registration",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85",
    overview: "Guidance for businesses and IT-related entities seeking PSEB registration and related support.",
    points: ["Eligibility guidance", "Documentation", "Registration assistance", "Follow-up support"],
    process: ["Initial assessment", "Document preparation", "Application support", "Follow-up"]
  },

  "aop-registration": {
    title: "AOP Registration",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85",
    overview: "Professional assistance for registration and documentation of Associations of Persons.",
    points: ["AOP structure guidance", "Partner information", "Documentation", "Registration support"],
    process: ["Information collection", "Document verification", "Application preparation", "Registration follow-up"]
  }
};


// View Service buttons
document.querySelectorAll(".service-open").forEach(button => {
  button.addEventListener("click", function () {

    const card = this.closest(".service-card");
    const serviceKey = card?.dataset.service;

    if (!serviceKey) return;

    window.location.href =
      "service-details.html?service=" +
      encodeURIComponent(serviceKey);

  });
});
               /* =====================================================
   HERO SLIDER - INDEPENDENT FINAL FIX
   Automatically changes every 3 seconds
   ===================================================== */

(function () {

    function initializeHeroSlider() {

        const slides =
            document.querySelectorAll(".hero-slide");

        const dots =
            document.querySelectorAll(".hero-dot");

        const next =
            document.querySelector(".hero-arrow.next");

        const prev =
            document.querySelector(".hero-arrow.prev");

        if (!slides.length) {
            return;
        }

        let current = 0;
        let timer;


        function showSlide(index) {

            current =
                (index + slides.length) %
                slides.length;


            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === current
                );

            });


            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === current
                );

            });

        }


        function nextSlide() {

            showSlide(current + 1);

        }


        function previousSlide() {

            showSlide(current - 1);

        }


        function startAutoSlide() {

            clearInterval(timer);

            timer = setInterval(
                nextSlide,
                3000
            );

        }


        /* Dots */

        dots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    showSlide(index);

                    startAutoSlide();

                }
            );

        });


        /* Next */

        if (next) {

            next.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    nextSlide();

                    startAutoSlide();

                }
            );

        }


        /* Previous */

        if (prev) {

            prev.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    previousSlide();

                    startAutoSlide();

                }
            );

        }


        /* Start */

        showSlide(0);

        startAutoSlide();

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeHeroSlider
        );

    } else {

        initializeHeroSlider();

    }

})();
