import axios from 'axios';
/* const params = {
    fly_from: 'BIO',
    fly_to: 'NYC',
    date_from: '01/12/2023',
    date_to: '01/04/2024',
    return_from: '06/04/2024',
    return_to: '06/04/2024',
    ret_from_diff_city: true,
    ret_to_diff_city: true,
    one_for_city: 0,
    one_per_date: 0,
    adults: 2,
    selected_cabins: 'M',
    only_working_days: false,
    only_weekends: false,
    partner_market: 'us',
    max_stopovers: 2,
    max_sector_stopovers: 2,
    vehicle_type: 'aircraft',
    limit: 1,
};
 */
async function searchFlights(params) {
    const apiUrl = 'https://api.tequila.kiwi.com/v2/search';
    const apiKey = '4_dawfiQpvJil0yv2BFukhAfqbbkoimb';  // Reemplaza con tu clave de API

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
