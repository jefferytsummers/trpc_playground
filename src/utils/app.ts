export function delayedLog(message: string, delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(message);
        resolve();
      }, delay);
    });
  }