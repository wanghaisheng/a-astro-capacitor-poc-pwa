import { server } from './server';

// This sets up the mock server when the module is imported
if (import.meta.env.DEV) {
  server.listen({ onUnhandledRequest: 'bypass' });
}
