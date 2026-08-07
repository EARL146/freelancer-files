// Common utility functions

/**
 * Formats a number with commas
 * @param num The number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats currency
 * @param amount The amount to format
 * @param currency The currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Truncates text to specified length
 * @param text The text to truncate
 * @param length The max length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Validates email format
 * @param email The email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function
 * @param func The function to throttle
 * @param limit The throttle limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Get current theme
 * @returns 'light' or 'dark'
 */
export const getCurrentTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

/**
 * Toggle theme
 */
export const toggleTheme = (): void => {
  if (typeof window === 'undefined') return;
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

/**
 * Parse cookie string
 * @param cookieString The cookie string to parse
 * @returns Object with cookie key-value pairs
 */
export const parseCookies = (cookieString: string): Record<string, string> => {
  return cookieString.split(';').reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.split('=').map((c) => c.trim());
      if (name) cookies[name] = decodeURIComponent(value || '');
      return cookies;
    },
    {} as Record<string, string>
  );
};
