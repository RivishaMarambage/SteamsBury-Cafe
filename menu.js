// ===================================
// MENU FILTER FUNCTIONALITY
// ===================================

const tabs = document.querySelectorAll('.tab');
const menuSections = document.querySelectorAll('.menu-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get filter category
        const filterCategory = tab.getAttribute('data-filter');
        
        // Filter sections
        menuSections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            
            if (filterCategory === 'all') {
                section.style.display = 'block';
                animateSection(section);
            } else if (sectionCategory === filterCategory) {
                section.style.display = 'block';
                animateSection(section);
            } else {
                section.style.display = 'none';
            }
        });
        
        // Smooth scroll to first visible section
        const firstVisibleSection = document.querySelector('.menu-section[style="display: block;"]');
        if (firstVisibleSection && filterCategory !== 'all') {
            firstVisibleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function animateSection(section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        section.style.transition = 'all 0.5s ease-out';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
}

// ===================================
// SCROLL ANIMATIONS FOR MENU CARDS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial animation styles and observe
document.querySelectorAll('.menu-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    cardObserver.observe(card);
});

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const menuCards = document.querySelectorAll('.menu-card');
        
        menuCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show all sections when searching
        if (searchTerm) {
            menuSections.forEach(section => {
                section.style.display = 'block';
            });
        }
    });
    
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.background = '#FFFFFF';
        this.parentElement.style.boxShadow = '0 0 0 2px #CF6D17';
        this.parentElement.style.transform = 'scale(1.05)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.background = '#F4F2F0';
        this.parentElement.style.boxShadow = 'none';
        this.parentElement.style.transform = 'scale(1)';
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// ADD CSS ANIMATIONS
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

console.log('☕ Menu page loaded successfully!');