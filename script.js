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


    /* =====================================================
       SERVICE DATA
       ===================================================== */

    const serviceData = {

        "ntn-registration": {
            category: "TAX REGISTRATION",
            title: "NTN Registration",
            description:
                "Professional assistance for obtaining and organizing National Tax Number registration requirements.",
            steps: [
                "Review applicant and business information.",
                "Prepare the required registration details.",
                "Submit the registration information.",
                "Review and organize the resulting tax registration record."
            ],
            note:
                "Requirements may vary depending on the taxpayer's individual or business status."
        },


        "income-tax-return": {
            category: "INCOME TAX",
            title: "Income Tax Return Filing",
            description:
                "Professional support for preparing, reviewing and filing income tax returns accurately and on time.",
            steps: [
                "Collect income and supporting financial information.",
                "Review relevant deductions and tax information.",
                "Prepare the return for review.",
                "Complete the filing process and maintain the record."
            ],
            note:
                "Final tax treatment depends on the taxpayer's actual financial circumstances."
        },


        "sales-tax-registration": {
            category: "SALES TAX",
            title: "Sales Tax Registration",
            description:
                "Assistance with sales tax registration requirements and preparation of relevant business information.",
            steps: [
                "Review business activity and registration requirements.",
                "Collect required business documentation.",
                "Prepare registration information.",
                "Complete the applicable registration process."
            ],
            note:
                "Eligibility and documentation requirements depend on the nature of the business."
        },


        "sales-tax-return": {
            category: "SALES TAX",
            title: "Sales Tax Return Filing",
            description:
                "Professional assistance with preparation and filing of sales tax returns.",
            steps: [
                "Collect sales and purchase records.",
                "Review applicable tax information.",
                "Prepare the sales tax return.",
                "Complete filing and maintain supporting records."
            ],
            note:
                "Accurate transaction records are important for proper return preparation."
        },


        "company-registration": {
            category: "CORPORATE SERVICES",
            title: "Company Registration",
            description:
                "Support for businesses seeking a structured company registration process.",
            steps: [
                "Review proposed business structure.",
                "Prepare required incorporation information.",
                "Organize relevant documents.",
                "Complete the applicable registration process."
            ],
            note:
                "Registration requirements vary according to company structure and circumstances."
        },


        "secp-compliance": {
            category: "CORPORATE COMPLIANCE",
            title: "SECP Compliance",
            description:
                "Professional support for corporate compliance and documentation requirements.",
            steps: [
                "Review current corporate records.",
                "Identify applicable compliance requirements.",
                "Prepare required information and documents.",
                "Maintain compliance records and filing history."
            ],
            note:
                "Specific compliance requirements depend on the company's legal structure."
        },


        "lahore-chamber": {
            category: "BUSINESS REGISTRATION",
            title: "Lahore Chamber of Commerce Registration",
            description:
                "Assistance for businesses preparing membership and registration documentation.",
            steps: [
                "Review business information.",
                "Prepare required membership documentation.",
                "Organize supporting records.",
                "Assist with the applicable registration process."
            ],
            note:
                "Membership requirements may depend on the applicant's business status."
        },


        "tax-notices": {
            category: "TAX COMPLIANCE",
            title: "Tax Notices Compliance",
            description:
                "Professional assistance in reviewing and responding to tax notices and compliance matters.",
            steps: [
                "Review the notice and relevant deadline.",
                "Identify the information requested.",
                "Collect supporting documentation.",
                "Prepare the appropriate response and compliance record."
            ],
            note:
                "Tax notices should be reviewed promptly because deadlines may apply."
        },


        "accounting-bookkeeping": {
            category: "ACCOUNTING",
            title: "Accounting & Bookkeeping Services",
            description:
                "Structured accounting and bookkeeping support for maintaining organized financial records.",
            steps: [
                "Review existing financial records.",
                "Organize transactions and supporting documents.",
                "Maintain accounting records.",
                "Provide periodic financial information for management use."
            ],
            note:
                "The exact accounting workflow depends on the size and nature of the business."
        },


        "financial-statements": {
            category: "FINANCIAL REPORTING",
            title: "Financial Statements Preparation",
            description:
                "Professional preparation and organization of financial statements for business reporting requirements.",
            steps: [
                "Collect accounting records.",
                "Review financial transactions.",
                "Prepare relevant financial statements.",
                "Perform review and finalize reporting information."
            ],
            note:
                "Financial reporting requirements depend on the applicable business and reporting framework."
        },


        "stock-count": {
            category: "INVENTORY SERVICES",
            title: "Weekly & Monthly Stock Count Services",
            description:
                "Structured stock counting support to help businesses maintain accurate inventory records.",
            steps: [
                "Plan the stock-count activity.",
                "Count and record inventory.",
                "Compare physical quantities with available records.",
                "Report discrepancies for management review."
            ],
            note:
                "Regular stock counts can help businesses identify inventory differences promptly."
        },


        "internal-audit": {
            category: "AUDIT & ASSURANCE",
            title: "Internal Audit Services",
            description:
                "Professional internal audit support focused on controls, processes and financial operations.",
            steps: [
                "Understand the relevant business process.",
                "Review internal controls.",
                "Identify potential control gaps.",
                "Prepare observations and recommendations."
            ],
            note:
                "The scope of an internal audit is determined according to the engagement requirements."
        },


        "pseb-registration": {
            category: "BUSINESS REGISTRATION",
            title: "PSEB Registration",
            description:
                "
