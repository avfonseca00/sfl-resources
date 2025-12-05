// components/ResourceResults.tsx - Con función helper
import React from 'react';
import type { CalculationResult } from '../types/resourceTypes';

interface ResourceResultsProps {
    results: CalculationResult | null;
}

// Función helper para obtener recursos activos de forma segura
const getActiveResources = (results: CalculationResult | null) => {
    if (!results || !results.resources || typeof results.resources !== 'object') {
        return [];
    }
    
    try {
        return Object.entries(results.resources)
        .filter((resource) => 
            resource && 
            typeof resource === 'object' && 
            'quantity' in resource && 
            Number(resource.quantity) > 0
        );
    } catch (error) {
        console.error('Error processing resources:', error);
        return [];
    }
    };

    const ResourceResults: React.FC<ResourceResultsProps> = ({ results }) => {
    const activeResources = getActiveResources(results);

    if (!results) {
        return (
        <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
            <div className="text-center text-gray-400 py-8">
            Cargando resultados...
            </div>
        </div>
        );
    }

    if (activeResources.length === 0) {
        return (
        <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">
            Resultados del cálculo
            </h2>
            <div className="text-center text-gray-400 py-8">
            No se encontraron recursos para mostrar.
            </div>
        </div>
        );
    }

    return (
        <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">
            Resultados del cálculo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-5 text-center">
            <div className="text-gray-400 mb-2">Costo total en dinero</div>
            <div className="text-3xl font-bold text-green-400">${results.totalCost}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-5 text-center">
            <div className="text-gray-400 mb-2">Herramientas necesarias</div>
            <div className="text-3xl font-bold text-blue-400">{results.totalTools}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-5 text-center">
            <div className="text-gray-400 mb-2">Recursos básicos</div>
            <div className="text-3xl font-bold text-orange-400">{results.totalBasicResources}</div>
            </div>
        </div>
        
        <div className="space-y-6">
            <div>
            <h3 className="font-bold text-lg text-gray-300 mb-4">Recursos y herramientas necesarias</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeResources.map(([key, resource]) => (
                <div 
                    key={key} 
                    className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${resource.color} bg-opacity-20`}>
                    <span className="text-2xl">{resource.icon}</span>
                    </div>
                    <div className="text-center">
                    <div className="font-bold text-lg">{resource.quantity}</div>
                    <div className="text-sm text-gray-400">{resource.name}</div>
                    {resource.cost && resource.cost > 0 && (
                        <div className="text-xs text-green-400 mt-1">
                        ${resource.cost * resource.quantity}
                        </div>
                    )}
                    </div>
                </div>
                ))}
            </div>
            </div>
            
            <div className="bg-gray-800/70 rounded-lg p-4">
            <h4 className="font-bold mb-3 text-gray-300">Desglose de costos</h4>
            <div className="space-y-2">
                {activeResources.map(([key, resource]) => (
                <div key={key} className="flex justify-between items-center">
                    <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${resource.color}`}></div>
                    <span>{resource.name} (x{resource.quantity})</span>
                    </div>
                    <div className="text-right">
                    <div className="font-bold">
                        ${resource.totalCost || 0}
                    </div>
                    {resource.toolCost > 0 && (
                        <div className="text-xs text-gray-500">
                        Incluye ${resource.toolCost} en herramientas
                        </div>
                    )}
                    </div>
                </div>
                ))}
                <div className="pt-2 border-t border-gray-700 flex justify-between font-bold text-lg">
                <span>TOTAL</span>
                <span className="text-green-400">${results.totalCost}</span>
                </div>
            </div>
            </div>
            
            <div className="mt-4 pt-6 border-t border-gray-700">
            <h4 className="font-bold mb-3 text-gray-300">Proceso de obtención</h4>
            <div className="text-sm text-gray-300 space-y-2 max-h-60 overflow-y-auto pr-2">
                {results.steps && results.steps.map((step, index) => (
                <div key={index} className="p-2 bg-gray-800/50 rounded">
                    {step.includes("RESUMEN") || step.includes("COSTO TOTAL") ? (
                    <div className="font-bold text-yellow-300">{step}</div>
                    ) : step.includes("Para obtener") ? (
                    <div className="font-bold text-blue-300">{step}</div>
                    ) : step.startsWith("Fabricar") ? (
                    <div className="text-green-300">{step}</div>
                    ) : step.startsWith("-") ? (
                    <div className="ml-4">{step}</div>
                    ) : step.match(/^\d+\./) ? (
                    <div className="font-medium">{step}</div>
                    ) : (
                    <div>{step}</div>
                    )}
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default ResourceResults;