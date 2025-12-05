// components/DetailedBreakdown.tsx - Versión corregida
import React from 'react';
import type { CalculationResult } from '../types/resourceTypes';
import { resourceDefinitions } from '../utils/resourceCalculations';
import ResourceIcon from './ResourceIcon';

interface DetailedBreakdownProps {
    results: CalculationResult;
}

const DetailedBreakdown: React.FC<DetailedBreakdownProps> = ({ results }) => {
    if (!results || !results.rawCounts) return null;

    const tools = ['hacha', 'pico-madera', 'pico-piedra', 'pico-hierro', 'pico-oro'];
    const resources = ['madera', 'piedra', 'hierro', 'oro'];
    
    // Filtrar y mapear herramientas con cantidad > 0
    const toolCounts = tools
        .filter(tool => results.rawCounts[tool] > 0)
        .map(tool => {
        const definition = resourceDefinitions[tool];
        const quantity = results.rawCounts[tool];
        const icon = definition?.icon || "";
        const cost = definition?.cost || 0;
        
        return {
            id: tool,
            name: definition?.name || tool,
            quantity: quantity,
            icon: icon,
            cost: cost * quantity,
            unitCost: cost
        };
        });
    
    // Filtrar y mapear recursos con cantidad > 0
    const resourceCounts = resources
        .filter(res => results.rawCounts[res] > 0)
        .map(res => {
        const definition = resourceDefinitions[res];
        return {
            id: res,
            name: definition?.name || res,
            quantity: results.rawCounts[res],
            icon: definition?.icon || '📦'
        };
        });

    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-center text-purple-400">
            Desglose detallado
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <h4 className="font-bold text-lg mb-4 text-blue-300">Herramientas necesarias</h4>
            <div className="space-y-3">
                {toolCounts.map((tool) => (
                <div key={tool.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-lg">
                            <ResourceIcon 
                            icon={tool.icon} 
                            name={tool.name}
                            size="sm"
                        /></span>
                    </div>
                    <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-sm text-gray-400">Cantidad: {tool.quantity}</div>
                    </div>
                    </div>
                    <div className="text-right">
                    <div className="font-bold text-green-400">${tool.cost}</div>
                    <div className="text-xs text-gray-400">
                        (${tool.unitCost} c/u)
                    </div>
                    </div>
                </div>
                ))}
                {toolCounts.length === 0 && (
                <div className="text-gray-500 text-center py-4">No se requieren herramientas</div>
                )}
            </div>
            </div>
            
            <div>
            <h4 className="font-bold text-lg mb-4 text-green-300">Recursos recolectados</h4>
            <div className="space-y-3">
                {resourceCounts.map((resource) => (
                <div key={resource.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-lg">
                            <ResourceIcon 
                            icon={resource.icon} 
                            name={resource.name}
                            size="sm"
                        />
                        </span>
                    </div>
                    <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-gray-400">Cantidad obtenida: {resource.quantity}</div>
                    </div>
                    </div>
                    <div className="text-right">
                    <div className="text-xl font-bold">{resource.quantity}</div>
                    <div className="text-xs text-gray-400">unidades</div>
                    </div>
                </div>
                ))}
                {resourceCounts.length === 0 && (
                <div className="text-gray-500 text-center py-4">No se recolectan recursos</div>
                )}
            </div>
            </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
            <h4 className="font-bold text-lg mb-4 text-yellow-300">Cálculo del costo total</h4>
            <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="space-y-2">
                {toolCounts.map((tool) => (
                <div key={tool.id} className="flex justify-between">
                    <span>{tool.quantity} × {tool.name} (${tool.unitCost} c/u)</span>
                    <span className="font-bold">${tool.cost}</span>
                </div>
                ))}
                
                {/* Costos de fabricación de herramientas */}
                {toolCounts.length > 0 && (
                <div className="pt-2 border-t border-gray-700">
                    <div className="flex justify-between font-bold">
                    <span>Costo total de herramientas</span>
                    <span>${toolCounts.reduce((sum, tool) => sum + tool.cost, 0)}</span>
                    </div>
                </div>
                )}
                
                <div className="pt-4 border-t border-gray-700 flex justify-between text-lg font-bold">
                <span>TOTAL FINAL</span>
                <span className="text-green-400">${results.totalCost}</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default DetailedBreakdown;