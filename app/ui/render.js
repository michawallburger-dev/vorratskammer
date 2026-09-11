import { state } from '../state.js';
import { daysUntil, mhdStatus, escapeHTML } from '../utils.js';
import { saveLocationState } from '../storage.js';

export function renderList() {
  const list = getFilteredProducts();
  const el = document.getElementById('product-list');

  updateStats();

  if (!list.length) {
    el.innerHTML = `<div class="empty-state">Noch leer</div>`;
    return;
  }

  const groups = groupByLocation(list);
  let keys = sortLocations(Object.keys(groups));

  keys.forEach(k => {
    if (!state.locationOrder.includes(k)) state.locationOrder.push(k);
  });

  saveLocationState();

  el.innerHTML = keys.map(k => renderSection(k, groups[k])).join('');
}

function updateStats() {
  const warnDays = parseInt(state.settings.warnDays || 7);

  document.getElementById('stat-total').textContent = state.products.length;
  document.getElementById('stat-frozen').textContent = state.products.filter(p => p.frozen).length;
  document.getElementById('stat-soon').textContent =
    state.products.filter(p => {
      const d = daysUntil(p.mhd);
      return d !== null && d >= 0 && d <= warnDays;
    }).length;

  document.getElementById('stat-expired').textContent =
    state.products.filter(p => {
      const d = daysUntil(p.mhd);
      return d !== null && d < 0;
    }).length;
}

function groupByLocation(list) {
  const groups = {};
  list.forEach(p => {
    const key = p.location || 'Sonstiges';
    (groups[key] ||= []).push(p);
  });
  return groups;
}

function sortLocations(keys) {
  return keys.sort((a, b) => {
    const ia = state.locationOrder.indexOf(a);
    const ib = state.locationOrder.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

function renderSection(name, items) {
  const collapsed = state.collapsedSections[name];

  return `
    <div class="location-section">
      <div class="location-header" data-section="${name}">
        ${name} (${items.length}) ${collapsed ? '▶️' : '▼'}
      </div>
      <div style="display:${collapsed ? 'none' : 'block'}">
        ${items.map(renderCard).join('')}
      </div>
    </div>
  `;
}

function renderCard(p) {
  const warnDays = parseInt(state.settings.warnDays || 7);
  const status = mhdStatus(p.mhd, warnDays);

  return `
    <div class="product-card">
      <div class="product-name">${escapeHTML(p.name)}</div>
      <div>${formatMHD(p.mhd)}</div>
      <button data-edit="${p.id}">✏️</button>
      <button data-delete="${p.id}">🗑️</button>
    </div>
  `;
}

function formatMHD(dateStr) {
  const d = daysUntil(dateStr);
  if (d === null) return '';
  if (d < 0) return '⚠️ Abgelaufen';
  if (d === 0) return 'Heute';
  if (d === 1) return 'Morgen';
  return `in ${d} Tagen`;
}

function getFilteredProducts() {
  const q = document.getElementById('search-input')?.value.toLowerCase() || '';

  return state.products.filter(p => {
    if (!q) return true;
    return p.name.toLowerCase().includes(q);
  });
}