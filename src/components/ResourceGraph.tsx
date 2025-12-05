// components/ResourceGraph.tsx - Con SVG personalizado
import React from 'react';
import type { ResourceDetails } from '../types/resourceTypes';
import ResourcePieChart from './ResourcePieChart';

interface ResourceGraphProps {
    resources: Record<string, ResourceDetails>;
}

// Mapeo de clases Tailwind a colores HEX
const colorMap: Record<string, string> = {
    'bg-green-500': '#10B981',
    'bg-yellow-700': '#B45309',
    'bg-yellow-600': '#D97706',
    'bg-gray-400': '#9CA3AF',
    'bg-gray-500': '#6B7280',
    'bg-orange-500': '#F97316',
    'bg-yellow-400': '#FBBF24',
    'bg-orange-400': '#FB923C',
    'bg-yellow-300': '#FCD34D',
    'bg-blue-500': '#3B82F6',
    'bg-red-500': '#EF4444',
    'bg-purple-500': '#8B5CF6',
    'bg-pink-500': '#EC4899',
};

const ResourceGraph: React.FC<ResourceGraphProps> = ({ resources }) => {
    if (!resources || typeof resources !== 'object') return null;

    // Preparar datos para el gráfico
    const chartData = Object.values(resources)
        .filter(resource => resource.quantity > 0)
        .map(resource => ({
        name: resource.name,
        value: resource.quantity,
        color: colorMap[resource.color] || '#6B7280', // Usar mapeo o color por defecto
        rawColor: resource.color,
        icon: resource.icon,
        }))
        .sort((a, b) => b.value - a.value);

    if (chartData.length === 0) return null;

    // Calcular total
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-center text-purple-400">
            Distribución de recursos
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Gráfico de pastel */}
            <div className="flex-1">
            <ResourcePieChart data={chartData} size={250} />
            </div>
            
            {/* Leyenda */}
            {/* <div className="flex-1">
            <div className="space-y-3">
                <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-400">{total}</div>
                <div className="text-gray-400 text-sm">Total de unidades</div>
                </div>
                
                {chartData.map((item) => {
                const percentage = ((item.value / total) * 100).toFixed(1);
                return (
                    <div key={item.name} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                        <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                        <div className="font-bold">{item.value}</div>
                        <div className="text-xs text-gray-400">{percentage}%</div>
                    </div>
                    </div>
                );
                })}
            </div>
            </div> */}
        </div>
        
        {/* Tabla detallada (opcional) */}
        <div className="mt-8 pt-6 border-t border-gray-700">
            <h4 className="font-bold mb-3 text-gray-300">Resumen porcentual</h4>
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="border-b border-gray-700">
                    <th className="py-2 text-left">Recurso</th>
                    <th className="py-2 text-right">Cantidad</th>
                    <th className="py-2 text-right">Porcentaje</th>
                    <th className="py-2 text-right">Proporción</th>
                </tr>
                </thead>
                <tbody>
                {chartData.map((item) => {
                    const percentage = ((item.value / total) * 100).toFixed(1);
                    return (
                    <tr key={item.name} className="border-b border-gray-700/30">
                        <td className="py-3">
                        <div className="flex items-center">
                            <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                            ></div>
                            {item.name}
                        </div>
                        </td>
                        <td className="py-3 text-right">{item.value}</td>
                        <td className="py-3 text-right font-bold">{percentage}%</td>
                        <td className="py-3 text-right">
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                            className="h-full rounded-full"
                            style={{ 
                                width: `${percentage}%`,
                                backgroundColor: item.color
                            }}
                            ></div>
                        </div>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default ResourceGraph;