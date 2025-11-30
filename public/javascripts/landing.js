document.addEventListener('DOMContentLoaded', () => {
  initPromoSlideshow();
});

/**Functionality of the slideshow on the landing page.
 * Created for company to put promotions or other
 * important info on the landing page. Will cycle
 * automatically or user can check them manually
 * with buttons.
 */
function initPromoSlideshow() {
  const promos = document.querySelectorAll('.promo');
  const leftBtn = document.getElementById('left_button');
  const rightBtn = document.getElementById('right_button');
  //Something went wrong and elements couldn't be found
  if (!promos.length || !leftBtn || !rightBtn) return;

  let currentIndex = 0;
  //Only one promo found, no need to use cycling functionality
  if (promos.length <= 1) return;

  //Making sure only one promo visibile at a time.
  promos.forEach((promo, idx) => {
    if (idx !== 0) promo.classList.add('hidden');
  });

  //Promotion slideshow should move every 10 seconds.
  let interval = setInterval(showNextPromo, 10000);

  //If user wants to check promotions manually.
  leftBtn.addEventListener('click', () => {
    showPrevPromo();
    resetInterval();
  });

  leftBtn.addEventListener('keydown', (event) => {
    if(event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showPrevPromo();
      resetInterval();
    }
  })

  rightBtn.addEventListener('click', () => {
    showNextPromo();
    resetInterval();
  });

  rightBtn.addEventListener('keydown', (event) => {
    if(event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showPrevPromo();
      resetInterval();
    }
  })

  /**Necessary so if user decides to check promotions
   * manually, the timer for automatic slideshow cycle
   * will reset so the promotions slide doesn't change
   * suddenly after user manually changes slide.
   */
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
