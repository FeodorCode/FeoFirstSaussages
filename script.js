// Создание частиц
function createParticles() {
    const particlesContainer = document.getElementById('particles');
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
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Добавление в корзину
function addToCart(productName) {
    showNotification(`✅ ${productName} добавлен в корзину!`);
    updateCartCount();
}

// Обновление счетчика корзины
let cartCount = 0;
function updateCartCount() {
    cartCount++;
    const floatBtns = document.querySelectorAll('.float-btn');
    floatBtns[1].textContent = `🛒 ${cartCount}`;
}

// Мега заказ
function megaOrder() {
    showNotification('🚀 МЕГА ЗАКАЗ оформляется! Готовьте холодильник!');
    cartCount += 10;
    updateCartCount();
}

// Заказ сейчас
function orderNow() {
    showNotification('⚡ Быстрый заказ инициирован!');
}

// Переключение темы
let isDark = true;
function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
        document.body.style.background = 'var(--dark)';
        document.body.style.color = 'var(--light)';
        showNotification('🌙 Темная тема включена');
    } else {
        document.body.style.background = '#f0f0f0';
        document.body.style.color = '#333';
        showNotification('☀️ Светлая тема включена');
    }
}

// Анимация при скролле
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.product-card, .feature-item, .action-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Инициализация
createParticles();
showNotification('🌭 Добро пожаловать в SausageTech!');

// Добавление интерактивности всем кнопкам
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});
