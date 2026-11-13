// Menu da barra superior (telas estreitas). Devolve a função que remove os ouvintes.
export function setupNav() {
  const rail = document.querySelector('[data-rail]');
  const button = document.querySelector('[data-menu-button]');
  if (!rail || !button) return;

  const setOpen = (open) => {
    rail.dataset.open = String(open);
    button.setAttribute('aria-expanded', String(open));
  };
  const onClick = () => setOpen(button.getAttribute('aria-expanded') !== 'true');
  const onKeydown = (e) => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  };

  button.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  return () => {
    button.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeydown);
  };
}
