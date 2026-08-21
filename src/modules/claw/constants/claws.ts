import type { Claw } from '../schemas/claws';

export const claws: Claw[] = [
  {
    id: 'Wildcard-98',
    name: 'Wildcard',
    values: {
      price: 30,
      points: 30,
      swapRatePercentage: 85,
    },
    medias: {
      idleVideo: {
        url: '/claw/videos/idle/web.mp4',
        fallbackImageUrl: '/claw/videos/idle/fallback.webp',
      },
      boxIcon: {
        url: '/claw/crate-image/beezie30-crate.avif',
      },
    },
    validations: {
      maxQuantity: 10,
    },
  },
  {
    id: 'Silver-TCG-99',
    name: 'Silver TCG',
    values: {
      price: 50,
      points: 50,
      swapRatePercentage: 85,
    },
    medias: {
      idleVideo: {
        url: '/claw/videos/idle/web.mp4',
        fallbackImageUrl: '/claw/videos/idle/fallback.webp',
      },
      boxIcon: {
        url: '/claw/crate-image/beezie50-crate.avif',
      },
    },
    validations: {
      maxQuantity: 5,
    },
  },
  {
    id: 'Gold-TCG-100',
    name: 'Gold TCG',
    values: {
      price: 250,
      points: 250,
      swapRatePercentage: 90,
    },
    medias: {
      idleVideo: {
        url: '/claw/videos/idle/web.mp4',
        fallbackImageUrl: '/claw/videos/idle/fallback.webp',
      },
      boxIcon: {
        url: '/claw/crate-image/beezie250-crate.avif',
      },
    },
    validations: {
      maxQuantity: 3,
    },
  },
  {
    id: 'Platinum-TCG-101',
    name: 'Platinum TCG',
    values: {
      price: 500,
      points: 500,
      swapRatePercentage: 92,
    },
    medias: {
      idleVideo: {
        url: '/claw/videos/idle/web.mp4',
        fallbackImageUrl: '/claw/videos/idle/fallback.webp',
      },
      boxIcon: {
        url: '/claw/crate-image/beezie500-crate.avif',
      },
    },
    validations: {
      maxQuantity: 3,
    },
  },
];
