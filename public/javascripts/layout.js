document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
});

//Used for burger menu functionality
function initBurgerMenu() {
  const burgerMenu = document.querySelector('.burger');
  const slidingNav = document.querySelector('.sliding_nav_menu');
  const closeMenu = document.querySelector('.close');

  //Something went wrong and couldn't find given elements
  if (!burgerMenu || !slidingNav || !closeMenu) return;

  function toggleMenu() {
    const isOpen = slidingNav.classList.toggle('open');
    burgerMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    closeMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  burgerMenu.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', toggleMenu);
}
