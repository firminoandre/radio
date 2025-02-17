// src/composables/useDebouncedFn.ts
export function useDebouncedFn(fn: (...args: any[]) => void, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
