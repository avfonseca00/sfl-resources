// components/ResourceGraph.tsx
import React from 'react';
import type { ResourceDetails } from '../types/resourceTypes';

interface ResourceGraphProps {
    resources: Record<string, ResourceDetails>;
}

const ResourceGraph: React.FC<ResourceGraphProps> = ({ resources }) => {
    if (!resources || typeof resources !== 'object') return null;

    // SOLUCIÓN: Usar Object.values() en lugar de Object.entries()
    const filteredResources = Object.values(resources).filter((resource): resource is ResourceDetails => 
        resource && resource.quantity > 0
    );
    
    if (filteredResources.length === 0) return null;

    const maxQuantity = Math.max(...filteredResources.map(resource => resource.quantity));

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-center text-purple-400">
            Distribución de recursos necesarios
        </h3>
        
        <div className="space-y-4">
            {filteredResources.map((resource, index) => {
            const percentage = (resource.quantity / maxQuantity) * 100;
            
            return (
                <div key={index} className="space-y-2">
                <div className="flex justify-between">
                    <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${resource.color}`}></div>
                    <span className="font-medium">{resource.name}</span>
                    </div>
                    <div className="text-gray-300">
                    <span className="font-bold">{resource.quantity}</span>
                    <span className="text-gray-500 text-sm ml-1">unidades</span>
                    </div>
                </div>
                
                <div className="h-6 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                    className={`h-full rounded-full ${resource.color.replace('bg-', 'bg-linear-to-r from-')}`}
                    style={{ width: `${Math.max(5, percentage)}%` }}
                    ></div>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
};

export default ResourceGraph;