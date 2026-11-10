(function () {
  'use strict';

  // Número de WhatsApp de BNB HOST en formato internacional, sin + ni espacios.
  var whatsappNumber = '18498171998';

  // MENÚ MÓVIL
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      menuToggle.textContent = isOpen ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.textContent = '☰';
      });
    });
  }

  // CARRUSELES DE FOTOGRAFÍAS
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var images = track ? track.querySelectorAll('img') : [];
    var prev = carousel.querySelector('.prev');
    var next = carousel.querySelector('.next');
    var dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || !images.length || !prev || !next || !dotsContainer) return;

    var currentIndex = 0;

    images.forEach(function (_, index) {
      var dot = document.createElement('span');
      if (index === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('span');

    function updateDots() {
      dots.forEach(function (dot, index) {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function updateCarousel() {
      currentIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
      track.scrollTo({
        left: currentIndex * track.clientWidth,
        behavior: 'smooth'
      });
      updateDots();
    }

    prev.addEventListener('click', function () {
      currentIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
      updateCarousel();
    });

    next.addEventListener('click', function () {
      currentIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
      updateCarousel();
    });

    track.addEventListener('scroll', function () {
      if (!track.clientWidth) return;
      var index = Math.round(track.scrollLeft / track.clientWidth);
      if (index !== currentIndex) {
        currentIndex = Math.max(0, Math.min(index, images.length - 1));
        updateDots();
      }
    }, { passive: true });

    window.addEventListener('resize', updateCarousel);
  });

  // BUSCADOR Y FILTROS
  var searchForm = document.getElementById('searchForm');
  var destinationInput = document.getElementById('destination');
  var typeFilter = document.getElementById('typeFilter');
  var cards = document.querySelectorAll('.property-card');
  var emptyState = document.getElementById('emptyState');
  var resultsCount = document.getElementById('resultsCount');
  var checkinInput = document.getElementById('checkin');
  var checkoutInput = document.getElementById('checkout');

  function filterProperties() {
    var destination = destinationInput.value.toLowerCase().trim();
    var type = typeFilter.value;
    var visible = 0;

    cards.forEach(function (card) {
      var location = (card.getAttribute('data-location') || '').toLowerCase();
      var cardType = card.getAttribute('data-type') || '';
      var matchesLocation = !destination || location.indexOf(destination) !== -1;
      var matchesType = !type || cardType === type;
      var show = matchesLocation && matchesType;

      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    emptyState.style.display = visible === 0 ? 'block' : 'none';
    resultsCount.textContent = visible + (visible === 1 ? ' alojamiento' : ' alojamientos');
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      filterProperties();
    });
  }
  if (destinationInput) destinationInput.addEventListener('input', filterProperties);
  if (typeFilter) typeFilter.addEventListener('change', filterProperties);

  // FILTRO DESDE LAS CATEGORÍAS
  document.querySelectorAll('[data-category]').forEach(function (category) {
    category.addEventListener('click', function () {
      typeFilter.value = category.getAttribute('data-category');
      filterProperties();
    });
  });

  // VALIDACIÓN DE FECHAS
  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', function () {
      checkoutInput.min = checkinInput.value;
      if (checkoutInput.value && checkoutInput.value < checkinInput.value) {
        checkoutInput.value = '';
      }
    });

    checkoutInput.addEventListener('change', function () {
      if (checkinInput.value && checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.setCustomValidity('La fecha de salida debe ser posterior a la fecha de entrada.');
      } else {
        checkoutInput.setCustomValidity('');
      }
    });
  }

  // CONSULTAS DE CADA ALOJAMIENTO POR WHATSAPP
  document.querySelectorAll('.whatsapp-button').forEach(function (button) {
    button.addEventListener('click', function () {
      var property = button.getAttribute('data-property') || 'un alojamiento';
      var destination = destinationInput ? destinationInput.value.trim() : '';
      var checkin = checkinInput ? checkinInput.value : '';
      var checkout = checkoutInput ? checkoutInput.value : '';

      var message = 'Hola, BNB HOST. Estoy interesado en este alojamiento: ' + property + '.';
      if (destination) message += ' Destino: ' + destination + '.';
      if (checkin) message += ' Fecha de entrada: ' + checkin + '.';
      if (checkout) message += ' Fecha de salida: ' + checkout + '.';
      message += ' Me gustaría conocer el precio y la disponibilidad.';

      var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  // AÑO AUTOMÁTICO
  var year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();
}());
