const buildLabel = document.querySelector<HTMLElement>('[data-build]');
if (buildLabel) {
  buildLabel.textContent = import.meta.env.VITE_COMMIT_SHA || 'local';
}
