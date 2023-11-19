import axios from 'axios';
import dotenv from "dotenv";

async function searchFlights(params) {
    const apiUrl = 'https://api.tequila.kiwi.com/v2/search';
    const apiKey =  process.env.TEQUILA_APIKEY;
    ;  

    try {
        const response = await axios.get(apiUrl, {
            params,
            headers: {
                'apikey': apiKey,
            },
        });

        if (response.status === 200) {
           
            return response.data;
        } else {
            console.error('Error en la respuesta de la API:', response.statusText);
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un código de estado fuera del rango 2xx
            if (error.response.status === 400) {
                console.error('Error 400: Bad Request');
                throw new Error('Bad Request');
            } else if (error.response.status === 422) {
                console.error('Error 422: Not recognised location param "fly_to"');
                throw new Error('Not recognised location param "fly_to"');
            } else {
                console.error('Error en la respuesta de la API:', error.response.statusText);
                throw new Error('Error en la respuesta de la API');
            }
        } else if (error.request) {
            // La solicitud se hizo pero no se recibió respuesta
            console.error('No se recibió respuesta de la API');
            throw new Error('No se recibió respuesta de la API');
        } else {
            // Algo sucedió en la configuración de la solicitud que provocó un error
            console.error('Error en la configuración de la solicitud:', error.message);
            throw new Error('Error en la configuración de la solicitud');
        }
    }
}

export default { searchFlights };
