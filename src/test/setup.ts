import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest';

import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());