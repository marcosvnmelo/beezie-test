'use client';

import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ClawCardErrorBoundary(props: React.PropsWithChildren) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>{props.children}</ErrorBoundary>
  );
}

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  console.error(error);

  return (
    <Card className="border border-destructive">
      <CardHeader>
        <CardTitle className="text-xl leading-7 font-semibold md:text-2xl md:leading-8">
          Something went wrong
        </CardTitle>
        <CardDescription className="hidden md:block">
          Try the refresh button or reload the page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={resetErrorBoundary}>
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}
