document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger');
  const slidingNav = document.querySelector('.sliding_nav_menu');
  const closeMenu = document.querySelector('.close');
  const menuSection = document.querySelectorAll('.menu_toggle');

  burgerMenu.addEventListener('click', () => {
    slidingNav.classList.toggle('open');
  });

  closeMenu.addEventListener('click', () => {
    slidingNav.classList.toggle('open');
  });

  menuSection.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const target = document.getElementById(targetId);

      if (!target) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Toggle visibility
      target.classList.toggle('hidden', isExpanded);

      // Update ARIA
      btn.setAttribute('aria-expanded', String(!isExpanded));
    });
  });

  const commentList = document.querySelectorAll('.reviews');

  commentList.forEach(span => {
    const firstName = span.dataset.first;
    const lastName = span.dataset.last;
    const reviewText = span.dataset.comment;
    const rating = Number(span.dataset.rating);
    const maxRating = 5;

    const starSVGFull = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <polygon points="15,0 18,10 29,10 20,18 23,29 15,22 7,29 10,18 1,10 12,10"
                 fill="gold" stroke="black" stroke-width="1" />
      </svg>
    `;
    const starSVGEmpty = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <polygon points="15,0 18,10 29,10 20,18 23,29 15,22 7,29 10,18 1,10 12,10"
                 fill="none" stroke="black" stroke-width="1" />
      </svg>
    `;

    let reviewHTML = `Customer: ${firstName} ${lastName}<br>Rating: `;

    for (let i = 1; i <= maxRating; i++) {
      reviewHTML += i <= rating ? starSVGFull : starSVGEmpty;
    }

    reviewHTML += `<br>Comment: ${reviewText}`;

    span.innerHTML = reviewHTML;
  });
  
  /*************************************************** */
  const promos = document.querySelectorAll('.promo');
  let currentIndex = 0;

  if (promos.length <= 1) return;

  // Hide all except first
  promos.forEach((promo, idx) => {
    if (idx !== 0) promo.classList.add('hidden');
  });

  setInterval(() => {
    
    promos[currentIndex].classList.add('hidden');
    if (currentIndex === promos.length - 1) currentIndex = -1;
    currentIndex = (currentIndex + 1) % promos.length;
    promos[currentIndex].classList.remove('hidden');
  }, 10000);

});

function toggleStar(target) {
  const starButtons = document.querySelectorAll('.rating_star');
  const maxStarFilled = Number(target.dataset.id);
  const ratingInput = document.getElementById('rating_input');

  // store the selected rating
  ratingInput.value = maxStarFilled;

  // update the fill for each star
  starButtons.forEach(star => {
    const starPoly = star.querySelector('polygon');
    if(!starPoly) return;

    const starID = Number(star.dataset.id);

    if(starID <= maxStarFilled) {
      starPoly.setAttribute('fill', 'gold');
    } else {
      starPoly.setAttribute('fill', 'none');
    }
  });
};
