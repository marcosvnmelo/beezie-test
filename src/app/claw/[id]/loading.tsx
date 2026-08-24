import { LoaderCircleIcon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-(--spacing(16)))] items-center justify-center md:h-[calc(100vh-(--spacing(20)))]">
      <LoaderCircleIcon className="size-10 animate-spin text-primary" />
    </div>
  );
}
