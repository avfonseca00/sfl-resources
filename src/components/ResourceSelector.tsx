// components/ResourceSelector.tsx - Versión corregida sin parámetros no usados
import React, { useState, useMemo } from 'react';
import { resourceDefinitions } from '../utils/resourceCalculations';
import ResourceIcon from './ResourceIcon';

interface ResourceSelectorProps {
    selectedResource: string;
    setSelectedResource: (resource: string) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
}

// Tipar las categorías
const CATEGORIES = [
    { id: 'crops', name: 'Cultivos', icon: 'crop.png' },
    { id: 'resources', name: 'Recursos', icon: 'wood.png' },
    { id: 'tools', name: 'Herramientas', icon: "iron_pickaxe.png" },
    { id: 'buildings', name: 'Edificios', icon: 'hammer.png' },
    { id: 'fishing', name: 'Pesca', icon: 'fish.png' },
    { id: 'animals', name: 'Animales', icon: 'chicken.png' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

const ResourceSelector: React.FC<ResourceSelectorProps> = ({
    selectedResource,
    setSelectedResource,
    quantity,
    setQuantity
    }) => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>('resources');
    
    // Agrupar recursos por categoría usando forEach en lugar de filter
    const resourcesByCategory = useMemo(() => {
        const result: Record<CategoryId, Array<[string, typeof resourceDefinitions[string]]>> = {
        crops: [],
        resources: [],
        tools: [],
        buildings: [],
        fishing: [],
        animals: [],
        };
        
        // Usar forEach en lugar de filter para evitar parámetros no usados
        Object.entries(resourceDefinitions).forEach(([key, def]) => {
        const category = def.category as CategoryId;
        if (result[category]) {
            result[category].push([key, def]);
        } else {
            result.resources.push([key, def]);
        }
        });
        
        return result;
    }, []);
    
    // Recursos filtrados por categoría activa
    const filteredResources = resourcesByCategory[activeCategory] || [];

    return (
        <div className="space-y-6">
        <div>
            <label className="block text-gray-300 mb-3 font-medium">
            Selecciona categoría
            </label>
            
            {/* Navegación de categorías */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 mb-6">
            {CATEGORIES.map(cat => (
                <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-center sm:justify-start p-3 rounded-lg transition-all ${
                    activeCategory === cat.id
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
                >
                <span className="text-xl mr-2">
                    <ResourceIcon 
                    icon={cat.icon} 
                    name={cat.name}
                    size="md"
                    />
                </span>
                <span className="font-medium text-sm sm:text-base">{cat.name}</span>
                </button>
            ))}
            </div>
            
            <label className="block text-gray-300 mb-3 font-medium">
            Selecciona {CATEGORIES.find(c => c.id === activeCategory)?.name.toLowerCase()}
            </label>
            
            {/* Recursos de la categoría seleccionada */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredResources.map(([key, def]) => (
                <button
                key={key}
                onClick={() => setSelectedResource(key)}
                className={`p-4 rounded-lg transition-all flex flex-col items-center justify-center ${
                    selectedResource === key 
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 transform scale-105 shadow-lg' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                >
                <div className={`mb-2 ${def.iconColor}`}>
                    <ResourceIcon 
                    icon={def.icon} 
                    name={def.name}
                    size="md"
                    />
                </div>
                <span className="font-medium text-sm mt-1">{def.name}</span>
                </button>
            ))}
            
            {filteredResources.length === 0 && (
                <div className="col-span-3 text-center py-8 text-gray-400 bg-gray-800/50 rounded-lg">
                <div className="text-3xl mb-2">📭</div>
                <p>No hay recursos en esta categoría aún</p>
                <p className="text-sm mt-1">Los refuerzos vienen en camino</p>
                </div>
            )}
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
                <div className="w-10 md:w-20 h-10 flex items-center justify-center bg-gray-900 border-y border-gray-700">
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