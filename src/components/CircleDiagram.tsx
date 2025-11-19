import React from 'react';
import type { DiagramItem } from '../types';
import {
  calculateCirclePosition,
  calculateTextPosition,
  calculateLargeCircleRadius
} from '../utils/geometry';
import {
  SVG_WIDTH,
  SVG_HEIGHT,
  LARGE_CIRCLE_RATIO,
  SMALL_CIRCLE_RATIO,
  LARGE_CIRCLE_COLOR,
  SMALL_CIRCLE_COLOR,
  TEXT_COLOR,
  CIRCLE_STROKE_WIDTH,
  CIRCLE_NUMBER_FONT_SIZE,
  LABEL_FONT_SIZE
} from '../constants';

interface CircleDiagramProps {
  items: DiagramItem[];
  width?: number;
  height?: number;
}

export const CircleDiagram: React.FC<CircleDiagramProps> = ({
  items,
  width = SVG_WIDTH,
  height = SVG_HEIGHT
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  
  const largeCircleRadius = calculateLargeCircleRadius(width, height, LARGE_CIRCLE_RATIO);
  
  const smallCircleRadius = (largeCircleRadius * 2 * SMALL_CIRCLE_RATIO) / 2;
  
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ border: '1px solid #e0e0e0' }}
    >
      <circle
        cx={centerX}
        cy={centerY}
        r={largeCircleRadius}
        fill="none"
        stroke={LARGE_CIRCLE_COLOR}
        strokeWidth={CIRCLE_STROKE_WIDTH}
      />
      
      {items.map((item, index) => {
        const circlePos = calculateCirclePosition(
          index,
          items.length,
          centerX,
          centerY,
          largeCircleRadius
        );
        
        const textPos = calculateTextPosition(
          circlePos.x,
          circlePos.y,
          circlePos.angle,
          smallCircleRadius
        );
        
        return (
          <g key={item.id}>
            <circle
              cx={circlePos.x}
              cy={circlePos.y}
              r={smallCircleRadius}
              fill={SMALL_CIRCLE_COLOR}
              stroke={LARGE_CIRCLE_COLOR}
              strokeWidth={CIRCLE_STROKE_WIDTH}
            />
            
            <text
              x={circlePos.x}
              y={circlePos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={CIRCLE_NUMBER_FONT_SIZE}
              fontWeight="bold"
            >
              {item.id}
            </text>
            
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor={textPos.anchor}
              dominantBaseline="middle"
              fill={TEXT_COLOR}
              fontSize={LABEL_FONT_SIZE}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
