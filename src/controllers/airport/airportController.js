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
        return [null, []]

    } catch (error) {
        console.error(error);
        return [error.message, null];
    }

};






export default {
    
    createNewSearch, getSearch
};

