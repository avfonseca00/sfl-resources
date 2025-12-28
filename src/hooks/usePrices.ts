// hooks/usePrices.ts - Actualizado
import { useState, useEffect } from 'react';
import { fetchAndUpdatePrices, fetchAndUpdateRate } from '../utils/resourceCalculations';
import type { PricesResponse } from '../types/resourceTypes';

export const usePrices = (): {
    rate: number,
    prices: PricesResponse | null;
    loading: boolean;
    error: string | null;
    lastUpdate: string | null;
    refresh: () => Promise<void>;
} => {
    const [rate, setRate] = useState(0);
    const [prices, setPrices] = useState<PricesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<string | null>(null);

    const loadPrices = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const priceData = await fetchAndUpdatePrices();
            
            if (priceData) {
                setPrices(priceData);
                setLastUpdate(new Date().toLocaleTimeString());
            } else {
                setError('Could not fetch prices');
                setPrices(null);
            }
            
            const rateData = await fetchAndUpdateRate();

            if (rateData) {
                setRate(rateData);
                setLastUpdate(new Date().toLocaleTimeString());
            } else {
                setError('Could not fetch Rates');
                setRate(0);
            }

        } catch (err) {
            console.error('Error in loadPrices:', err);
            setError('Failed to load $SFL prices');
            setPrices(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrices();
        // Actualizar cada 5 minutos
        const interval = setInterval(loadPrices, 300000);
        return () => clearInterval(interval);
    }, []);

    return { rate, prices, loading, error, lastUpdate, refresh: loadPrices };
};