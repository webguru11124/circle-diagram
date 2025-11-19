# Circle Diagram - Zapdeck Case Study

A React + TypeScript + SVG implementation of an intelligent circular diagram layout system that automatically positions circles and text labels with smart alignment rules.

![Circle Diagram Demo](./demo-screenshot.png)

## 🎯 Overview

This project demonstrates a scalable solution for rendering complex circular diagrams where:
- Multiple items (2-9) are evenly distributed around a circle's circumference
- Each item has a numbered circle and text label
- Text labels intelligently align based on their radial position
- The entire diagram scales within a fixed 1920x1080 canvas

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or pnpm

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view the interactive demo.

## 📐 Geometric Strategy

### Circle Positioning

The core geometric algorithm uses polar coordinates to evenly distribute circles:

1. **Angle Calculation**: Each circle is positioned at angle `θ = (i / n) × 2π - π/2`
   - `i` = circle index (0-based)
   - `n` = total number of circles
   - `-π/2` offset starts positioning at top (12 o'clock) instead of right (3 o'clock)

2. **Cartesian Conversion**: Convert polar to cartesian coordinates
   - `x = centerX + radius × cos(θ)`
   - `y = centerY + radius × sin(θ)`

3. **Circle Sizing**:
   - Large circle radius = 60% of `min(width, height)` ÷ 2 (provides padding)
   - Small circle diameter = Large circle diameter ÷ 4 (25% ratio as specified)

### Text Placement Rule

Labels are positioned using a **quadrant-based alignment strategy**:

**Right Side (315° → 135° clockwise)**
- Text positioned **right** of the circle
- `text-anchor="start"` (text grows rightward from anchor)
- Horizontal offset: `+smallCircleRadius + 20px`

**Left Side (135° → 315° clockwise)**
- Text positioned **left** of the circle  
- `text-anchor="end"` (text grows leftward from anchor)
- Horizontal offset: `-smallCircleRadius - 20px`

This creates intuitive reading patterns where:
- Top-right to bottom-right labels flow rightward
- Top-left to bottom-left labels flow leftward
- Vertical centering uses `dominant-baseline="middle"`

### Why This Approach?

**Advantages:**
- ✅ Simple, deterministic positioning (no collision detection needed)
- ✅ Works reliably for 2-9 circles (specified range)
- ✅ Consistent visual rhythm with evenly-spaced items
- ✅ Readable text alignment following natural eye movement

**Limitations:**
- ⚠️ No collision avoidance for overlapping labels
- ⚠️ May have readability issues with 10+ circles or very long labels
- ⚠️ Fixed canvas size (1920x1080) - no dynamic responsiveness

For production use with variable label lengths or higher circle counts, consider:
- Dynamic label wrapping
- Force-directed layout algorithms
- Adaptive text sizing based on available space

## 🏗️ Architecture

### Project Structure

```
src/
├── components/
│   └── CircleDiagram.tsx      # Main SVG rendering component
├── utils/
│   └── geometry.ts            # Pure math functions for positioning
├── types.ts                   # TypeScript interfaces
├── constants.ts               # Configuration values
├── App.tsx                    # Demo UI with interactive controls
├── App.css                    # UI styling
└── main.tsx                   # React entry point
```

### Component Breakdown

**CircleDiagram.tsx** (Main Component)
- Props: `items`, `width`, `height`
- Calculates circle and text positions using geometry utilities
- Renders SVG with large circle, small circles, numbers, and labels
- Pure component (no internal state)

**geometry.ts** (Utilities)
- `calculateCirclePosition()` - Polar to cartesian conversion
- `calculateTextAnchor()` - Determines text alignment
- `calculateTextPosition()` - Calculates label coordinates
- `calculateLargeCircleRadius()` - Responsive sizing logic
- All pure functions (easily testable)

**App.tsx** (Demo)
- Interactive controls: circle count slider (2-9)
- Toggle between short and long label sets
- Example data demonstrating various scenarios

### Key Design Decisions

1. **Separation of Concerns**
   - Geometry logic isolated in pure functions
   - Component focused on rendering
   - Easy to unit test mathematical correctness

2. **Fixed Canvas Size**
   - Specified requirement: 1920x1080
   - Simplifies calculations (no viewport-relative sizing)
   - Suitable for slide generation use case

