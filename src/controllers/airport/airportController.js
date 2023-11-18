import fs from 'fs/promises';
import airportModel from "../../models/airportModel.js"
import BusquedaModel from '../../models/busquedasModel.js';





const createNewSearch = async (userId, resultados) => {
    try {
        const searchResult = await BusquedaModel.findOne({ user_id: userId });

        if (searchResult) {

            await searchResult.deleteOne();

        }
        const newSearch = new BusquedaModel({
            user_id: userId,
            fechaCreacionBusqueda: new Date(),
            search_id: resultados.search_id,
            data: resultados.data,
            currency: resultados.currency,
            fx_rate: resultados.fx_rate,

        });

        const savedsearch = await newSearch.save();
        


        return [null, savedsearch];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const getSearch = async (userId) => {
    try {
        const search = await BusquedaModel.findOne({ user_id: userId });
        if (search) {

            const dataToInsert = [];

            for (const item of search.data) {
                const newData = {
                    user_id: userId,
                    flyFrom: item.flyFrom,
                    flyTo: item.flyTo,
                    cityFrom: item.cityFrom,
                    cityCodeFrom: item.cityCodeFrom,
                    cityTo: item.cityTo,
                    cityCodeTo: item.cityCodeTo,
                    route:item.route,
                    local_departure: new Date(item.local_departure),
                    utc_departure: new Date(item.utc_departure),
                    local_arrival: new Date(item.local_arrival),
                    utc_arrival: new Date(item.utc_arrival),
                    nightsInDest: item.nightsInDest,
                    quality: item.quality,
                    distance: item.distance,
                    duration_departure: item.duration.departure,
                    duration_return: item.duration.return,
                    duration_total: item.duration.total,
                    price: item.price,
                    deep_link: item.deep_link,
                    facilitated_booking_available: item.facilitated_booking_available,
                };

                dataToInsert.push(newData);
                
            }
            return [null, dataToInsert];
        }
       

    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

};





/* // Lee el archivo JSON
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
}; */

//const aeropuertos = await getAllUsers()

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




export default {
    buscarAeropuertosCercanosPorNombre,
    createNewSearch, getSearch
};

