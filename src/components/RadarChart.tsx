import React from 'react';

interface RadarChartProps {
  data: {
    food: number;
    nature: number;
    culture: number;
    nightlife: number;
    adventure: number;
    wellness: number;
  };
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 300 }) => {
  const padding = 50;
  const center = size / 2;
  const maxRadius = center - padding;

  const axes = [
    { key: 'culture', label: 'History & Arts' },
    { key: 'nature', label: 'Nature & Landscapes' },
    { key: 'adventure', label: 'Active Sports' },
    { key: 'wellness', label: 'Wellness & Rest' },
    { key: 'nightlife', label: 'Social Vibe' },
    { key: 'food', label: 'Culinary & Dining' }
  ];

  const totalAxes = axes.length;

  // Get coordinates for a given angle and radius fraction
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Concentric background rings (33%, 66%, 100%)
  const gridRings = [33, 66, 100];
  const ringPaths = gridRings.map(val => {
    const points = Array.from({ length: totalAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, val);
      return `${x},${y}`;
    });
    return points.join(' ');
  });

  // Calculate coordinates for user data
  const dataPoints = axes.map((axis, i) => {
    const value = data[axis.key as keyof typeof data] || 10;
    return getCoordinates(i, value);
  });
  const dataPolygonPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-earth-cream rounded-lg">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full select-none">
          {/* Background grid concentric rings */}
          {ringPaths.map((path, index) => (
            <polygon
              key={index}
              points={path}
              fill="none"
              stroke="var(--color-earth-sand)"
              strokeWidth="1"
              strokeDasharray={index === 2 ? 'none' : '4 4'}
            />
          ))}

          {/* Grid lines from center to vertices */}
          {Array.from({ length: totalAxes }).map((_, i) => {
            const outer = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="var(--color-earth-sand)"
                strokeWidth="1"
              />
            );
          })}

          {/* Concentric grid percentage labels */}
          {gridRings.map((val, i) => {
            const labelCoord = getCoordinates(0, val);
            return (
              <text
                key={i}
                x={labelCoord.x + 8}
                y={labelCoord.y + 4}
                className="font-mono text-[9px] fill-earth-charcoal/40 text-left font-semibold"
              >
                {val}%
              </text>
            );
          })}

          {/* Filled user profile data polygon */}
          <polygon
            points={dataPolygonPath}
            fill="rgba(90, 90, 64, 0.15)"
            stroke="var(--color-earth-terracotta)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-out"
          />

          {/* Individual coordinate points */}
          {dataPoints.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4.5"
              fill="var(--color-earth-charcoal)"
              stroke="var(--color-earth-cream)"
              strokeWidth="1.5"
              className="transition-all duration-500 ease-out"
            />
          ))}

          {/* Axis Labels */}
          {axes.map((axis, i) => {
            const textRadiusValue = 118; // push text slightly beyond 100% boundary
            const coord = getCoordinates(i, textRadiusValue);
            const value = data[axis.key as keyof typeof data] || 0;

            // Anchor text alignment depending on its position relative to the center
            let textAnchor = 'middle';
            let dy = '0.35em';

            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);

            if (cosAngle > 0.1) textAnchor = 'start';
            else if (cosAngle < -0.1) textAnchor = 'end';

            if (sinAngle > 0.8) dy = '0.9em';
            else if (sinAngle < -0.8) dy = '-0.4em';

            return (
              <g key={i} className="cursor-default">
                <text
                  x={coord.x}
                  y={coord.y}
                  dy={dy}
                  textAnchor={textAnchor}
                  className="font-sans font-semibold text-[11px] fill-earth-charcoal tracking-wide"
                >
                  {axis.label}
                </text>
                <text
                  x={coord.x}
                  y={coord.y + (sinAngle > 0.8 ? 14 : -14)}
                  dy={dy}
                  textAnchor={textAnchor}
                  className="font-mono text-[9px] fill-earth-terracotta font-bold"
                >
                  {value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
