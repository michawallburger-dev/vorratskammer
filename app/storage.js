import { state } from './state.js';

const KEYS = {
  PRODUCTS: 'vk_products',
  SETTINGS: 'vk_settings'
};

export function load() {
  state.products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
  state.settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
}

export function saveProducts() {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(state.products));
}