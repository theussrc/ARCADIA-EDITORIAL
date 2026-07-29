// ==========================================================================
// ARCADIA EDITORIAL - INTERACTIVE CONTROLLER
// ==========================================================================

// Desativa a restauração automática de rolagem do navegador para sempre abrir no topo
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Força a rolagem para o topo imediatamente
function scrollToTopOnLoad() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

// Garante o topo no carregamento inicial
scrollToTopOnLoad();
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
window.addEventListener('pageshow', () => scrollToTopOnLoad());

document.addEventListener('DOMContentLoaded', () => {
    scrollToTopOnLoad();

    // Remove qualquer hash da URL na inicialização para evitar pulos de página
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
        scrollToTopOnLoad();
    }

    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Navbar Blur on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 4. Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.card, .section-header, .stat-card, .gallery-card, .dark-pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });
});

// 5. FAQ Accordion Toggle
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    if (!isActive) {
        item.classList.add('active');
    }
}

// 6. System Modal Explorer Data
const systemModalData = {
    lanzamiento: {
        emoji: '🚀',
        title: 'Sistema de Lanzamiento de Negocios',
        sub: '10 Guías Premium • 10 Prompts Maestros',
        items: [
            { name: 'Guía 01: Identificación y Validación de Nichos de Alta Oferta', type: 'Guía Premium' },
            { name: 'Guía 02: Arquitectura de la Oferta Irresistible', type: 'Guía Premium' },
            { name: 'Guía 03: Estructura de Funnel de Conversión Directa', type: 'Guía Premium' },
            { name: 'Guía 04: Estrategia de Secuencia de Emails de Calentamiento', type: 'Guía Premium' },
            { name: 'Guía 05: Plan de Acción de 14 Días para Salida al Mercado', type: 'Guía Premium' },
            { name: 'Prompt Maestro 01: Consultor de Validación de Mercado', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 02: Generador de Copys de Lanzamiento', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 03: Especialista en Objeciones e Incentivos', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 04: Optimizador de Páginas de Captura', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 05: Arquitecto de Estrategia de Precios', type: 'Prompt Maestro' }
        ]
    },
    contenido: {
        emoji: '✍️',
        title: 'Sistema de Creación de Contenido con IA',
        sub: '5 Guías Premium • 5 Prompts Maestros',
        items: [
            { name: 'Guía 01: Generación Infinita de Ideas de Alto Impacto', type: 'Guía Premium' },
            { name: 'Guía 02: Guiones Persuasivos para Reels, TikTok y Shorts', type: 'Guía Premium' },
            { name: 'Guía 03: Calendario Editorial Automatizado de 30 Días', type: 'Guía Premium' },
            { name: 'Guía 04: Copywriting de Autoridad para LinkedIn y Newsletter', type: 'Guía Premium' },
            { name: 'Guía 05: Reciclaje Inteligente de Contenido en 7 Formatos', type: 'Guía Premium' },
            { name: 'Prompt Maestro 01: Especialista en Ecosistemas de Contenido', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 02: Redactor de Hooks y Titulares Virales', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 03: Diseñador de Guiones de Video Corto', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 04: Estratega de Autoridad Orgánica', type: 'Prompt Maestro' },
            { name: 'Prompt Maestro 05: Editor de Tono y Voz de Marca', type: 'Prompt Maestro' }
        ]
    }
};

function openModal(key) {
    const modal = document.getElementById('system-modal');
    const data = systemModalData[key];
    if (!modal || !data) return;

    document.getElementById('modal-emoji').textContent = data.emoji;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-sub').textContent = data.sub;

    let html = `<p style="margin-bottom:1rem; color:#64748B; font-size:0.875rem;">Desglose completo de guías y Prompts Maestros incluidos:</p>`;
    data.items.forEach(item => {
        html += `
            <div class="modal-module-item">
                <span>${item.name}</span>
                <span class="badge-pill" style="font-size:0.7rem; flex-shrink:0;">${item.type}</span>
            </div>
        `;
    });

    document.getElementById('modal-body').innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling

    if (window.lucide) lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('system-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

// Close modal when clicking outside of modal-card or pressing Escape
document.addEventListener('click', (e) => {
    const modal = document.getElementById('system-modal');
    if (modal && modal.classList.contains('active') && e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 7. Toast & Checkout Action
function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle"></i><span>${msg}</span>`;
    container.appendChild(toast);

    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function triggerCheckout() {
    showToast('Redirigiendo al Área de Miembros de Arcadia (Pago Seguro US$ 19.90)...');
    setTimeout(() => {
        window.open('https://pay.hotmart.com/C106916076W?checkoutMode=10', '_blank');
    }, 2000);
}
