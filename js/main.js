// ------------------------------
// Scroll suave para enlaces internos
// ------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ------------------------------
// Animaciones al hacer scroll
// ------------------------------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-on-scroll").forEach(el => observer.observe(el));

// ------------------------------
// Menú tipo hamburguesa
// ------------------------------
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("active");
});

// ------------------------------
// Preguntas frecuentes con efecto "escribiendo"
// ------------------------------
const preguntas = [
  {
    pregunta: "¿Qué tipo de bots ofrecen?",
    respuesta: "Ofrecemos bots para soporte al cliente, agendamiento de citas, comercio con pagos en línea, automatización de procesos internos y soluciones completamente personalizadas según tus necesidades."
  },
  {
    pregunta: "¿Puedo conectar el bot a mi WhatsApp Business?",
    respuesta: "Sí. Integramos tu bot con la API oficial de WhatsApp Business (Meta/Twilio), así como con Facebook, Instagram y otras plataformas de mensajería."
  },
  {
    pregunta: "¿Cuánto tarda en estar listo un bot personalizado?",
    respuesta: "El tiempo estimado de desarrollo es de 1 a 2 meses. En muchos casos, en el primer mes ya tendrás una versión funcional para pruebas internas."
  },
  {
    pregunta: "¿Los bots aprenden con el tiempo?",
    respuesta: "Sí. Utilizamos inteligencia artificial con aprendizaje supervisado para que el bot se vuelva más eficiente y adaptado a tus usuarios reales."
  },
  {
    pregunta: "¿Qué pasa si mi negocio necesita algo muy específico?",
    respuesta: "Contamos con un equipo técnico experto que desarrolla bots completamente a medida, incluyendo APIs propias, integraciones externas y lógica empresarial adaptada."
  },
  {
    pregunta: "¿Puedo monitorear el rendimiento del bot?",
    respuesta: "Sí, todos nuestros planes incluyen estadísticas, reportes y análisis de uso para mejorar constantemente la experiencia del usuario."
  }
];

function mostrarRespuesta(index) {
  const todasLasRespuestas = document.querySelectorAll('.faq-respuesta');
  todasLasRespuestas.forEach(r => r.remove());

  const preguntaElement = document.querySelectorAll(".faq-question")[index];

  const respuestaWrapper = document.createElement("div");
  respuestaWrapper.className = "faq-respuesta chat-bubble bot";

  preguntaElement.insertAdjacentElement("afterend", respuestaWrapper);

  const texto = preguntas[index].respuesta;
  let i = 0;
  const velocidad = 20;

  function escribirTexto() {
    if (i < texto.length) {
      respuestaWrapper.textContent += texto.charAt(i);
      i++;
      setTimeout(escribirTexto, velocidad);
    }
  }

  escribirTexto();
}


  function obtenerFechaLimite() {
    const ahora = new Date();
    const inicioCiclo = new Date(2024, 0, 1); // Punto fijo (1 enero)
    const msDesdeInicio = ahora - inicioCiclo;
    const msPorCiclo = 14 * 24 * 60 * 60 * 1000; // 2 semanas
    const ciclosTranscurridos = Math.floor(msDesdeInicio / msPorCiclo);
    const siguienteFecha = new Date(inicioCiclo.getTime() + (ciclosTranscurridos + 1) * msPorCiclo);
    return siguienteFecha;
  }

  function actualizarContador() {
    const limite = obtenerFechaLimite();
    const ahora = new Date();
    const diferencia = limite - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");

    const opcionesFecha = { day: "numeric", month: "long" };
    document.getElementById("fecha-limite").textContent = limite.toLocaleDateString("es-ES", opcionesFecha);
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);


