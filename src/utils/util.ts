export function unwrap<T>(value: T | null | undefined, errorMessage?: string): T {
    if (value === null || value === undefined) {
      throw new Error(errorMessage || 'Unwrapped value is null or undefined');
    }
    return value;
  }