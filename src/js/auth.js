import { CONFIG } from './config.js';

export function initAuth() {
  const modal = document.getElementById('auth-modal');
  const openButtons = document.querySelectorAll('[data-auth-trigger]');
  const closeButtons = document.querySelectorAll('[data-auth-close]');
  const tabs = document.querySelectorAll('[data-auth-tab]');
  const forms = {
    signin: document.getElementById('auth-form-signin'),
    signup: document.getElementById('auth-form-signup'),
    reset: document.getElementById('auth-form-reset')
  };
  const statusBox = document.getElementById('auth-status-message');

  function openModal(initialTab = 'signin') {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    switchTab(initialTab);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    if (statusBox) statusBox.textContent = '';
  }

  function switchTab(tabKey) {
    tabs.forEach(tab => {
      const isActive = tab.dataset.authTab === tabKey;
      tab.classList.toggle('text-white', isActive);
      tab.classList.toggle('border-white', isActive);
      tab.classList.toggle('text-[#A3A3A3]', !isActive);
      tab.classList.toggle('border-transparent', !isActive);
    });

    Object.keys(forms).forEach(key => {
      if (forms[key]) {
        forms[key].classList.toggle('hidden', key !== tabKey);
      }
    });
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.dataset.authTrigger || 'signin';
      openModal(tab);
    });
  });

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.authTab));
  });

  // Client validation & Backend Integration contract
  Object.entries(forms).forEach(([key, form]) => {
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value;
      const endpoint = key === 'signin' ? CONFIG.ENDPOINTS.authSignIn :
                       key === 'signup' ? CONFIG.ENDPOINTS.authSignUp :
                       CONFIG.ENDPOINTS.authReset;

      if (statusBox) {
        statusBox.className = 'text-xs text-[#A3A3A3] mt-2 text-center';
        statusBox.textContent = `Connecting to ${endpoint}...`;
      }

      try {
        // Honest backend integration stub: Ready to connect to your OAuth/JWT server
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error('Authentication endpoint pending backend connection.');
      } catch (err) {
        if (statusBox) {
          statusBox.className = 'text-xs text-[#E5E5E5] bg-[#141414] border border-[#252525] p-2.5 rounded text-center mt-3';
          statusBox.textContent = `Endpoint ready: ${endpoint}. Connect your auth server.`;
        }
      }
    });
  });
}
