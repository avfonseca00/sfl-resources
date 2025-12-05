// utils/resourceCalculations.ts
import type{ 
    ResourceDefinitions, 
    CalculationResult,
    ResourceDetails
} from '../types/resourceTypes';

// Definición de recursos en formato JSON con tipos
export const resourceDefinitions: ResourceDefinitions = {
    hacha: {
        name: "Axe",
        icon: "axe.png",
        iconColor: "text-green-500",
        color: "bg-green-500",
        description: "Herramienta necesaria para obtener madera",
        cost: 20, // Costo fijo en dinero
        requires: []
    },
    madera: {
        name: "Wood",
        icon: "wood.png",
        iconColor: "text-yellow-700",
        color: "bg-yellow-700",
        description: "Recurso básico obtenido con hacha",
        requires: [{ resource: "hacha", quantity: 1 }]
    },
    "pico-madera": {
        name: "Wood Pickaxe",
        icon: "wood_pickaxe.png",
        iconColor: "text-yellow-600",
        color: "bg-yellow-600",
        description: "Herramienta para obtener piedra",
        cost: 20,
        requires: [
        { resource: "madera", quantity: 3 }
        ]
    },
    piedra: {
        name: "Stone",
        icon: "stone.png",
        iconColor: "text-gray-400",
        color: "bg-gray-400",
        description: "Recurso obtenido con pico de madera",
        requires: [{ resource: "pico-madera", quantity: 1 }]
    },
    "pico-piedra": {
        name: "Stone Pickaxe",
        icon: "stone_pickaxe.png",
        iconColor: "text-gray-500",
        color: "bg-gray-500",
        description: "Herramienta para obtener hierro",
        cost: 20,
        requires: [
        { resource: "piedra", quantity: 5 },
        { resource: "madera", quantity: 3 }
        ]
    },
    hierro: {
        name: "Iron",
        icon: "iron.png",
        iconColor: "text-orange-500",
        color: "bg-orange-500",
        description: "Recurso final obtenido con pico de piedra",
        requires: [{ resource: "pico-piedra", quantity: 1 }]
    },
    oro: {
        name: "Gold",
        icon: "gold.png",
        iconColor: "text-yellow-400",
        color: "bg-yellow-400",
        description: "Recurso obtenido con pico de hierro",
        requires: [{ resource: "pico-hierro", quantity: 1 }]
    },
    "pico-hierro": {
        name: "Iron Pickaxe",
        icon: "iron_pickaxe.png",
        iconColor: "text-orange-400",
        color: "bg-orange-400",
        description: "Herramienta para obtener oro",
        cost: 80,
        requires: [
        { resource: "hierro", quantity: 5 },
        { resource: "madera", quantity: 3 }
        ]
    },
    "pico-oro": {
        name: "Gold Pickaxe",
        icon: "gold_pickaxe.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Herramienta avanzada",
        cost: 100,
        requires: [
        { resource: "oro", quantity: 5 },
        { resource: "madera", quantity: 3 }
        ]
    },
    "water-well": {
        name: "Water Well",
        icon: "well.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Los cultivos necesitan agua",
        cost: 100,
        requires: [
        { resource: "madera", quantity: 5 }
        ]
    },
    "kitchen": {
        name: "Kitchen",
        icon: "kitchen_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Mejora tu juego de cocina",
        cost: 10,
        requires: [
        { resource: "piedra", quantity: 5 },
        { resource: "madera", quantity: 30 }
        ]
    },
    "hen-house": {
        name: "Hen House",
        icon: "hen_house_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Haz crecer tu imperio de pollos",
        cost: 100,
        requires: [
        { resource: "oro", quantity: 5 },
        { resource: "hierro", quantity: 5 },
        { resource: "madera", quantity: 30 }
        ]
    },
    "crafting-box": {
        name: "Crafting Box",
        icon: "crafting_box.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Una caja para fabricar varios objetos",
        cost: 0,
        requires: [
        { resource: "piedra", quantity: 5 },
        { resource: "madera", quantity: 100 }
        ]
    },
    "compost-bin": {
        name: "Compost Bin",
        icon: "composter_basic.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Produce cebo y fertilizante de forma regular",
        cost: 0,
        requires: [
        { resource: "piedra", quantity: 5 },
        { resource: "madera", quantity: 5 }
        ]
    },
    "bakery": {
        name: "Bakery",
        icon: "bakery_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Hornea tus tartas favoritas",
        cost: 200,
        requires: [
        { resource: "oro", quantity: 5 },
        { resource: "piedra", quantity: 20 },
        { resource: "madera", quantity: 50 }
        ]
    },
    "turbo-composter": {
        name: "Trubo Compost",
        icon: "composter_advanced.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Produce cebos y fertilizantes avanzados de forma regular",
        cost: 0,
        requires: [
        { resource: "piedra", quantity: 25 },
        { resource: "madera", quantity: 50 }
        ]
    },
    "deli": {
        name: "Deli",
        icon: "deli_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Satisface tu apetito con estos exquisitos manjares!",
        cost: 300,
        requires: [
        { resource: "oro", quantity: 10 },
        { resource: "piedra", quantity: 50 },
        { resource: "madera", quantity: 50 }
        ]
    },
    "premium-composter": {
        name: "Premium Compost",
        icon: "composter_expert.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Produce cebos y fertilizantes expertos de forma regular",
        cost: 0,
        requires: [
        { resource: "oro", quantity: 50 }
        ]
    },
    "warehouse": {
        name: "Warehouse",
        icon: "warehouse_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Mantiene tus semillas seguras",
        cost: 0,
        requires: [
        { resource: "piedra", quantity: 150 },
        { resource: "madera", quantity: 250 }
        ]
    },
    "smoothie-shack": {
        name: "Smoothie Shack",
        icon: "smoothie_shack_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Recien exprimido!",
        cost: 0,
        requires: [
        { resource: "hierro", quantity: 10 },
        { resource: "piedra", quantity: 25 },
        { resource: "madera", quantity: 25 }
        ]
    },
    "toolshed": {
        name: "Toolshed",
        icon: "toolshed_icon.png",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Un lugar para guardar herramientas",
        cost: 0,
        requires: [
        { resource: "pico-madera", quantity: 50 },
        { resource: "hacha", quantity: 100 },
        { resource: "oro", quantity: 25 },
        { resource: "hierro", quantity: 30 },
        { resource: "madera", quantity: 500 }
        ]
    },
    "barn": {
        name: "Barn",
        icon: "barn_sm.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Bonita y acogedora casa para tus amigos de 4 patas",
        cost: 200,
        requires: [
        { resource: "oro", quantity: 10 },
        { resource: "hierro", quantity: 10 },
        { resource: "madera", quantity: 150 }
        ]
    },
    "crop-machine": {
        name: "Crop Machine",
        icon: "crop_machine.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Automatice la produccion de sus cultivos",
        cost: 8000,
        requires: [
        { resource: "hierro", quantity: 125 },
        { resource: "madera", quantity: 1250 }
        ]
    },
    "greenhouse": {
        name: "Greenhouse",
        icon: "greenhouse_icon.webp",
        iconColor: "text-yellow-300",
        color: "bg-yellow-300",
        description: "Un santuario para cultivos sensibles",
        cost: 4800,
        requires: [
        { resource: "piedra", quantity: 100 },
        { resource: "madera", quantity: 500 }
        ]
    }
};
// Función para calcular los recursos necesarios con costo total CORREGIDA
export const calculateResources = (targetResource: string, quantity: number): CalculationResult => {
  // Objeto para almacenar la cantidad total de cada recurso
    const resourceCounts: Record<string, number> = {};
    
    // Inicializar todos los recursos con 0
    Object.keys(resourceDefinitions).forEach(resource => {
        resourceCounts[resource] = 0;
    });
    
    // Función recursiva mejorada para contar todas las dependencias
    const calculateDependencies = (resourceKey: string, neededQuantity: number): void => {
        const definition = resourceDefinitions[resourceKey];
        
        // Si no tiene requisitos, no hacer nada más
        if (!definition.requires || definition.requires.length === 0) {
        return;
        }
        
        // Para cada requisito
        definition.requires.forEach(req => {
        const requiredQuantity = req.quantity * neededQuantity;
        
        // Sumar al contador global
        resourceCounts[req.resource] += requiredQuantity;
        
        // Procesar las dependencias de este requisito
        calculateDependencies(req.resource, requiredQuantity);
        });
    };
    
    // Iniciar el cálculo con el recurso objetivo
    calculateDependencies(targetResource, quantity);
    
    // También añadir el recurso objetivo mismo
    resourceCounts[targetResource] += quantity;
    
    // CALCULAR COSTOS
    let totalCost = 0;
    const resourcesWithDetails: Record<string, ResourceDetails> = {};
    const steps: string[] = [];
    
    // Primero calcular costos de herramientas
    Object.entries(resourceCounts).forEach(([resourceKey, count]) => {
        if (count > 0) {
        const definition = resourceDefinitions[resourceKey];
        
        // Solo herramientas tienen costo
        if (definition.cost) {
            const resourceCost = definition.cost * count;
            totalCost += resourceCost;
            
            resourcesWithDetails[resourceKey] = {
            ...definition,
            quantity: count,
            unitCost: definition.cost,
            toolCost: 0,
            totalCost: resourceCost,
            toolsNeeded: []
            };
            
            steps.push(`Fabricar ${count} ${definition.name}: $${resourceCost} ($${definition.cost} cada uno)`);
        } else {
            // Recursos sin costo directo
            resourcesWithDetails[resourceKey] = {
            ...definition,
            quantity: count,
            unitCost: 0,
            toolCost: 0,
            totalCost: 0,
            toolsNeeded: []
            };
        }
        }
    });
    
    // Calcular herramientas totales y recursos básicos
    const tools = ['hacha', 'pico-madera', 'pico-piedra', 'pico-hierro', 'pico-oro'];
    const basicResources = ['madera', 'piedra', 'hierro', 'oro'];
    
    const totalTools = tools.reduce((sum, tool) => sum + (resourceCounts[tool] || 0), 0);
    const totalBasicResources = basicResources.reduce((sum, resource) => sum + (resourceCounts[resource] || 0), 0);
    
    // Generar descripción paso a paso
    generateStepDescription(targetResource, quantity, steps, totalCost, resourceCounts);
    
    return {
        targetResource,
        quantity,
        resources: resourcesWithDetails,
        totalCost,
        totalTools,
        totalBasicResources,
        steps: steps,
        rawCounts: resourceCounts
    };
    };

    // Función para generar descripción paso a paso MEJORADA
    const generateStepDescription = (
    targetResource: string, 
    quantity: number, 
    steps: string[], 
    totalCost: number,
    resourceCounts: Record<string, number>
    ): void => {
    const definition = resourceDefinitions[targetResource];
    steps.unshift(`Para obtener ${quantity} ${definition.name}:`);
    
    // Contar herramientas específicas
    const hachas = resourceCounts['hacha'] || 0;
    const picosMadera = resourceCounts['pico-madera'] || 0;
    const picosPiedra = resourceCounts['pico-piedra'] || 0;
    const picosHierro = resourceCounts['pico-hierro'] || 0;
    const picosOro = resourceCounts['pico-oro'] || 0;
    
    // Generar resumen general
    const toolSummary: string[] = [];
    if (hachas > 0) toolSummary.push(`- ${hachas} Hachas = $${hachas * 20}`);
    if (picosMadera > 0) toolSummary.push(`- ${picosMadera} Picos de Madera = $${picosMadera * 20}`);
    if (picosPiedra > 0) toolSummary.push(`- ${picosPiedra} Picos de Piedra = $${picosPiedra * 20}`);
    if (picosHierro > 0) toolSummary.push(`- ${picosHierro} Picos de Hierro = $${picosHierro * 20}`);
    if (picosOro > 0) toolSummary.push(`- ${picosOro} Picos de Oro = $${picosOro * 20}`);
    
    if (toolSummary.length > 0) {
        steps.push("RESUMEN DE HERRAMIENTAS Y COSTOS:", ...toolSummary, `COSTO TOTAL: $${totalCost}`);
    }
    
    // Ejemplos específicos detallados
    if (targetResource === 'hierro' && quantity === 1) {
        steps.push(
        "",
        "DESGLOSE DETALLADO:",
        "1. Necesitas 1 Pico de Piedra para minar 1 Mineral de Hierro",
        "2. Para fabricar 1 Pico de Piedra necesitas:",
        "   - 5 Piedras (necesitan 5 Picos de Madera)",
        "   - 3 Maderas (necesitan 3 Hachas)",
        "   - $20 para fabricar el Pico de Piedra",
        "3. Para obtener 5 Piedras necesitas:",
        "   - 5 Picos de Madera ($100 para fabricarlos)",
        "4. Para fabricar 5 Picos de Madera necesitas:",
        "   - 15 Maderas (necesitan 15 Hachas)",
        "   - $100 para fabricar los 5 Picos de Madera",
        "5. Para obtener 3 Maderas (del paso 2) necesitas:",
        "   - 3 Hachas ($60 para fabricarlas)",
        "6. Para obtener 15 Maderas (del paso 4) necesitas:",
        "   - 15 Hachas ($300 para fabricarlas)",
        "",
        `TOTAL HACHAS: 3 + 15 = ${hachas}`,
        `TOTAL PICOS DE MADERA: ${picosMadera}`,
        `TOTAL PICOS DE PIEDRA: ${picosPiedra}`
        );
    }
    
    if (targetResource === 'piedra' && quantity === 1) {
        steps.push(
        "",
        "DESGLOSE DETALLADO:",
        "1. Necesitas 1 Pico de Madera para minar 1 Piedra",
        "2. Para fabricar 1 Pico de Madera necesitas:",
        "   - 3 Maderas (necesitan 3 Hachas)",
        "   - $20 para fabricar el Pico de Madera",
        "3. Para obtener 3 Maderas necesitas:",
        "   - 3 Hachas ($60 para fabricarlas)"
        );
    }
};