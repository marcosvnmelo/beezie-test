import type { RouterClient } from '@orpc/server';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';

import type { router } from '@/router';

if (import.meta.env.SSR) {
  await import('./orpc.server');
}

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

const link = new RPCLink({
  url: '/rpc',
  origin: () => {
    if (typeof window === 'undefined') {
      throw new Error('This link is not allowed on the server side.');
    }

    return window.location.origin;
  },
});

export const client: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
