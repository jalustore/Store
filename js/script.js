document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const WHATSAPP_NUMBER = "6285189014747";
    const CURRENCY_RATES = { USD: 16550, MYR: 3545, SGD: 12345 };
    const COUPONS = {
        "JALUHEART10": { type: "percentage", value: 10 },
        "HEMAT5K": { type: "fixed", value: 5000 },
        "SKYLOVE15": { type: "percentage", value: 15, minPurchase: 30000 }
    };

    // --- GAME-THEMED CONSTANTS ---
    const SEASONAL_THEMES = {
        current: {
            name: "Season of Revival",
            color: "#8a6dff",
            bgGradient: "linear-gradient(135deg, #3a1c71 0%, #8a6dff 100%)"
        },
        upcoming: {
            name: "Season of Moments",
            color: "#ff9a8b",
            bgGradient: "linear-gradient(135deg, #ff9a8b 0%, #ff6e7f 100%)"
        }
    };

    // --- DATA ---
    const products = [
        { id: 1, hearts: 40, price: 5000, days: 2, popular: true, savings: "24%", season: "current" },
        { id: 2, hearts: 80, price: 10000, days: 4, season: "current" },
        { id: 3, hearts: 120, price: 15000, days: 6, season: "current" },
        { id: 4, hearts: 200, price: 20000, days: 11, savings: "31%", season: "current" },
        { id: 5, hearts: 310, price: 30000, days: 16, savings: "33%", season: "upcoming" },
        { id: 6, hearts: 420, price: 40000, days: 22, savings: "34%", season: "upcoming" },
        { id: 7, hearts: 540, price: 50000, days: 27, savings: "35%", season: "upcoming", bestValue: true }
    ];

    // [Keep your existing translations but add these new keys:]
    const translations = {
        // ... existing translations ...
        'id': {
            // Add these:
            seasonalTag: "Musim {season}",
            bestValueTag: "NILAI TERBAIK",
            // ... rest remains ...
        },
        'en': {
            seasonalTag: "{season} Season",
            bestValueTag: "BEST VALUE",
            // ... rest remains ...
        }
    };

    // --- STATE ---
    let currentLang = localStorage.getItem('lang') || 'id';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon')) || null;
    let currentTheme = localStorage.getItem('theme') || 'light';

    // --- GAME-THEMED UI FUNCTIONS ---
    const applySeasonalTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', SEASONAL_THEMES.current.color);
        root.style.setProperty('--hero-gradient', SEASONAL_THEMES.current.bgGradient);
        
        // Add floating candle particles
        if (!document.getElementById('candle-particles')) {
            const particles = document.createElement('div');
            particles.id = 'candle-particles';
            document.body.appendChild(particles);
            
            for (let i = 0; i < 15; i++) {
                const candle = document.createElement('div');
                candle.className = 'candle-particle';
                candle.style.left = `${Math.random() * 100}%`;
                candle.style.top = `${Math.random() * 100}%`;
                candle.style.animationDuration = `${15 + Math.random() * 20}s`;
                candle.style.animationDelay = `-${Math.random() * 10}s`;
                particles.appendChild(candle);
            }
        }
    };

    // --- ENHANCED PRODUCT RENDERING ---
    const renderProducts = () => {
        heartsContainer.innerHTML = products.map(product => {
            const pricePerHeart = (product.price / product.hearts).toFixed(0);
            const usdPrice = (product.price / CURRENCY_RATES.USD).toFixed(2);
            const myrPrice = (product.price / CURRENCY_RATES.MYR).toFixed(2);
            const sgdPrice = (product.price / CURRENCY_RATES.SGD).toFixed(2);

            return `
                <div class="heart-card ${product.popular ? 'popular' : ''} ${product.bestValue ? 'best-value' : ''}">
                    ${product.popular ? `<div class="popular-tag">${getTranslation('popularTag')}</div>` : ''}
                    ${product.bestValue ? `<div class="best-value-tag">${getTranslation('bestValueTag')}</div>` : ''}
                    ${product.season ? `<div class="season-tag">${getTranslation('seasonalTag').replace('{season}', SEASONAL_THEMES[product.season].name)}</div>` : ''}
                    
                    <div class="card-header">
                        <h3>${product.hearts} <span class="heart-icon">❤️</span></h3>
                        <p class="price-idr">${formatCurrency(product.price)}</p>
                    </div>
                    
                    <div class="card-details">
                        <div class="detail-row">
                            <span>${getTranslation('pricePerHeart')}:</span>
                            <strong>~Rp ${pricePerHeart}</strong>
                        </div>
                        <div class="detail-row">
                            <span>${getTranslation('deliveryEstimate')}:</span>
                            <strong>${product.days} ${getTranslation('daySuffix')}</strong>
                        </div>
                        <div class="currency-estimates">
                            <small>≈ $${usdPrice} • RM${myrPrice} • S$${sgdPrice}</small>
                        </div>
                        ${product.savings ? `<div class="savings-badge">Save ${product.savings}</div>` : ''}
                    </div>
                    
                    <button class="add-to-cart-button glow-on-hover" data-id="${product.id}">
                        ${getTranslation('addToCart')}
                    </button>
                </div>
            `;
        }).join('');
    };

    // --- ENHANCED CART SYSTEM ---
    const updateCartDisplay = () => {
        // ... existing cart logic ...

        // Add Sky-themed animations
        if (cart.length > 0) {
            cartSection.classList.add('pulse-glow');
            setTimeout(() => cartSection.classList.remove('pulse-glow'), 1000);
        }
    };

    // --- GAME-STYLE CHECKOUT FLOW ---
    const showConfirmationModal = () => {
        // ... existing logic ...

        // Add Sky-style confirmation effects
        const modal = document.getElementById('confirmation-modal');
        modal.innerHTML = `
            <div class="sky-modal-content">
                <div class="sky-modal-header">
                    <h3>${getTranslation('modalTitle')}</h3>
                    <div class="sky-spirit-icon">✨</div>
                </div>
                <div class="sky-modal-body" id="modal-summary">
                    <!-- Order summary will be inserted here -->
                </div>
                <div class="sky-modal-footer">
                    <button id="cancel-checkout" class="sky-button">
                        ${getTranslation('modalCancel')}
                    </button>
                    <a id="confirm-checkout-wa" class="sky-button whatsapp-button">
                        ${getTranslation('modalConfirm')} <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
        `;

        // Add constellation effect
        const stars = document.createElement('div');
        stars.className = 'constellation-effect';
        modal.appendChild(stars);
    };

    // --- INITIALIZATION ---
    const init = () => {
        // Set initial theme
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        document.getElementById('themeToggle').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        
        // Apply Sky-themed styling
        applySeasonalTheme();
        
        // Initial renders
        renderProducts();
        renderFaqs();
        renderTestimonials();
        updateContent();
        updateCartDisplay();
        
        // Add Sky-style loading animation
        document.body.classList.add('loaded');
    };

    // Start the app
    init();
});
