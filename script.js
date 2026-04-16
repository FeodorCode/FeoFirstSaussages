// Создание частиц
function createParticles() {
    const particlesContainer = document.querySelector('.bg-animation');
    if (!particlesContainer) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = (Math.random() * 6) + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Показ уведомлений
function showNotification(message) {
    const container = document.getElementById('notification-area');
    const notification = document.createElement('div');
    notification.className = 'notification show';
    notification.textContent = message;
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Навигация по вкладкам
function switchTab(targetId) {
    // Убираем активный класс со всех кнопок навигации
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.target === targetId) {
            btn.classList.add('active');
        }
    });
    
    // Скрываем все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Показываем нужную вкладку
    const targetTab = document.getElementById(targetId);
    if (targetTab) {
        targetTab.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Добавление в корзину
let cart = [];
function addToCart(productName, price = 0) {
    cart.push({ name: productName, price: price });
    showNotification(`✅ ${productName} добавлен в корзину!`);
    updateCartCount();
    updateCartModal();
}

// Обновление счетчика корзины
function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}

// Обновление модального окна корзины
function updateCartModal() {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceEl = document.getElementById('total-price');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="empty-cart-msg">Корзина пуста. Добавьте немного вкуса!</li>';
        totalPriceEl.textContent = '0 ₽';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `<li class="cart-item">
            <span>${item.name}</span>
            <span>${item.price} ₽</span>
            <button class="remove-item" data-index="${index}">❌</button>
        </li>`;
    }).join('');
    
    totalPriceEl.textContent = `${total} ₽`;
    
    // Добавляем обработчики для удаления
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCartCount();
            updateCartModal();
            showNotification('Товар удален из корзины');
        });
    });
}

// Открытие/закрытие модальных окон
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Переключение темы
let isDark = true;
function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
        document.documentElement.style.setProperty('--dark', '#1a1a2e');
        document.documentElement.style.setProperty('--light', '#fefefe');
        showNotification('🌙 Темная тема включена');
    } else {
        document.documentElement.style.setProperty('--dark', '#f0f0f0');
        document.documentElement.style.setProperty('--light', '#1a1a2e');
        showNotification('☀️ Светлая тема включена');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    showNotification('🌭 Добро пожаловать в SausageTech!');
    
    // Навигация по кнопкам меню
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.dataset.target;
            switchTab(target);
        });
    });
    
    // Навигация через кнопки-триггеры
    document.querySelectorAll('.nav-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            switchTab(target);
        });
    });
    
    // Кнопки добавления в корзину
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            addToCart(name, 100);
        });
    });
    
    // Кнопки "Инфо" - открывают модалку
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            document.getElementById('modal-product-title').textContent = name;
            document.getElementById('modal-product-desc').textContent = `Подробное описание товара "${name}". Инновационная сосиска в тесте высшего качества.`;
            openModal('product-modal');
        });
    });
    
    // Открытие корзины
    document.getElementById('cart-trigger')?.addEventListener('click', () => {
        openModal('cart-modal');
    });
    
    // Закрытие модальных окон
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Закрытие по клику вне контента
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });
    
    // Оформление заказа
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('⚠️ Корзина пуста!');
            return;
        }
        showNotification('🎉 Заказ оформлен! Ожидайте доставку дронами!');
        cart = [];
        updateCartCount();
        updateCartModal();
        closeModal('cart-modal');
    });
    
    // Добавление из модалки товара
    document.getElementById('modal-add-to-cart')?.addEventListener('click', () => {
        const name = document.getElementById('modal-product-title').textContent;
        addToCart(name, 100);
        closeModal('product-modal');
    });
    
    // Форма контактов
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('✉️ Сообщение отправлено! Мы свяжемся с вами.');
        e.target.reset();
    });
    
    // Переключение темы
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
});
