// App.tsx
import React from 'react';
import ResourceCalculator from './components/ResourceCalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
            Calculadora de Recursos para SunflowerLand
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Calcula los recursos necesarios para obtener cualquier cantidad de recursos en tu juego.
            El sistema calcula automáticamente las dependencias de herramientas y materiales.
          </p>
        </header>
        
        <ResourceCalculator />
        
        <footer className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p className="text-sm">
            Cada herramienta (hacha, pico) tiene un coste base de $20 para fabricarla.
            Los recursos básicos requieren herramientas para ser recolectados.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;