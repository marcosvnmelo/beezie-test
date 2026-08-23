import { createRouterClient } from '@orpc/server';

import { router } from '@/router';

globalThis.$client = createRouterClient(router, {
  context: async () => {
    const { headers } = await import('next/headers');

    return {
      headers: await headers(),
    };
  },
});
