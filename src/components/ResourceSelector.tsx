// components/ResourceSelector.tsx
import React from 'react';
import { resourceDefinitions } from '../utils/resourceCalculations';
import ResourceIcon from './ResourceIcon';

interface ResourceSelectorProps {
    selectedResource: string;
    setSelectedResource: (resource: string) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

const ResourceSelector: React.FC<ResourceSelectorProps> = ({
    selectedResource,
    setSelectedResource,
    quantity,
    setQuantity
    }) => {
    const resources = Object.keys(resourceDefinitions);

    return (
        <div className="space-y-6">
        <div>
            <label className="block text-gray-300 mb-2 font-medium">
            Selecciona el recurso
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {resources.map(resource => {
                const def = resourceDefinitions[resource];
                return (
                <button
                    key={resource}
                    onClick={() => setSelectedResource(resource)}
                    className={`p-4 rounded-lg transition-all flex flex-col items-center justify-start ${
                    selectedResource === resource 
                        ? 'bg-linear-to-r from-blue-600 to-purple-600 transform scale-105 shadow-lg' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    <div className={`text-2xl mb-2 ${def.iconColor}`}>
                        <ResourceIcon 
                            icon={def.icon} 
                            name={def.name}
                            size="md"
                        />
                    </div>
                    <span className="font-medium">{def.name}</span>
                </button>
                );
            })}
            </div>
        </div>
        
        <div>
            <label className="block text-gray-300 mb-2 font-medium">
            Cantidad deseada
            </label>
            <div className="flex items-center">
            <input
                type="range"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="ml-6 flex items-center">
                <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-l-lg hover:bg-gray-600"
                >
                <span className="text-xl">-</span>
                </button>
                <div className="w-20 h-10 flex items-center justify-center bg-gray-900 border-y border-gray-700">
                <span className="text-xl font-bold">{quantity}</span>
                </div>
                <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-r-lg hover:bg-gray-600"
                >
                <span className="text-xl">+</span>
                </button>
            </div>
            </div>
            
            <div className="flex justify-between mt-4">
            {[1, 5, 10, 25, 50].map(num => (
                <button
                key={num}
                onClick={() => setQuantity(num)}
                className={`px-3 py-1 rounded-md ${
                    quantity === num 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                >
                {num}
                </button>
            ))}
            </div>
        </div>
        </div>
    );
};

export default ResourceSelector;