// components/ResourcePieChart.tsx - Versión completamente funcional
import React, { useMemo } from 'react';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  size?: number;
}

const ResourcePieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
  const center = size / 2;
  const radius = size * 0.4;
  
  // Calcular segmentos sin mutación usando reduce
  const segments = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Usar reduce para acumular ángulos sin mutación
    return data.reduce<Array<{
      path: string;
      color: string;
      percentage: string;
      name: string;
      xText: number;
      yText: number;
      startAngle: number;
      endAngle: number;
    }>>((acc, item, index, array) => {
      const percentage = item.value / total;
      const angle = percentage * 360;
      
      // Calcular ángulo de inicio sumando todos los ángulos anteriores
      const startAngle = array
        .slice(0, index)
        .reduce((sum, prevItem) => sum + (prevItem.value / total) * 360, 0);
      
      const endAngle = startAngle + angle;
      
      // Convertir ángulos a radianes
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      // Calcular puntos
      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      // Calcular posición para el texto
      const midAngle = startAngle + angle / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const xText = center + (radius * 0.7) * Math.cos(midRad);
      const yText = center + (radius * 0.7) * Math.sin(midRad);
      
      acc.push({
        path: pathData,
        color: item.color,
        percentage: (percentage * 100).toFixed(1),
        name: item.name,
        xText,
        yText,
        startAngle,
        endAngle,
      });
      
      return acc;
    }, []);
  }, [data, center, radius]);

  // Calcular total
  const total = useMemo(() => 
    data.reduce((sum, item) => sum + item.value, 0), 
    [data]
  );

  // Si no hay datos, mostrar un círculo vacío
  if (data.length === 0) {
    return (
      <div className="relative">
        <svg width={size} height={size} className="mx-auto">
          <circle cx={center} cy={center} r={radius} fill="#374151" />
          <circle cx={center} cy={center} r={radius * 0.3} fill="#1F2937" />
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-bold fill-gray-400"
          >
            Sin datos
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width={size} height={size} className="mx-auto">
        {segments.map((segment, index) => (
          <g key={index}>
            <path
              d={segment.path}
              fill={segment.color}
              stroke="#374151"
              strokeWidth="1"
              className="transition-all hover:opacity-90 cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            />
            {parseFloat(segment.percentage) > 5 && (
              <text
                x={segment.xText}
                y={segment.yText}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold fill-white pointer-events-none"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                {segment.percentage}%
              </text>
            )}
          </g>
        ))}
        <circle cx={center} cy={center} r={radius * 0.3} fill="#1F2937" />
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-bold fill-gray-300 pointer-events-none"
        >
          Total
        </text>
        <text
          x={center}
          y={center + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-400 pointer-events-none"
        >
          {total} un
        </text>
      </svg>
    </div>
  );
};

export default ResourcePieChart;