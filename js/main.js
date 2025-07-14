// Smooth scrolling para enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menú móvil
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Animaciones al aparecer en el viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// FAQ toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Contador regresivo - VERSIÓN CORREGIDA
function obtenerFechaLimite() {
    const ahora = new Date();
    const fechaBase = new Date(2024, 0, 1); // 1 de enero de 2024
    const diferenciaTiempo = ahora - fechaBase;
    const intervalo = 12096e5; // 14 días en milisegundos
    const ciclo = Math.floor(diferenciaTiempo / intervalo);
    
    return new Date(fechaBase.getTime() + (ciclo + 1) * intervalo);
}

function actualizarContador() {
    const fechaLimite = obtenerFechaLimite();
    const ahora = new Date();
    const diferencia = fechaLimite - ahora;

    // Si la fecha límite ya pasó, reiniciar
    if (diferencia <= 0) {
        // Recalcular nueva fecha límite
        const nuevaFechaLimite = obtenerFechaLimite();
        const nuevaDiferencia = nuevaFechaLimite - ahora;
        
        if (nuevaDiferencia <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Usar la nueva diferencia
        const dias = Math.floor(nuevaDiferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((nuevaDiferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((nuevaDiferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((nuevaDiferencia % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = dias.toString().padStart(2, '0');
        document.getElementById('hours').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = segundos.toString().padStart(2, '0');
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Actualizar los elementos en el DOM
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = dias.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = horas.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutos.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = segundos.toString().padStart(2, '0');
}

// Iniciar el contador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    actualizarContador();
    setInterval(actualizarContador, 1000);
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            header.style.padding = '1rem 0';
        }
    }
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Guardar referencia al formulario
        const form = this;
        
        // Mostrar el modal de éxito
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.add('active');
        }
        
        // Enviar el formulario después de un breve retraso
        setTimeout(() => {
            form.submit();
        }, 1000);
    });
}

// Cerrar modales
const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', function() {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.remove('active');
        }
    });
}

const modalOk = document.getElementById('modal-ok');
if (modalOk) {
    modalOk.addEventListener('click', function() {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.remove('active');
        }
    });
}

// Cerrar al hacer clic fuera del modal
const successModal = document.getElementById('success-modal');
if (successModal) {
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
}

// Cerrar con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.remove('active');
        }
    }
});