export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateStr);
  return Math.ceil((target - today) / 86400000);
}

// 'ok' | 'warn' | 'danger' — used to color the MHD badge
export function mhdStatus(dateStr, warnDays = 7) {
  const d = daysUntil(dateStr);
  if (d === null) return 'ok';
  if (d < 0) return 'danger';
  if (d <= warnDays) return 'warn';
  return 'ok';
}

export function escapeHTML(str = '') {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}
