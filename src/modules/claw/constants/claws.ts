import type { Claw } from '../schemas/claws.schema';

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
    oddsData: {
      averageValue: 34,
      odds: {
        'ultra-rare': {
          percent: 0.56,
          value: 200,
        },
        'rare': {
          percent: 1.44,
          value: [100, 199],
        },
        'uncommon': {
          percent: 6.23,
          value: [61, 99],
        },
        'common': {
          percent: 24.38,
          value: [31, 60],
        },
        'base': {
          percent: 67.39,
          value: [17, 30],
        },
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
    oddsData: {
      averageValue: 56,
      odds: {
        'ultra-rare': {
          percent: 0.33,
          value: 751,
        },
        'rare': {
          percent: 0.65,
          value: [251, 750],
        },
        'uncommon': {
          percent: 4.58,
          value: [101, 250],
        },
        'common': {
          percent: 26.47,
          value: [51, 100],
        },
        'base': {
          percent: 67.97,
          value: [25, 50],
        },
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
    oddsData: {
      averageValue: 264,
      odds: {
        'ultra-rare': {
          percent: 0.11,
          value: 3501,
        },
        'rare': {
          percent: 0.65,
          value: [1001, 3500],
        },
        'uncommon': {
          percent: 5.29,
          value: [501, 1000],
        },
        'common': {
          percent: 24.65,
          value: [251, 500],
        },
        'base': {
          percent: 69.3,
          value: [141, 250],
        },
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
    oddsData: {
      averageValue: 518,
      odds: {
        'ultra-rare': {
          percent: 0.12,
          value: 8001,
        },
        'rare': {
          percent: 0.24,
          value: [5001, 8000],
        },
        'uncommon': {
          percent: 1.83,
          value: [1501, 5000],
        },
        'common': {
          percent: 28.33,
          value: [501, 1500],
        },
        'base': {
          percent: 69.48,
          value: [250, 500],
        },
      },
    },
    validations: {
      maxQuantity: 3,
    },
  },
];
