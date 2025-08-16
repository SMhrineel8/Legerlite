import { defineConfig } from 'vite';

// Dynamically import the React plugin to avoid esbuild attempting to require an ESM-only package.
export default async function () {
  const react = (await import('@vitejs/plugin-react')).default;

  return defineConfig({
    plugins: [react()],
    server: {
      port: 5173,
    },
  });
}
