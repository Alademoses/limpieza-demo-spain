/**
 * ==============================================================================
 * BRILLOTOTAL LIMPIEZA - SCRIPT JS
 * Proyecto de demostración desarrollado por WebSimple Spain
 * ==============================================================================
 * 
 * NOTA PARA EL DESARROLLADOR / CLIENTE:
 * Para adaptar esta plantilla a una empresa real, configure los valores en el
 * objeto CONFIG a continuación.
 */

const CONFIG = {
  // Número de teléfono de WhatsApp con código de país (ejemplo: "34600112233" para España)
  // Dejar vacío ("") para mantener el modo demostración activo
  whatsappNumber: "",

  // Mensaje predeterminado que verá el cliente al abrir WhatsApp
  whatsappMessage: "Hola, me gustaría solicitar información y presupuesto para un servicio de limpieza con BrilloTotal Limpieza.",

  // Nombre de la empresa y correo de contacto demostrativo
  businessName: "BrilloTotal Limpieza",
  demoCity: "Madrid, España"
};

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFaqAccordion();
  initServiceButtons();
  initContactForm();
  initWhatsAppButton();
  initLegalModal();
});

/**
 * 1. NAVEGACIÓN Y MENÚ MÓVIL
 */
function initNavbar() {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Efecto de sombra al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }, { passive: true });

  // Toggle de navegación móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Cerrar al pulsar un enlace
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Cerrar al pulsar fuera del menú
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navMenu.classList.add("open");
    navToggle.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
  }

  function closeMobileMenu() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  // Resaltado de sección activa según scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

/**
 * 2. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");

    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Cierra todos los demás elementos para mantener la lectura limpia
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherBtn = otherItem.querySelector(".faq-question-btn");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alterna el elemento actual
      if (isActive) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/**
 * 3. BOTONES DE SERVICIOS
 * Al hacer clic en "Pedir información", se desplaza suavemente al formulario y preselecciona el servicio correspondiente
 */
function initServiceButtons() {
  const serviceButtons = document.querySelectorAll(".service-btn");
  const serviceSelect = document.getElementById("serviceType");
  const contactSection = document.getElementById("contacto");

  serviceButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetService = btn.getAttribute("data-service");

      if (serviceSelect && targetService) {
        serviceSelect.value = targetService;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });

        // Resaltar visualmente el selector temporalmente
        if (serviceSelect) {
          setTimeout(() => {
            serviceSelect.focus();
            serviceSelect.style.borderColor = "var(--turquoise-500)";
            serviceSelect.style.boxShadow = "0 0 0 4px var(--turquoise-glow)";
            setTimeout(() => {
              serviceSelect.style.borderColor = "";
              serviceSelect.style.boxShadow = "";
            }, 1800);
          }, 600);
        }
      }
    });
  });
}

/**
 * 4. FORMULARIO DE CONTACTO EN MODO DEMOSTRACIÓN
 * Valida los datos y muestra un modal explicativo detallado sin simular envíos falsos
 */
