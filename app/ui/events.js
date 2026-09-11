import { renderList } from './render.js';
import { state } from '../state.js';

export function initEvents() {
  document.getElementById('nav-home')
    ?.addEventListener('click', () => switchView('home'));

  document.getElementById('search-input')
    ?.addEventListener('input', debounce(renderList, 200));
}

function switchView(view) {
  state.currentView = view;

  document.querySelectorAll('.view')
    .forEach(v => v.classList.remove('active'));

  document.getElementById(`${view}-view`)
    ?.classList.add('active');
}

function debounce(fn, delay) {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(fn, delay);
  };
}