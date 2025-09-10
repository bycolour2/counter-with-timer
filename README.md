# React Counter Application

A configurable React counter application with dynamic button cooldowns and auto-decreasing functionality.

## Features

- Counter starts at 0 and can be increased by clicking buttons with different values
- Each button has a configurable cooldown period after being clicked
- Counter automatically decreases after a period of inactivity
- Fully configurable parameters:
  - Button values and labels
  - Cooldown multiplier
  - Inactivity delay before decreasing
  - Decrease interval

## Default Configuration

- Three buttons with increasing values: 1, 2, and 3
- Button cooldown: 0.5 × button value (in seconds)
  - Button with value 1: disabled for 0.5s after clicking
  - Button with value 2: disabled for 1s after clicking
  - Button with value 3: disabled for 1.5s after clicking
- Inactivity timer: 10 seconds before counter starts decreasing
- Decrease rate: 1 per second until reaching 0

## Technologies Used

- React 19
- TypeScript
- Vite
- ESLint
- Prettier
- Lucide icon library
- TailwindCSS
- Shadcn components

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/test-hystax.git
   cd test-hystax
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

- Click on the buttons to increase the counter
- After clicking, buttons will be disabled for their respective cooldown periods
- If no button is clicked for 10 seconds, the counter will start decreasing
- The counter will stop decreasing once it reaches 0
- Use the configuration panel to customize the counter behavior

## Building for Production

```bash
npm run build
# or
pnpm build
```

## License

MIT
