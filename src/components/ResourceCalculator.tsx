// components/ResourceCalculator.tsx
import React, { useState, useMemo } from 'react'; // Cambiado: useMemo en lugar de useEffect
import ResourceSelector from './ResourceSelector';
// import ResourceResults from './ResourceResults';
import ResourceGraph from './ResourceGraph';
import DetailedBreakdown from './DetailedBreakdown';
import { resourceDefinitions, calculateResources } from '../utils/resourceCalculations';
import type { CalculationResult } from '../types/resourceTypes';
import { usePrices } from '../hooks/usePrices';

const ResourceCalculator: React.FC = () => {
    const [selectedResource, setSelectedResource] = useState<string>('hierro');
    const [quantity, setQuantity] = useState<number>(1);
    const { rate, prices, loading: pricesLoading, error: pricesError, refresh } = usePrices();
    
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
        <div className="space-y-6">
        {/* Banner de precios SFL */}
        <div className="bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-yellow-400 mb-1">
                $SFL Market Prices
                </h3>
                <div className="flex items-center space-x-4">
                {pricesLoading ? (
                    <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
                    <span className="text-gray-300">Loading prices...</span>
                    </div>
                ) : pricesError ? (
                    <div className="text-red-400">{pricesError}</div>
                ) : prices ? (
                    <div className="text-gray-300">
                    <span>Updated: </span>
                    <span className="text-green-400">{prices.updated_text}</span>
                    </div>
                ) : null}
                </div>
            </div>
            
            <div className="flex items-center space-x-4">
                <div className="text-right">
                <div className="text-sm text-gray-400">Exchange Rate</div>
                <div className="text-lg font-bold text-yellow-300">{"1 SFL = $" + rate.toFixed(4) + "USD"}</div>
                </div>
                <button
                onClick={refresh}
                disabled={pricesLoading}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                {pricesLoading ? 'Refreshing...' : 'Refresh Prices'}
                </button>
            </div>
            </div>
            
            {/* Mostrar algunos precios relevantes */}
            {prices && (
            <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {['Wood', 'Stone', 'Iron', 'Gold', 'Crimstone', 'Milk'].map(resourceName => {
                    const price = prices.data.p2p[resourceName];
                    return price ? (
                    <div key={resourceName} className="bg-gray-800/50 p-2 rounded text-center">
                        <div className="text-xs text-gray-400">{resourceName}</div>
                        <div className="text-sm font-bold text-yellow-400">
                        {price.toFixed(5)} SFL
                        </div>
                    </div>
                    ) : null;
                })}
                </div>
            </div>
            )}
        </div>

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
            
            {results && (
            <DetailedBreakdown results={results} />
            )}
            
            {/* <ResourceResults results={results} /> */}
            
            {results && (
            <ResourceGraph resources={results.resources} />
            )}
        </div>
        </div>
        </div>
    );
};

export default ResourceCalculator;