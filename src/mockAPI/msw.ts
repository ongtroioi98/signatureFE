export async function initMockServiceWorker() {
  if (typeof window === 'undefined') return;

  const { worker } = await import('./browser');
  await worker.start();
}