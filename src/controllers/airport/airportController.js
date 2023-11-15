import fs from 'fs/promises';


const apiAirport = async (req, res) => {

    try {
        // Lee el contenido del archivo JSON
        const rutaArchivo = 'public/files/data.json';
        const data = await fs.readFile(rutaArchivo, 'utf8');


        // Parsea el contenido JSON
        const contenidoJson = JSON.parse(data);

        // Envía el contenido JSON como respuesta
        res.json(contenidoJson);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }



}






// Lee el archivo JSON
const aeropuertosList = async () => {
    try {
        // Ruta al archivo JSON
        const rutaArchivo = 'public/files/data.json';
        // Lee el contenido del archivo JSON
        const data = await fs.readFile(rutaArchivo, 'utf8');
        // Parsea el contenido JSON
        const aeropuertos = JSON.parse(data);
        return aeropuertos;
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        throw error;
    }
};

const aeropuertos = await aeropuertosList()

// Calcula la distancia entre dos puntos geográficos
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c; // Distancia en kilómetros

    return distancia;
}

// Busca las coordenadas de un aeropuerto por el nombre
function buscarCoordenadasPorNombre(aeropuertos, airport, country) {
    const aeropuertosEnCountry = aeropuertos.filter(a => a.country === country);
    const aeropuerto = aeropuertosEnCountry.find(a => a.airport === airport);
    if (aeropuerto) {
        return { latitude: aeropuerto.latitude, longitude: aeropuerto.longitude };
    }
    return null;
}




// Busca aeropuertos cercanos a uno dado
function buscarAeropuertosCercanosPorNombre(airport, distanciaLimite, aeropuertos, country) {
    const coordenadasOrigen = buscarCoordenadasPorNombre(aeropuertos, airport, country);

    if (!coordenadasOrigen) {
        console.log("Aeropuerto no encontrado");
        return [];
    }

    const aeropuertosCercanos = aeropuertos.filter(a => {

        if (a.airport !== airport) {

            const distancia = calcularDistancia(
                coordenadasOrigen.latitude, coordenadasOrigen.longitude, a.latitude, a.longitude
            );

            return distancia <= distanciaLimite;
        }
        return false;
    });

    return aeropuertosCercanos;
}

//console.log("Holaaaaaa", buscarAeropuertosCercanosPorNombre("LONDON", 100, aeropuertos, "ENGLAND"))




export default { apiAirport,
    buscarAeropuertosCercanosPorNombre, aeropuertosList };