function initContactForm() {
  const form = document.getElementById("quoteForm");
  const demoModal = document.getElementById("formDemoModal");
  const modalCloseBtns = document.querySelectorAll("[data-close-form-modal]");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar errores previos
    clearFormErrors(form);

    // Obtener valores
    const nameInput = document.getElementById("formName");
    const emailInput = document.getElementById("formEmail");
    const phoneInput = document.getElementById("formPhone");
    const serviceInput = document.getElementById("serviceType");
    const messageInput = document.getElementById("formMessage");
    const privacyInput = document.getElementById("formPrivacy");

    let hasErrors = false;

    // Validación de nombre
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput, "Por favor, introduce tu nombre completo (mínimo 2 caracteres).");
      hasErrors = true;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Por favor, introduce una dirección de correo electrónico válida.");
      hasErrors = true;
    }

    // Validación de servicio
    if (!serviceInput.value) {
      showError(serviceInput, "Por favor, selecciona un tipo de servicio de limpieza.");
      hasErrors = true;
    }

    // Validación de mensaje
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, "Por favor, describe brevemente tu espacio o necesidades (mínimo 10 caracteres).");
      hasErrors = true;
    }

    // Validación de política de privacidad
    if (!privacyInput.checked) {
      const parentWrap = privacyInput.closest(".form-group");
      const errEl = parentWrap.querySelector(".form-error-msg");
      if (errEl) {
        errEl.textContent = "Debes marcar la casilla para continuar.";
        errEl.classList.add("visible");
      }
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Si es válido, recopilar datos y mostrar el modal explicativo de demostración
    const serviceNames = {
      hogares: "Limpieza de hogares",
      oficinas: "Limpieza de oficinas",
      comunidades: "Limpieza de comunidades",
      fin_de_obra: "Limpieza de fin de obra",
      cristales: "Limpieza de cristales",
      puntual_profunda: "Limpieza puntual y profunda"
    };

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim() || "No facilitado (opcional)",
      service: serviceNames[serviceInput.value] || serviceInput.value,
      message: messageInput.value.trim()
    };

    showFormDemoModal(formData);
  });

  // Limpiar error al escribir
  const inputs = form.querySelectorAll(".form-input, .form-select, .form-textarea, #formPrivacy");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
      const parent = input.closest(".form-group");
      if (parent) {
        const errorEl = parent.querySelector(".form-error-msg");
        if (errorEl) errorEl.classList.remove("visible");
      }
    });
  });

  // Cerrar modal
  modalCloseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      hideFormDemoModal();
    });
  });

  // Cerrar al pulsar el fondo
  if (demoModal) {
    demoModal.addEventListener("click", (e) => {
      if (e.target === demoModal) {
        hideFormDemoModal();
      }
    });
  }

  function showError(inputEl, message) {
    inputEl.classList.add("error");
    const parent = inputEl.closest(".form-group");
    if (parent) {
      const errEl = parent.querySelector(".form-error-msg");
      if (errEl) {
        errEl.textContent = message;
        errEl.classList.add("visible");
      }
    }
  }

  function clearFormErrors(formEl) {
    const errorInputs = formEl.querySelectorAll(".error");
    errorInputs.forEach(el => el.classList.remove("error"));

    const errorMsgs = formEl.querySelectorAll(".form-error-msg");
    errorMsgs.forEach(el => el.classList.remove("visible"));
  }

  function showFormDemoModal(data) {
    if (!demoModal) return;

    // Rellenar datos en el resumen
    document.getElementById("recapName").textContent = data.name;
    document.getElementById("recapEmail").textContent = data.email;
    document.getElementById("recapPhone").textContent = data.phone;
    document.getElementById("recapService").textContent = data.service;
    document.getElementById("recapMessage").textContent = data.message;

    demoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function hideFormDemoModal() {
    if (!demoModal) return;
    demoModal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
    showToast("Formulario reiniciado para nuevas pruebas");
  }
}

/**
 * 5. BOTÓN FLOTANTE DE WHATSAPP
 * Si CONFIG.whatsappNumber está vacío, muestra un modal instructivo.
 * Si contiene un número, abre la API de WhatsApp con el mensaje configurado.
 */
function initWhatsAppButton() {
  const whatsappBtn = document.getElementById("whatsappFloatBtn");
  const whatsappModal = document.getElementById("whatsappDemoModal");
  const closeBtns = document.querySelectorAll("[data-close-whatsapp-modal]");

  if (!whatsappBtn) return;

  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (CONFIG.whatsappNumber && CONFIG.whatsappNumber.trim() !== "") {
      // Abre el enlace real si está configurado
      const cleanNumber = CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
      const encodedMsg = encodeURIComponent(CONFIG.whatsappMessage);
      const url = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Abre el modal de demostración explicativo
      showWhatsAppModal();
    }
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", hideWhatsAppModal);
  });

  if (whatsappModal) {
    whatsappModal.addEventListener("click", (e) => {
      if (e.target === whatsappModal) hideWhatsAppModal();
    });
  }

  function showWhatsAppModal() {
    if (!whatsappModal) return;
    whatsappModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function hideWhatsAppModal() {
    if (!whatsappModal) return;
    whatsappModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/**
 * 6. MODAL DE AVISO LEGAL Y PRIVACIDAD (DEMO)
 */
function initLegalModal() {
  const legalModal = document.getElementById("legalDemoModal");
  const legalTriggers = document.querySelectorAll("[data-open-legal-modal]");
  const closeBtns = document.querySelectorAll("[data-close-legal-modal]");

  if (!legalModal) return;

  legalTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      legalModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      legalModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  legalModal.addEventListener("click", (e) => {
    if (e.target === legalModal) {
      legalModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/**
 * 7. NOTIFICACIÓN TOAST LIGERA
 */
function showToast(message) {
  let toast = document.getElementById("demoToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "demoToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--turquoise-400); flex-shrink: 0;">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add("visible");

  setTimeout(() => {
    toast.classList.remove("visible");
  }, 3500);
}
