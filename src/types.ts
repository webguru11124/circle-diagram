export interface DiagramItem {
  id: number;
  label: string;
}

export interface CirclePosition {
  x: number;
  y: number;
  angle: number;
}

export interface TextPosition {
  x: number;
  y: number;
  anchor: 'start' | 'end';
}

