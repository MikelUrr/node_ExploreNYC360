// Importa la función que deseas probar
import airportController from '../src/controllers/airport/airportController.js'; 

describe('calcularDistancia', () => {
  it('debería calcular la distancia correctamente entre dos puntos', () => {
    // Coordenadas para dos puntos ficticios
    const lat1 = 40.7128; 
    const lon1 = -74.0060; 
    const lat2 = 34.0522; 
    const lon2 = -118.2437; 

    // Distancia calculada manualmente usando una herramienta externa
    const distanciaEsperada = 3935.74; 

    // Llama a la función que deseas probar
    const distanciaCalculada = airportController.calcularDistancia(lat1, lon1, lat2, lon2);

    
    const tolerancia = 0.5; 
    expect(distanciaCalculada).toBeCloseTo(distanciaEsperada, tolerancia);
  });

  // Puedes agregar más pruebas según sea necesario para cubrir otros casos de uso
});
