import type { CirclePosition, TextPosition } from '../types';
import { TEXT_OFFSET } from '../constants';

export function calculateCirclePosition(
  index: number,
  total: number,
  centerX: number,
  centerY: number,
  radius: number
): CirclePosition {
  const angleInRadians = (index / total) * 2 * Math.PI - Math.PI / 2;
  
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);
  
  const angleInDegrees = ((angleInRadians * 180) / Math.PI + 360) % 360;
  
  return { x, y, angle: angleInDegrees };
}

export function calculateTextAnchor(angle: number): 'start' | 'end' {
  if (angle >= 315 || angle <= 135) {
    return 'start';
  }
  return 'end';
}

export function calculateTextPosition(
  circleX: number,
  circleY: number,
  angle: number,
  smallCircleRadius: number
): TextPosition {
  const anchor = calculateTextAnchor(angle);
  
  const horizontalOffset = smallCircleRadius + TEXT_OFFSET;
  const offsetX = anchor === 'start' ? horizontalOffset : -horizontalOffset;
  
  return {
    x: circleX + offsetX,
    y: circleY,
    anchor
  };
}

export function calculateLargeCircleRadius(
  width: number,
  height: number,
  ratio: number
): number {
  const minDimension = Math.min(width, height);
  return (minDimension * ratio) / 2;
}
