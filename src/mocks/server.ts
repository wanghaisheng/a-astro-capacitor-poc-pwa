import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// Start the server when the module is imported
server.listen({ onUnhandledRequest: 'bypass' });
