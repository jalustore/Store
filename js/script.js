document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const WHATSAPP_NUMBER = "6285189014747"; // Nomor WhatsApp tujuan
    const CURRENCY_RATES = { USD: 16550, MYR: 3545 };
    const COUPONS = {
        "JALUHEART10": { type: "percentage", value: 10 },
        "HEMAT5K": { type: "fixed", value: 5000 }
    };

    // --- DATA ---
    const products = [
        { id: 1, hearts: 40, price: 5000, days: 2, popular: true, savings: "24%" },
        { id: 2, hearts: 80, price: 10000, days: 4 },
        { id: 3, hearts: 120, price: 15000, days: 6 },
        { id: 4, hearts: 200, price: 20000, days: 11, savings: "31%" },
        { id: 5, hearts: 310, price: 30000, days: 16, savings: "33%" },
        { id: 6, hearts: 420, price: 40000, days: 22, savings: "34%" },
        { id: 7, hearts: 540, price: 50000, days: 27, savings: "35%" }
    ];

    const faqData = [
        { q: "faq1q", a: "faq1a" },
        { q: "faq2q", a: "faq2a" },
        { q: "faq3q", a: "faq3a" },
    ];
    
    const testimonialsData = [
        { avatar: '👩', name: 'Sarah K.', detail: 'testimonial1Detail', content: 'testimonial1' },
        { avatar: '👨', name: 'Budi W.', detail: 'testimonial2Detail', content: 'testimonial2' },
        { avatar: '👧', name: 'Dewi L.', detail: 'testimonial3Detail', content: 'testimonial3' }
    ];

    const translations = {
        'id': {
            // General
            heroTitle: "✨ JALUSTORE ✨",
            tagline: "Dapatkan Hearts eksklusif untuk Sky: Children of the Light dengan harga terbaik, proses cepat, dan jaminan keamanan transaksi.",
            contactButton: "🛒 Lihat Paket Heart",
            trackOrderButton: "🚚 Lacak Pesanan Anda",
            badgeSecure: "Transaksi Aman",
            badgeFast: "Proses Cepat",
            badgeGuaranteed: "Garansi 100%",
            sectionTitle: "💖 Daftar Harga Heart Eksklusif",
            sectionIntro: "Pilih paket yang paling sesuai untukmu! Kami menjamin pengiriman hingga <strong>20 Heart per hari</strong> untuk mempercepat progres Anda di dunia Sky.",
            noteTitle: "Perhatian Penting:",
            note1: "Pengiriman Heart membutuhkan <strong>interaksi harian</strong> di dalam game.",
            note2: "Estimasi waktu didasarkan pada kapasitas pengiriman <strong>20 Heart/hari</strong>.",
            note3: "Pastikan Anda <strong>rutin mengirim cahaya (light)</strong> ke akun kami setiap hari untuk kelancaran proses.",
            note4: "Harga dalam USD & MYR adalah <strong>estimasi</strong> dan dapat berubah sesuai kurs.",
            // Cards
            pricePerHeart: "Harga/Heart",
            deliveryEstimate: "Estimasi Pengiriman",
            daySuffix: "Hari",
            addToCart: "Tambah ke Keranjang",
            // Cart
            cartTitle: "🛒 Keranjang Belanja Anda",
            emptyCart: "Keranjang Anda kosong.",
            skyIdLabel: "Sky ID (Kode QR/Link)",
            skyIgnLabel: "Nama Dalam Game (IGN)",
            subtotal: "Subtotal",
            discount: "Diskon",
            totalPayment: "Total Pembayaran",
            checkoutButton: "Lanjut ke Pembayaran",
            removeItem: "Hapus",
            // FAQ
            faqTitle: "❓ Pertanyaan Umum",
            faq1q: "Bagaimana cara pembeliannya?",
            faq1a: "1. Pilih paket, 2. Isi data & checkout, 3. Lakukan pembayaran via WhatsApp, 4. Kirim bukti & data Sky, 5. Heart akan dikirim sesuai estimasi.",
            faq2q: "Berapa lama pengiriman heart?",
            faq2a: "Pengiriman dilakukan bertahap hingga 20 heart per hari. Waktu total sesuai estimasi di setiap paket.",
            faq3q: "Apakah transaksi ini aman?",
            faq3a: "Sangat aman. Kami memberikan garansi 100% uang kembali jika heart tidak terkirim sesuai pesanan. Kepercayaan Anda adalah prioritas kami.",
            // Testimonials
            testimonialTitle: "🌟 Testimoni Pelanggan",
            testimonial1: "Pengiriman sangat cepat! Seller ramah dan profesional. Recommended banget!",
            testimonial1Detail: "Pembeli 200 Heart",
            testimonial2: "Prosesnya mudah banget dan harganya paling murah dibanding yang lain!",
            testimonial2Detail: "Pembeli 80 Heart",
            testimonial3: "Trusted seller! Sudah beberapa kali repeat order dan selalu puas.",
            testimonial3Detail: "Pembeli 540 Heart",
            // Modal
            modalTitle: "Konfirmasi Pesanan Anda",
            modalCancel: "Batal",
            modalConfirm: "Konfirmasi & Chat WA",
            modalOrder: "Pesanan",
            modalSkyId: "Sky ID",
            modalSkyIgn: "Nama Game",
            modalTotal: "Total",
            // Toasts
            toastAdded: "ditambahkan ke keranjang!",
            toastRemoved: "dihapus dari keranjang.",
            toastCouponApplied: "Kupon berhasil digunakan!",
            toastCouponInvalid: "Kode kupon tidak valid.",
        },
        'en': {
            // General
            heroTitle: "✨ JALUSTORE ✨",
            tagline: "Get exclusive Hearts for Sky: Children of the Light at the best prices, with fast processing and secure transactions.",
            contactButton: "🛒 View Heart Packages",
            trackOrderButton: "🚚 Track Your Order",
            badgeSecure: "Secure Transaction",
            badgeFast: "Fast Process",
            badgeGuaranteed: "100% Guarantee",
            sectionTitle: "💖 Exclusive Heart Price List",
            sectionIntro: "Choose the package that suits you best! We guarantee delivery of up to <strong>20 Hearts per day</strong> to speed up your progress in the world of Sky.",
            noteTitle: "Important Note:",
            note1: "Heart delivery requires <strong>daily in-game interaction</strong>.",
            note2: "Delivery estimate is based on a capacity of <strong>20 Hearts/day</strong>.",
            note3: "Please ensure you <strong>regularly send light</strong> to our account daily for a smooth process.",
            note4: "Prices in USD & MYR are <strong>estimates</strong> and may change with exchange rates.",
            // Cards
            pricePerHeart: "Price/Heart",
            deliveryEstimate: "Delivery Estimate",
            daySuffix: "Days",
            addToCart: "Add to Cart",
            // Cart
            cartTitle: "🛒 Your Shopping Cart",
            emptyCart: "Your cart is empty.",
            skyIdLabel: "Sky ID (QR Code/Link)",
            skyIgnLabel: "In-Game Name (IGN)",
            subtotal: "Subtotal",
            discount: "Discount",
            totalPayment: "Total Payment",
            checkoutButton: "Proceed to Payment",
            removeItem: "Remove",
            // FAQ
            faqTitle: "❓ Frequently Asked Questions",
            faq1q: "How to purchase?",
            faq1a: "1. Select a package, 2. Fill in your data & checkout, 3. Complete payment via WhatsApp, 4. Send proof & Sky data, 5. Hearts will be delivered as estimated.",
            faq2q: "How long does delivery take?",
            faq2a: "Delivery is gradual, up to 20 hearts per day. The total time matches the estimate on each package.",
            faq3q: "Is this transaction safe?",
            faq3a: "Absolutely safe. We offer a 100% money-back guarantee if hearts are not delivered as ordered. Your trust is our priority.",
            // Testimonials
            testimonialTitle: "🌟 Customer Testimonials",
            testimonial1: "Very fast delivery! The seller is friendly and professional. Highly recommended!",
            testimonial1Detail: "200 Hearts Buyer",
            testimonial2: "The process was super easy and the price is the cheapest compared to others!",
            testimonial2Detail: "80 Hearts Buyer",
            testimonial3: "Trusted seller! Have made several repeat orders and always satisfied.",
            testimonial3Detail: "540 Hearts Buyer",
             // Modal
            modalTitle: "Confirm Your Order",
            modalCancel: "Cancel",
            modalConfirm: "Confirm & Chat on WA",
            modalOrder: "Order",
            modalSkyId: "Sky ID",
            modalSkyIgn: "Game Name",
            modalTotal: "Total",
            // Toasts
            toastAdded: "added to cart!",
            toastRemoved: "removed from cart.",
            toastCouponApplied: "Coupon applied successfully!",
            toastCouponInvalid: "Invalid coupon code.",
        }
    };

    // --- STATE ---
    let currentLang = localStorage.getItem('lang') || 'id';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let appliedCoupon = null;

    // --- SELECTORS ---
    const heartsContainer = document.querySelector('.heart-cards-container');
    const faqContainer = document.querySelector('.faq-container');
    const testimonialsContainer = document.querySelector('.testimonial-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSection = document.getElementById('cart-section');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');
    const skyIdInput = document.getElementById('sky-id');
    const skyIgnInput = document.getElementById('sky-ign');
    const couponInput = document.getElementById('coupon-input');
    
    // --- UTILS ---
    const formatCurrency = (amount) => `Rp ${amount.toLocaleString('id-ID')}`;
    const getTranslation = (key) => translations[currentLang][key] || key;

    // --- TOAST NOTIFICATIONS ---
    const showToast = (message, type = 'success') => {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    // --- RENDER FUNCTIONS ---
    const renderProducts = () => {
        if (!heartsContainer) return;
        heartsContainer.innerHTML = '';
        products.forEach(p => {
            const pricePerHeart = formatCurrency(Math.round(p.price / p.hearts));
            const usdPrice = (p.price / CURRENCY_RATES.USD).toFixed(2);
            const myrPrice = (p.price / CURRENCY_RATES.MYR).toFixed(2);

            const card = document.createElement('div');
            card.className = `heart-card ${p.popular ? 'popular' : ''}`;
            card.innerHTML = `
                ${p.popular ? `<div class="popular-tag">POPULER</div>` : ''}
                <h3><strong>${p.hearts}</strong> Hearts ❤️</h3>
                <p class="price-idr">${formatCurrency(p.price)}</p>
                <div class="card-details">
                    <p><span data-translate="pricePerHeart"></span>: <strong>~${pricePerHeart}</strong></p>
                    <p><span data-translate="deliveryEstimate"></span>: <strong>${p.days} <span data-translate="daySuffix"></span></strong></p>
                    <p class="currency-estimates">($${usdPrice} USD / RM${myrPrice} MYR)*</p>
                    ${p.savings ? `<div class="savings-badge">Hemat ${p.savings}</div>` : ''}
                </div>
                <button class="contact-button card-button add-to-cart-button" data-id="${p.id}">
                    <span data-translate="addToCart"></span>
                </button>
            `;
            heartsContainer.appendChild(card);
        });
    };

    const renderFaqs = () => {
        if (!faqContainer) return;
        faqContainer.innerHTML = '';
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <button class="faq-question">
                    <span data-translate="${item.q}"></span>
                    <span class="faq-toggle">+</span>
                </button>
                <div class="faq-answer">
                    <p data-translate="${item.a}"></p>
                </div>
            `;
            faqContainer.appendChild(faqItem);
        });
    };
    
    const renderTestimonials = () => {
        if (!testimonialsContainer) return;
        testimonialsContainer.innerHTML = '';
        testimonialsData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-content" data-translate="${item.content}"></div>
                <div class="testimonial-author">
                    <div class="author-avatar">${item.avatar}</div>
                    <div class="author-info">
                        <div class="author-name">${item.name}</div>
                        <div class="author-detail" data-translate="${item.detail}"></div>
                    </div>
                </div>
            `;
            testimonialsContainer.appendChild(card);
        });
    };
    
    // --- CART LOGIC ---
    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    const updateCartDisplay = () => {
        if (cart.length === 0) {
            cartSection.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            cartSection.style.display = 'block';
            emptyCartMessage.style.display = 'none';
        }

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            subtotal += product.price * cartItem.quantity;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-name">${product.hearts} Hearts</span>
                    <span class="cart-item-price">${formatCurrency(product.price)}</span>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease-quantity" data-id="${product.id}">-</button>
                    <span class="cart-item-quantity">${cartItem.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${product.id}">+</button>
                    <button class="remove-from-cart-button" data-id="${product.id}" title="${getTranslation('removeItem')}">×</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Calculate total
        let discountAmount = 0;
        if (appliedCoupon && COUPONS[appliedCoupon]) {
            const coupon = COUPONS[appliedCoupon];
            if (coupon.type === 'percentage') {
                discountAmount = subtotal * (coupon.value / 100);
            } else {
                discountAmount = coupon.value;
            }
            document.getElementById('discount-row').style.display = 'flex';
            document.getElementById('cart-discount').textContent = `- ${formatCurrency(discountAmount)}`;
        } else {
            document.getElementById('discount-row').style.display = 'none';
        }

        const total = subtotal - discountAmount;
        document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('cart-total').textContent = formatCurrency(total);
        
        validateCheckout();
    };
    
    const addItemToCart = (productId) => {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        const product = products.find(p => p.id === productId);
        showToast(`${product.hearts} Hearts ${getTranslation('toastAdded')}`);
        saveCart();
        updateCartDisplay();
        if (cart.length === 1 && cart[0].quantity === 1) {
            cartSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const changeQuantity = (productId, change) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                const product = products.find(p => p.id === item.id);
                showToast(`${product.hearts} Hearts ${getTranslation('toastRemoved')}`, 'error');
                cart = cart.filter(cartItem => cartItem.id !== productId);
            }
            saveCart();
            updateCartDisplay();
        }
    };

    const validateCheckout = () => {
        const isCartEmpty = cart.length === 0;
        const isDataFilled = skyIdInput.value.trim() !== '' && skyIgnInput.value.trim() !== '';
        checkoutButton.disabled = isCartEmpty || !isDataFilled;
    };
    
    // --- LANGUAGE & THEME ---
    const updateContent = () => {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            if (getTranslation(key)) {
                el.innerHTML = getTranslation(key);
            }
        });
        document.documentElement.lang = currentLang;
        document.getElementById('langToggle').textContent = (currentLang === 'id') ? '🇬🇧' : '🇮🇩';
        document.getElementById('apply-coupon-button').textContent = (currentLang === 'id') ? 'Gunakan' : 'Apply';
        couponInput.placeholder = (currentLang === 'id') ? 'Masukkan Kode Kupon' : 'Enter Coupon Code';
        skyIdInput.placeholder = (currentLang === 'id') ? 'Contoh: https://sky.thatg.co/...' : 'Example: https://sky.thatg.co/...';
        skyIgnInput.placeholder = (currentLang === 'id') ? 'Contoh: Alex' : 'Example: Alex';
        updateCartDisplay();
    };

    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
    };

    // --- EVENT LISTENERS ---
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('lang', currentLang);
        updateContent();
    });
    
    document.addEventListener('click', e => {
        // Add to cart
        if (e.target.closest('.add-to-cart-button')) {
            const id = parseInt(e.target.closest('.add-to-cart-button').dataset.id);
            addItemToCart(id);
        }
        // Quantity controls
        if (e.target.closest('.increase-quantity')) {
            const id = parseInt(e.target.closest('.increase-quantity').dataset.id);
            changeQuantity(id, 1);
        }
        if (e.target.closest('.decrease-quantity')) {
            const id = parseInt(e.target.closest('.decrease-quantity').dataset.id);
            changeQuantity(id, -1);
        }
        if (e.target.closest('.remove-from-cart-button')) {
            const id = parseInt(e.target.closest('.remove-from-cart-button').dataset.id);
            changeQuantity(id, -Infinity); // Set quantity to 0 to remove
        }
        // FAQ toggle
        if (e.target.closest('.faq-question')) {
            e.target.closest('.faq-item').classList.toggle('active');
        }
        // Smooth scroll
        if (e.target.matches('.scroll-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Checkout and Form validation
    [skyIdInput, skyIgnInput].forEach(input => input.addEventListener('input', validateCheckout));
    
    document.getElementById('apply-coupon-button').addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (COUPONS[code]) {
            appliedCoupon = code;
            showToast(getTranslation('toastCouponApplied'));
        } else {
            appliedCoupon = null;
            showToast(getTranslation('toastCouponInvalid'), 'error');
        }
        updateCartDisplay();
    });

    // Modal Logic
    const modal = document.getElementById('confirmation-modal');
    checkoutButton.addEventListener('click', () => {
        const skyId = skyIdInput.value.trim();
        const skyIgn = skyIgnInput.value.trim();
        
        let subtotal = cart.reduce((acc, item) => acc + (products.find(p=>p.id===item.id).price * item.quantity), 0);
        let discountAmount = 0;
        if(appliedCoupon && COUPONS[appliedCoupon]){
            const coupon = COUPONS[appliedCoupon];
            discountAmount = coupon.type === 'percentage' ? subtotal * (coupon.value/100) : coupon.value;
        }
        const total = subtotal - discountAmount;
        
        let orderSummary = '';
        let whatsappText = `${getTranslation('modalOrder')}:\n`;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const line = `- ${product.hearts} Hearts (x${item.quantity}) = ${formatCurrency(product.price * item.quantity)}\n`;
            orderSummary += `<p>${line.replace(/\n/g, '')}</p>`;
            whatsappText += line;
        });

        document.getElementById('modal-summary').innerHTML = `
            ${orderSummary}
            <p><strong>${getTranslation('modalSkyId')}:</strong> <span>${skyId}</span></p>
            <p><strong>${getTranslation('modalSkyIgn')}:</strong> <span>${skyIgn}</span></p>
            <p><strong>${getTranslation('subtotal')}:</strong> <span>${formatCurrency(subtotal)}</span></p>
            ${discountAmount > 0 ? `<p><strong>${getTranslation('discount')}:</strong> <span>- ${formatCurrency(discountAmount)}</span></p>` : ''}
            <p><strong>${getTranslation('modalTotal')}:</strong> <span>${formatCurrency(total)}</span></p>
        `;

        whatsappText += `\n${getTranslation('modalSkyId')}: ${skyId}\n`;
        whatsappText += `${getTranslation('modalSkyIgn')}: ${skyIgn}\n`;
        if (discountAmount > 0) {
            whatsappText += `${getTranslation('discount')}: -${formatCurrency(discountAmount)}\n`;
        }
        whatsappText += `${getTranslation('modalTotal')}: ${formatCurrency(total)}`;
        
        document.getElementById('confirm-checkout-wa').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

        modal.style.display = 'flex';
    });
    
    document.getElementById('cancel-checkout').addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'confirmation-modal') {
            modal.style.display = 'none';
        }
    });

    // --- INITIALIZATION ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '☀️';
    }

    renderProducts();
    renderFaqs();
    renderTestimonials();
    updateContent();
    updateCartDisplay();
});
