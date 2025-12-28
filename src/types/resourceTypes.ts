// types/resourceTypes.ts
export interface ResourceRequirement {
    resource: string;
    quantity: number;
}

export interface ResourceDefinition {
    name: string;
    icon: string;
    iconColor: string;
    color: string;
    description: string;
    cost?: number;
    sflPrice?: number;
    requires: ResourceRequirement[];
    category: 'crops' | 'resources' | 'tools' | 'buildings' | 'fishing' | 'animals'; // Nueva propiedad
}

export interface ResourceDetails extends ResourceDefinition {
    quantity: number;
    unitCost: number;
    toolCost: number;
    totalCost: number;
    toolsNeeded: Array<{
        name: string;
        quantity: number;
        cost: number;
    }>;
}

export interface GemData {
    "100": Record<string, number>;
    "650": Record<string, number>;
    "1350": Record<string, number>;
    "2800": Record<string, number>;
    "7400": Record<string, number>;
    "15500": Record<string, number>;
    "200000": Record<string, number>;
}
export interface CoinData {
    "160": Record<string, number>;
    "8640": Record<string, number>;
    "64000": Record<string, number>;
}

export interface SflRateResponse {
    sfl: Record<string, number>;
    pol: Record<string, number>;
    gems: GemData;
    coins: CoinData;
}

export interface PriceData {
    p2p: Record<string, number>;
    seq: Record<string, number>;
    ge: Record<string, number>;
}

export interface PricesResponse {
    data: PriceData;
    updatedAt: number;
    updated_text: string;
}

export interface CalculationResult {
    targetResource: string;
    quantity: number;
    resources: Record<string, ResourceDetails>;
    totalCost: number;
    totalSfl: number; // ← Nuevo: costo total en $SFL
    totalTools: number;
    totalBasicResources: number;
    steps: string[];
    rawCounts: Record<string, number>;
}

export interface ResourceDefinitions {
    [key: string]: ResourceDefinition;
}