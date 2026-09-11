import { state } from '../state.js';
import { escapeHTML, daysUntil } from '../utils.js';

export function renderList() {
  const el = document.getElementById('product-list');

  if (!state.products.length) {
    el.innerHTML = `<div class="empty-state">Noch leer</div>`;
    return;
  }

  el.innerHTML = state.products.map(renderCard).join('');
}

function renderCard(p) {
  return `
    <div class="product-card">
      <div class="product-name">${escapeHTML(p.name)}</div>
      <div>${formatMHD(p.mhd)}</div>
    </div>
  `;
}

function formatMHD(dateStr) {
  const d = daysUntil(dateStr);
  if (d === null) return '';
  if (d < 0) return '⚠️ Abgelaufen';
  if (d === 0) return 'Heute';
  return `in ${d} Tagen`;
}