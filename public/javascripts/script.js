document.addEventListener('DOMContentLoaded', () => {
  // ------------------- BURGER MENU -------------------
  initBurgerMenu();

  // ------------------- MENU TOGGLE -------------------
  initMenuToggle();

  // ------------------- STAR RATING -------------------
  initStarRating();

  // ------------------- COMMENTS RENDER -------------------
  renderComments();

  // ------------------- PROMO SLIDESHOW -------------------
  initPromoSlideshow();

  initTimeLineCarousel();
});

function initTimeLineCarousel() {
  const left_button = document.querySelector('.timeline_left');
  const right_button = document.querySelector('.timeline_right');
  const carousel = document.querySelector('.timeline_carosel');
  const items = document.querySelectorAll('.carosel_individual');

  if (!left_button || !right_button || !carousel || items.length === 0) return;

  let currentIndex = 0;
  let itemWidth;
  let gap = 30;
  let stepSize;

  function recalcDimensions() {
    itemWidth = items[0].offsetWidth;
    stepSize = itemWidth + gap;
    applyTransform();
  }

  function applyTransform() {
    carousel.style.transform = `translateX(${-currentIndex * stepSize}px)`;
  }

  function updateButtons() {
    // Reset both buttons (active state)
    left_button.style.backgroundColor = 'var(--saffron';
    right_button.style.backgroundColor = 'var(--saffron)';
    left_button.style.pointerEvents = 'auto';
    right_button.style.pointerEvents = 'auto';
    left_button.classList.remove('inactive');
    right_button.classList.remove('inactive');

    // Disable left
    if (currentIndex === 0) {
      left_button.style.backgroundColor = 'var(--cool-gray)';
      left_button.style.pointerEvents = 'none';
      left_button.classList.add('inactive');
    }

    // Disable right
    if (currentIndex === items.length - 1) {
      right_button.style.backgroundColor = 'var(--cool-gray)';
      right_button.style.pointerEvents = 'none';
      right_button.classList.add('inactive');
    }
  }

  left_button.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    applyTransform();
    updateButtons();
  });

  right_button.addEventListener('click', () => {
    if (currentIndex < items.length - 1) currentIndex++;
    applyTransform();
    updateButtons();
  });

  window.addEventListener('resize', recalcDimensions);

  recalcDimensions();
  updateButtons();
}



/***************************************************
 * BURGER MENU FUNCTIONS
 ***************************************************/
function initBurgerMenu() {
  const burgerMenu = document.querySelector('.burger');
  const slidingNav = document.querySelector('.sliding_nav_menu');
  const closeMenu = document.querySelector('.close');

  if (!burgerMenu || !slidingNav || !closeMenu) return;

  burgerMenu.addEventListener('click', () => slidingNav.classList.toggle('open'));
  closeMenu.addEventListener('click', () => slidingNav.classList.toggle('open'));
}

/***************************************************
 * MENU TOGGLE FUNCTIONS
 ***************************************************/
function initMenuToggle() {
  const menuSections = document.querySelectorAll('.menu_toggle');

  menuSections.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      if (!target) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      target.classList.toggle('hidden', isExpanded);
      btn.setAttribute('aria-expanded', String(!isExpanded));
      if (isExpanded) {
        btn.style.borderRadius = '20px';
      } else {
        btn.style.borderRadius = '20px 20px 0 0';
      }
    });
  });
}

/***************************************************
 * STAR RATING FUNCTIONS
 ***************************************************/
function initStarRating() {
  const starButtons = document.querySelectorAll('.rating_star');
  const ratingInput = document.getElementById('rating_input');
  if (!starButtons.length || !ratingInput) return;

  starButtons.forEach(star => {
    star.addEventListener('click', () => {
      updateStars(star, starButtons, ratingInput);
    });
    star.addEventListener('mouseover', () => hoverStars(star, starButtons));
    star.addEventListener('mouseout', () => resetStars(starButtons, ratingInput));
  });
}

function updateStars(target, allStars, ratingInput) {
  const maxStarFilled = Number(target.dataset.id);
  ratingInput.value = maxStarFilled;

  allStars.forEach(star => {
    const starPoly = star.querySelector('polygon');
    if (!starPoly) return;
    const starID = Number(star.dataset.id);

    if (starID <= maxStarFilled) {
      starPoly.setAttribute('fill', 'var(--saffron)');
      star.classList.add('selected');
    } else {
      starPoly.setAttribute('fill', 'none');
      star.classList.remove('selected');
    }
  });
}

function hoverStars(target, allStars) {
  const hoverID = Number(target.dataset.id);
  allStars.forEach(star => {
    const starPoly = star.querySelector('polygon');
    if (!starPoly) return;
    const starID = Number(star.dataset.id);

    if (starID <= hoverID) {
      starPoly.setAttribute('fill', 'var(--saffron)');
    }
  });
}

function resetStars(allStars, ratingInput) {
  const rating = Number(ratingInput.value) || 0;
  allStars.forEach(star => {
    const starPoly = star.querySelector('polygon');
    if (!starPoly) return;
    const starID = Number(star.dataset.id);

    if (starID <= rating) {
      starPoly.setAttribute('fill', 'var(--saffron)');
      star.classList.add('selected');
    } else {
      starPoly.setAttribute('fill', 'none');
      star.classList.remove('selected');
    }
  });
}

/***************************************************
 * COMMENTS RENDER FUNCTIONS
 ***************************************************/
function renderComments() {
  const commentList = document.querySelectorAll('.reviews');
  if (!commentList.length) return;

  commentList.forEach(span => {
    const firstName = span.dataset.first || '';
    const lastName = span.dataset.last || '';
    const reviewText = span.dataset.comment || '';
    const rating = Number(span.dataset.rating) || 0;
    const maxRating = 5;

    // Modern round star SVG
  const starSVGFull = `<svg viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.169L12 18.897l-7.334 3.864 1.4-8.169L.132 9.21l8.2-1.192z"/></svg>`;
  const starSVGEmpty = `<svg viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.169L12 18.897l-7.334 3.864 1.4-8.169L.132 9.21l8.2-1.192z" fill="none" stroke="var(--dark-green)" stroke-width="1"/></svg>`;


    let reviewHTML = `Customer: ${firstName} ${lastName}<br>Rating: `;
    for (let i = 1; i <= maxRating; i++) {
      reviewHTML += i <= rating ? starSVGFull : starSVGEmpty;
    }
    reviewHTML += `<br>Comment: ${reviewText}`;
    span.innerHTML = reviewHTML;
  });
}

/***************************************************
 * PROMO SLIDESHOW FUNCTIONS
 ***************************************************/
function initPromoSlideshow() {
  const promos = document.querySelectorAll('.promo');
  const leftBtn = document.getElementById('left_button');
  const rightBtn = document.getElementById('right_button');
  if (!promos.length || !leftBtn || !rightBtn) return;

  let currentIndex = 0;
  if (promos.length <= 1) return;

  // Hide all except first
  promos.forEach((promo, idx) => {
    if (idx !== 0) promo.classList.add('hidden');
  });

  let interval = setInterval(showNextPromo, 10000);

  leftBtn.addEventListener('click', () => {
    showPrevPromo();
    resetInterval();
  });

  rightBtn.addEventListener('click', () => {
    showNextPromo();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(showNextPromo, 10000);
  }

  function showNextPromo() {
    promos[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1) % promos.length;
    promos[currentIndex].classList.remove('hidden');
  }

  function showPrevPromo() {
    promos[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex - 1 + promos.length) % promos.length;
    promos[currentIndex].classList.remove('hidden');
  }
}
