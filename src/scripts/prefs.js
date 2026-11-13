// Preferências de acessibilidade do leitor: tamanho do texto, alto contraste e movimento.
// O valor inicial é aplicado por um script no <head> (antes da primeira renderização);
// aqui ficam os controles da página de acessibilidade e a persistência.
const KEY = 'a11y';
const root = document.documentElement;

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') || {};
  } catch {
    return {};
  }
};

const write = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
};

const systemDefaults = () => ({
  text: '100',
  contrast: matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal',
  motion: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'normal',
});

function apply(state) {
  root.dataset.text = state.text;
  if (state.contrast === 'high') root.dataset.contrast = 'high';
  else delete root.dataset.contrast;
  if (state.motion === 'reduce') root.dataset.motion = 'reduce';
  else delete root.dataset.motion;
}

function setup() {
  const form = document.querySelector('[data-prefs]');
  if (!form) return;
  const status = form.querySelector('[data-prefs-status]');
  const say = (key) => {
    if (status) status.textContent = form.dataset[key] || '';
  };

  const sync = () => {
    const text = form.querySelector(`input[name="text"][value="${root.dataset.text || '100'}"]`);
    if (text) text.checked = true;
    form.elements.contrast.checked = root.dataset.contrast === 'high';
    form.elements.motion.checked = root.dataset.motion === 'reduce';
  };
  sync();

  form.addEventListener('change', () => {
    const state = {
      text: form.querySelector('input[name="text"]:checked')?.value || '100',
      contrast: form.elements.contrast.checked ? 'high' : 'normal',
      motion: form.elements.motion.checked ? 'reduce' : 'normal',
    };
    apply(state);
    write(state);
    say('msgSaved');
  });

  form.querySelector('[data-prefs-reset]')?.addEventListener('click', () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    apply(systemDefaults());
    sync();
    say('msgReset');
  });
}

function setupLibras() {
  const button = document.querySelector('[data-vlibras]');
  if (!button) return;
  const status = document.querySelector('[data-vlibras-status]');
  const say = (key) => {
    if (status) status.textContent = button.dataset[key] || '';
  };

  if (window.VLibras) {
    button.disabled = true;
    say('msgOn');
    return;
  }

  button.addEventListener('click', () => {
    button.disabled = true;
    say('msgLoading');
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => say('msgOn');
    script.onerror = () => {
      button.disabled = false;
      say('msgError');
    };
    document.head.appendChild(script);
  });
}

document.addEventListener('astro:page-load', () => {
  setup();
  setupLibras();
});
