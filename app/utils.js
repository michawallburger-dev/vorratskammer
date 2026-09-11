export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;

  const today = new Date();
  today.setHours(0,0,0,0);

  const target = new Date(dateStr);
  return Math.ceil((target - today) / 86400000);
}

export function escapeHTML(str = '') {
  return str.replace(/[&<>"']/g, m => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[m]));
}