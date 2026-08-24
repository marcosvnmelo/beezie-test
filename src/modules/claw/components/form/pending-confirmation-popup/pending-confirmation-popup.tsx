import { useEffect, useState } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { LoaderCircleIcon } from 'lucide-react';

import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { clawFormOpts } from '@/modules/claw/constants/claw-form-options';
import { withClawForm } from '@/modules/claw/hooks/use-claw-form';
import { ClawFormSubmitAction } from '@/modules/claw/schemas/claw-form.schema';

import { ResponsivePopup } from '../shared/responsive-popup';

const IMAGE_COUNT = 5;

export const PendingConfirmationPopup = withClawForm({
  ...clawFormOpts,
  render: function Render({ form }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (!api) {
        return;
      }

      setCurrent(api.selectedScrollSnap() + 1);

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    return (
      <ResponsivePopup
        title="What you can pull"
        titleClassName={cn('text-lg leading-4 font-semibold')}
        onClose={() =>
          form.handleSubmit({
            submitAction: ClawFormSubmitAction.ClosePaymentReview,
          })
        }
        dialogContentClassName={cn('sm:max-w-120')}
      >
        <div className="flex flex-col items-center gap-10 p-6">
          <div className="flex flex-col items-center gap-2">
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4 * 1000,
                }),
              ]}
              className="pointer-events-none w-full sm:max-w-xs"
            >
              <CarouselContent>
                {Array.from({ length: IMAGE_COUNT }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="px-6">
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={`/claw/pending-confirmation-carousel/${index + 1}.jpg`}
                          alt=""
                          width={300}
                          height={300}
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="flex items-center gap-2">
              {Array.from({ length: IMAGE_COUNT }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'size-1.5 rounded-full bg-muted-foreground data-[current=true]:w-10 data-[current=true]:bg-white',
                    'transition-[background-color,width] duration-300 ease-in',
                  )}
                  data-current={index + 1 === current}
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              'flex h-12 w-full items-center justify-center gap-2',
              'rounded-md bg-primary font-extrabold text-primary-foreground',
              'relative isolate',
            )}
          >
            <div className="absolute inset-0 flex">
              <div
                className={cn(
                  'h-full animate-width-loading bg-background/20 transition-[width]',
                )}
              />
            </div>
            <LoaderCircleIcon className="size-5 animate-spin" />
            Do Not Refresh
          </div>
        </div>
      </ResponsivePopup>
    );
  },
});
