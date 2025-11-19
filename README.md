# Circle Diagram

A React + TypeScript + SVG circular diagram that automatically positions circles and text labels.

![Circle Diagram Demo](./demo-screenshot.png)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the demo.

## What It Does

- Evenly distributes 2-9 circles around a main circle
- Numbers each circle starting from the top
- Automatically aligns text labels (left or right based on position)
- Fixed 1920x1080 canvas size

## Project Structure

```
src/
├── components/
│   └── CircleDiagram.tsx      # Main SVG component
├── utils/
│   └── geometry.ts            # Positioning calculations
├── types.ts                   # TypeScript interfaces
├── constants.ts               # Configuration
└── App.tsx                    # Demo UI
```

## Customization

Edit `src/constants.ts` to change:
- Canvas dimensions
- Circle sizes and colors
- Font sizes
- Text spacing

## Features

✅ React + TypeScript + SVG  
✅ 1920x1080 fixed canvas  
✅ 2-9 circles supported  
✅ Smart text alignment  
✅ Clean, documented code
