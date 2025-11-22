document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger');
  const slidingNav = document.querySelector('.sliding_nav_menu');
  const closeMenu = document.querySelector('.close');

  burgerMenu.addEventListener('click', () => {
    slidingNav.classList.toggle('open');
  });

  closeMenu.addEventListener('click', () => {
    slidingNav.classList.toggle('open');
  });
});
