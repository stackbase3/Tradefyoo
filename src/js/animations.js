export function initAnimations() {
  // Accordion logic for FAQ
  const accordionButtons = document.querySelectorAll('[data-accordion-btn]');
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      const content = button.nextElementSibling;
      const icon = button.querySelector('.accordion-icon');

      if (expanded) {
        content.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Interactive Demo Modal
  const demoModal = document.getElementById('demo-modal');
  const openDemoBtns = document.querySelectorAll('[data-demo-trigger]');
  const closeDemoBtns = document.querySelectorAll('[data-demo-close]');

  openDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal?.classList.remove('hidden');
      demoModal?.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  closeDemoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      demoModal?.classList.add('hidden');
      demoModal?.classList.remove('flex');
      document.body.style.overflow = '';
    });
  });
}
