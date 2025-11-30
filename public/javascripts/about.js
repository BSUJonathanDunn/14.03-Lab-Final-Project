document.addEventListener('DOMContentLoaded', () => {
  initTimeLineCarousel();
});

/**Handles the functionality of the carousel in the timeline page
 * Handles dimension changes, movement of carousel items, button
 * functionality.
 */
function initTimeLineCarousel() {
  const left_button = document.querySelector('.timeline_left');
  const right_button = document.querySelector('.timeline_right');
  const carousel = document.querySelector('.timeline_carosel');
  const items = document.querySelectorAll('.carosel_individual');

  //If for some reason can't find the elements above, stop the function.
  if (!left_button || !right_button || !carousel || items.length === 0) return;

  let currentIndex = 0;
  let itemWidth;
  let gap = 30;
  let stepSize;

  //Written so if dimensions of timeline items are changed, correct movement will be retained.
  function recalcDimensions() {
    itemWidth = items[0].offsetWidth;
    stepSize = itemWidth + gap;
    applyTransform();
  }

  //Actual carousel movement
  function applyTransform() {
    carousel.style.transform = `translateX(${-currentIndex * stepSize}px)`;
  }

  //Checks to see if user is at the beginning/end of timeline and update buttons accordingly.
  function updateButtons() {
    left_button.style.backgroundColor = 'var(--saffron';
    right_button.style.backgroundColor = 'var(--saffron)';
    left_button.style.pointerEvents = 'auto';
    right_button.style.pointerEvents = 'auto';
    left_button.classList.remove('inactive');
    right_button.classList.remove('inactive');

    if (currentIndex === 0) {
      left_button.style.backgroundColor = 'var(--cool-gray)';
      left_button.style.pointerEvents = 'none';
      left_button.classList.add('inactive');
    }

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

  left_button.addEventListener('keydown', (event) => {
    if(event.key === "Enter" || event.key === " ") {
      if(currentIndex > 0) currentIndex--;
      applyTransform();
      updateButtons();
    }
  })

  right_button.addEventListener('click', () => {
    if (currentIndex < items.length - 1) currentIndex++;
    applyTransform();
    updateButtons();
  });

  right_button.addEventListener('keydown', (event) => {
    if(event.key === "Enter" || event.key === " ") {
      if (currentIndex < items.length - 1) currentIndex++;
      applyTransform();
      updateButtons();
    }
  })

  //If user resizes window or a phone is used for webpage
  window.addEventListener('resize', recalcDimensions);

  recalcDimensions();
  updateButtons();
}