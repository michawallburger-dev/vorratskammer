import { load } from './storage.js';
import { initEvents } from './ui/events.js';
import { renderList } from './ui/render.js';

function init() {
  load();
  initEvents();
  renderList();
}

init();