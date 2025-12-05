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
    requires: ResourceRequirement[];
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

export interface CalculationResult {
    targetResource: string;
    quantity: number;
    resources: Record<string, ResourceDetails>;
    totalCost: number;
    totalTools: number;
    totalBasicResources: number;
    steps: string[];
    rawCounts: Record<string, number>;
}

export interface ResourceDefinitions {
    [key: string]: ResourceDefinition;
}