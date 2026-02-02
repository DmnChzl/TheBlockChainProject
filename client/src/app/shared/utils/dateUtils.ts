/**
 * Format a Date to dd/MM/yyyy
 *
 * @param {Date | number | string} value
 * @returns {string}
 */
export function formatDate(value: Date | number | string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) throw new Error('Not a Date');

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Format a Date to HH:mm
 *
 * @param {Date | number | string} value
 * @returns {string}
 */
export function formatTime(value: Date | number | string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) throw new Error('Not a Date');

  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Format a Date to dd/MM/yyyy at HH:mm
 *
 * @param {Date | number | string} value
 * @returns {string}
 */
export function formatDateTime(value: Date | number | string): string {
  const date = formatDate(value);
  const time = formatTime(value);
  return `${date} at ${time}`;
}

/**
 * Check if a Date is in the Past
 *
 * @param {Date | number | string} value
 * @returns {boolean}
 */
export function isBefore(value: Date | number | string): boolean {
  const date = new Date(value);
  if (isNaN(date.getTime())) throw new Error('Not a Date');
  return date < new Date();
}

/**
 * Check if a Date is in the Future
 *
 * @param {Date | number | string} value
 * @returns {boolean}
 */
export function isAfter(value: Date | number | string): boolean {
  const date = new Date(value);
  if (isNaN(date.getTime())) throw new Error('Not a Date');
  return date > new Date();
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

type DayOfWeek = (typeof DAYS)[number];

/**
 * Get Day of Week name
 *
 * @param {Date | number | string} value
 * @returns {DayOfWeek}
 */
export function getDayOfWeek(value: Date | number | string): DayOfWeek {
  const date = new Date(value);
  if (isNaN(date.getTime())) throw new Error('Not a Date');
  return DAYS[date.getDay()];
}
