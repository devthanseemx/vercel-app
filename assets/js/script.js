// Functionality for the mobile menu and scroll animations
document.addEventListener("DOMContentLoaded", function () {

    // --- Mobile Menu Logic ---
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const body = document.body;

    // --- NEW: Elements for mobile dropdown ---
    const mobileContactTrigger = document.getElementById('mobile-contact-trigger');
    const mobileContactSubmenu = document.getElementById('mobile-contact-submenu');
    const mobileArrow = document.getElementById('mobile-arrow');

    // Function to close the menu
    const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
        body.classList.remove('overflow-hidden');
    };

    // Function to open the menu
    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        menuOpenIcon.classList.add('hidden');
        menuCloseIcon.classList.remove('hidden');
        body.classList.add('overflow-hidden');
    };

    // Toggle menu when the hamburger button is clicked
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // --- NEW: Toggle the mobile contact submenu ---
    mobileContactTrigger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the main menu from closing
        mobileContactSubmenu.classList.toggle('hidden');
        mobileArrow.classList.toggle('rotate-180');
    });

    // Close menu when clicking on the overlay background
    mobileMenu.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
            closeMenu();
        }
    });

    // --- MODIFIED: Close menu when a link inside it is clicked ---
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a, #mobile-menu button');
    mobileMenuLinks.forEach(link => {
        // Only add the close listener to elements that are NOT the dropdown trigger
        if (link.id !== 'mobile-contact-trigger') {
            link.addEventListener('click', () => {
                closeMenu();
            });
        }
    });


    // --- Scroll Animation Logic (Remains the same) ---
    const animationOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, animationOptions);
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});

// Functionality for the Dropdown
function setupDropdownHover(wrapperId, menuId) {
    const wrapper = document.getElementById(wrapperId);
    const menu = document.getElementById(menuId);

    if (!wrapper || !menu) return;

    let timeoutId;

    wrapper.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
        menu.classList.remove("hidden");
    });

    wrapper.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
            menu.classList.add("hidden");
        }, 200); // Delay to prevent flicker
    });
}

function setHeroHeight() {
    const hero = document.getElementById('hero');
    const vh = window.innerHeight * 0.97;
    hero.style.height = `${vh}px`;
}

window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);

// Initialize dropdown on page load
document.addEventListener("DOMContentLoaded", function () { setupDropdownHover("more-dropdown", "dropdown-menu"); });

