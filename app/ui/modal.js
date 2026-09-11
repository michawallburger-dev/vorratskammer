import { state } from '../state.js';
import { saveProducts } from '../storage.js';
import { uid } from '../utils.js';
import { renderList } from './render.js';

export function saveProductFromForm() {
  const name = document.getElementById('f-name').value.trim();
  if (!name) return;

  const product = {
    id: state.editingId || uid(),
    name,
    mhd: document.getElementById('f-mhd').value
  };

  if (state.editingId) {
    const i = state.products.findIndex(p => p.id === state.editingId);
    state.products[i] = product;
  } else {
    state.products.push(product);
  }

  saveProducts();
  renderList();
  closeModal();
}

export function closeModal() {
  document.getElementById('add-modal')?.classList.remove('open');
}