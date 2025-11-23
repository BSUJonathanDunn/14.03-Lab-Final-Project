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
});
