export function setupNav() {
  const navButton = document.querySelector('.navbar-icon-button');
  const navMenu = document.querySelector('.w-nav-menu');

  if (!navButton || !navMenu) return;

  const setOpen = (open) => {
    navButton.setAttribute('aria-expanded', String(open));
    navButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navMenu.classList.toggle('is-visible', open);
    setTimeout(() => navMenu.classList.toggle('is-open', open), open ? 10 : 300);
  };

  const toggleNav = () => setOpen(navButton.getAttribute('aria-expanded') !== 'true');
  const onKeydown = (e) => {
    if (e.key === 'Escape' && navButton.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      navButton.focus();
    }
  };

  navButton.addEventListener('click', toggleNav);
  document.addEventListener('keydown', onKeydown);
  return () => {
    navButton.removeEventListener('click', toggleNav);
    document.removeEventListener('keydown', onKeydown);
  };
}
