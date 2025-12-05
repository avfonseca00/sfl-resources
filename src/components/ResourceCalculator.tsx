// components/ResourceCalculator.tsx
import React, { useState, useMemo } from 'react'; // Cambiado: useMemo en lugar de useEffect
import ResourceSelector from './ResourceSelector';
import ResourceResults from './ResourceResults';
import ResourceGraph from './ResourceGraph';
import DetailedBreakdown from './DetailedBreakdown';
import { resourceDefinitions, calculateResources } from '../utils/resourceCalculations';
import type { CalculationResult } from '../types/resourceTypes';

const ResourceCalculator: React.FC = () => {
    const [selectedResource, setSelectedResource] = useState<string>('hierro');
    const [quantity, setQuantity] = useState<number>(1);
    
    // Usar useMemo para calcular resultados derivados
    const results = useMemo<CalculationResult | null>(() => {
        try {
        return calculateResources(selectedResource, quantity);
        } catch (error) {
        console.error('Error calculating resources:', error);
        return null;
        }
    }, [selectedResource, quantity]); // Solo recalcula cuando cambian estas dependencias

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-green-400">Configuración</h2>
            
            <ResourceSelector 
                selectedResource={selectedResource}
                setSelectedResource={setSelectedResource}
                quantity={quantity}
                setQuantity={setQuantity}
            />
            
            <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="font-bold mb-3 text-gray-300">Descripción del recurso</h3>
                <p className="text-gray-300 text-sm">
                {resourceDefinitions[selectedResource]?.description || 'Sin descripción disponible.'}
                </p>
            </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Cómo funciona</h3>
            <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Selecciona el recurso y cantidad que deseas obtener
                </li>
                <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                La calculadora determina todas las dependencias
                </li>
                <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Cada herramienta tiene un coste de fabricación de $20
                </li>
                <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Los recursos se obtienen usando las herramientas correspondientes
                </li>
            </ul>
            </div>
        </div>
        
        <div className="lg:col-span-3 space-y-8">
            <ResourceResults results={results} />
            
            {results && (
            <ResourceGraph resources={results.resources} />
            )}
            
            {results && (
            <DetailedBreakdown results={results} />
            )}
        </div>
        </div>
    );
};

export default ResourceCalculator;