// Alternador de tema: o valor inicial é definido por um script em linha no <head>
// (para não piscar); aqui só ficam o clique, a persistência e os rótulos.
const root = document.documentElement;

function syncButtons() {
  const dark = root.dataset.theme === 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const label = button.querySelector('[data-theme-label]');
    if (label) label.textContent = dark ? button.dataset.labelDark : button.dataset.labelLight;
    const hint = button.querySelector('[data-theme-hint]');
    if (hint) hint.textContent = '. ' + (dark ? button.dataset.ariaToLight : button.dataset.ariaToDark);
  });
}

document.addEventListener('click', (event) => {
  const button = event.target instanceof Element ? event.target.closest('[data-theme-toggle]') : null;
  if (!button) return;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {}
  syncButtons();
  document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
});

document.addEventListener('astro:page-load', syncButtons);
syncButtons();