3. **No External Dependencies**
   - Pure TypeScript/React implementation
   - No charting libraries (d3, recharts, etc.)
   - Minimal bundle size

4. **TypeScript First**
   - Strong typing for all interfaces
   - Compile-time safety
   - Better IDE autocomplete

## 🎨 Customization

### Adjusting Appearance

Edit `src/constants.ts` to change:
- Canvas dimensions: `SVG_WIDTH`, `SVG_HEIGHT`
- Circle sizing ratios: `LARGE_CIRCLE_RATIO`, `SMALL_CIRCLE_RATIO`
- Colors: `LARGE_CIRCLE_COLOR`, `SMALL_CIRCLE_COLOR`, `TEXT_COLOR`
- Font sizes: `CIRCLE_NUMBER_FONT_SIZE`, `LABEL_FONT_SIZE`
- Text spacing: `TEXT_OFFSET`

### Adding More Items

The demo supports 2-9 circles. To extend:

1. Add more labels to `shortLabels` and `longLabels` arrays in `App.tsx`
2. Adjust max value in range input: `max="12"` (or desired count)
3. Consider adding collision detection for 10+ items

## 🧪 Testing Scenarios

The interactive demo allows testing:

✅ **Edge Cases**
- Minimum circles (2): Labels at 12 and 6 o'clock
- Maximum circles (9): Dense distribution
- Transition points (around 135° and 315°)

✅ **Label Variations**
- Short labels: Single-line readability
- Long labels: Multi-word text flow

✅ **Visual Verification**
- Even spacing around circumference
- Proper text alignment (left vs right)
- Numbers centered in circles
- No overlapping circles

## 🔄 Trade-offs & Future Improvements

### Current Trade-offs

**Fixed Sizing**
- ✅ Pros: Simple, predictable, matches slide format
- ⚠️ Cons: Not responsive to viewport changes
- 💡 Future: Add viewport scaling with `preserveAspectRatio`

**Simple Text Placement**
- ✅ Pros: Fast, deterministic, clean code
- ⚠️ Cons: Can overlap with many items
- 💡 Future: Implement label collision detection/adjustment

**No Animation**
- ✅ Pros: Suitable for static slides (requirement)
- ⚠️ Cons: Less engaging for web use
- 💡 Future: Add transitions for count changes

### Potential Enhancements

1. **Smart Label Layout**
   - Detect overlaps using bounding box calculations
   - Adjust vertical positions when labels collide
   - Use leader lines for crowded diagrams

2. **Responsive Scaling**
   - Scale diagram to fit any container
   - Maintain aspect ratio
   - Adjust font sizes proportionally

3. **Export Functionality**
   - SVG download
   - PNG/PDF generation
   - Copy to clipboard

4. **Accessibility**
   - ARIA labels for screen readers
   - Keyboard navigation
   - High contrast mode

5. **Advanced Styling**
   - Custom themes/color schemes
   - Gradient fills
   - Shadow effects

## 🧮 Mathematical Details

### Angle Normalization

Angles are normalized to 0-360° range:
```typescript
let angle = ((angleInRadians * 180) / Math.PI + 360) % 360;
```

### Quadrant Detection

Text anchor decision uses inclusive boundaries:
```typescript
if (angle >= 315 || angle <= 135) return 'start';  // Right side
return 'end';  // Left side
```

This creates wider "right" zone (180° span) vs "left" zone (180° span) with transitions at diagonal positions.

### Circle Center Alignment

Small circles are centered ON the circumference line (not inside/outside):
- Circle center positioned at exact polar coordinate
- Creates clean, professional appearance
- Maintains consistent spacing

## 📝 Technical Requirements Met

✅ React + TypeScript + SVG (no chart libraries)  
✅ Fixed 1920x1080 canvas  
✅ Supports 2-9 circles  
✅ Even distribution around circumference  
✅ Small circles = 1/4 large circle diameter  
✅ Clockwise numbering starting from top  
✅ Intelligent text alignment based on position  
✅ No interactivity (hover, click) - slide-ready  
✅ Clean, readable, documented code  

## 📄 License

This is a case study project for Zapdeck hiring process.

## 👤 Author

Candidate submission for Zapdeck CTO/CEO review.

---

**For follow-up discussion**: Prepared to explain geometric calculations, discuss scaling strategies, and explore alternative layout approaches.
