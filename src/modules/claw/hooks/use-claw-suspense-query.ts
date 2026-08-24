import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';

import { orpc } from '@/lib/orpc';

export function useClawSuspenseQuery() {
  const { id } = useParams<{ id: string }>();
  const { data } = useSuspenseQuery(orpc.claw.findById.queryOptions({ input: { id } }));

  return { claw: data };
}
