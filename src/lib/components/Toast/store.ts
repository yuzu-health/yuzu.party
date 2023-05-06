import { writable } from 'svelte/store';

export type Toast = {
  id: number;
  type: string;
  message: string;
  timeout: number;
  onclick?: () => void;
  href?: string;
  class?: string;
};

export const toasts = writable([] as Toast[]);

export const add = (message: string, toast: Partial<Toast> = {}) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults = {
    id,
    type: 'info',
    timeout: 4000,
  };

  const newToast = { ...defaults, message, ...toast };

  // Implemented functionality in component
  // // dismiss it after "timeout" amount of time.
  // if (newToast.timeout) setTimeout(() => dismiss(id), newToast.timeout);

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [...all, newToast]);
};

export const dismiss = (id: number) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
