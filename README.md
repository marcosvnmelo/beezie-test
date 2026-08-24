# Beezie Claw Machine

Beezie is an interactive online claw-machine experience for pulling collectible trading-card items. The app presents a live claw machine, lets a player choose how many pulls to make, and takes them through payment, confirmation, reveal, and post-pull actions in one continuous flow.

## User Experience

The home route loads the default claw machine and redirects to its detail page. Each machine page includes the idle machine view, quantity controls, top items, and recent pulls in the same experience.

The pull flow is:

1. Select a quantity within the machine's limit and optionally enter a promotion code.
2. Click **Start now** to open the responsive **Review & pay** popup.
3. Choose a payment method and confirm the purchase.
4. Wait for the purchase confirmation, then watch the full-screen reveal animation.
5. Review the pulled item or items and continue to the available swap or completion action.

Single and multiple pulls use the same purchase flow, while the reveal experience can present one item or a collection depending on the selected quantity.

## Available Machines

The mock catalog currently includes:

- **Wildcard**: $30 per pull, up to 10 pulls
- **Silver TCG**: $50 per pull, up to 5 pulls
- **Gold TCG**: $250 per pull, up to 3 pulls
- **Platinum TCG**: $500 per pull

Machine configuration, pricing, odds, media, and quantity limits live in `src/modules/claw/constants/claws.ts`. Payment methods and recent-pull data are provided through the app's mock RPC routers.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 App Router
- React 19 and TypeScript
- TanStack Form and TanStack Query
- oRPC for typed client/server procedures
- Tailwind CSS and shadcn/ui primitives
- Local video and crate artwork in `public/claw`

## Local Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The project uses local mock data, so no external database or payment provider is required for the demo flow.

## Scripts

```bash
pnpm dev          # Start the development server
pnpm build        # Create a production build
pnpm start        # Serve the production build
pnpm lint         # Run ESLint
pnpm format       # Check formatting
pnpm format:write # Format the project
```
