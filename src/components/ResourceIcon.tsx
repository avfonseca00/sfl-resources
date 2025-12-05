// components/ResourceIcon.tsx - Para Vite (corregido)
import React, { useState, useEffect } from 'react';

interface ResourceIconProps {
    icon: string;
    name: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ResourceIcon: React.FC<ResourceIconProps> = ({ 
    icon, 
    name, 
    className = '', 
    size = 'md' 
    }) => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        
        const loadImage = async () => {
        try {
            // Para Vite: usar import.meta.glob para precargar
            const images = import.meta.glob(['@/assets/*.png', '@/assets/*.webp'], { eager: true });
            
            // Buscar la imagen
            const imageEntry = Object.entries(images).find(([path]) => {
            const fileName = path.split('/').pop(); // Extrae el nombre del archivo
            return fileName === icon; // Comparación exacta
            });
            
            // Usar setTimeout para evitar actualización síncrona
            setTimeout(() => {
            if (!mounted) return;
            
            if (imageEntry) {
                // @ts-expect-error - El tipo es correcto
                setImageSrc(imageEntry[1].default);
            } else {
                console.warn(`Imagen no encontrada: ${icon}`);
                setImageSrc('');
            }
            setLoading(false);
            }, 0);
            
        } catch (error) {
            if (!mounted) return;
            console.warn(`Error cargando imagen ${icon}:`, error);
            setTimeout(() => {
            if (mounted) {
                setImageSrc('');
                setLoading(false);
            }
            }, 0);
        }
        };

        loadImage();
        
        // Cleanup
        return () => {
        mounted = false;
        };
    }, [icon]);

    // Tamaños para las imágenes
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    if (loading) {
        return (
        <div className={`${sizeClasses[size]} flex items-center justify-center ${className} animate-pulse bg-gray-700 rounded-lg`}>
            <span className="text-xs text-gray-400">...</span>
        </div>
        );
    }

    if (!imageSrc) {
        // Fallback
        const firstLetter = name.charAt(0).toUpperCase();
        return (
        <div 
            className={`${sizeClasses[size]} flex items-center justify-center ${className} bg-linear-to-br from-gray-600 to-gray-700 rounded-lg border border-gray-500`}
            title={name}
        >
            <span className="text-lg font-semibold text-gray-300">{firstLetter}</span>
        </div>
        );
    }

    return (
        <img
        src={imageSrc}
        alt={name}
        className={`${sizeClasses[size]} object-contain ${className}`}
        loading="lazy"
        title={name}
        />
    );
};

export default ResourceIcon;