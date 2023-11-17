

const getApi = async () => {
    try {
        // Realiza una solicitud GET a la API
        const response = await fetch('http://localhost:3009/datos');
        const data = await response.json();

        console.log('Datos de la API:', data, typeof data);

        const resultadosArray = data.map(aeropuerto => `${aeropuerto.airport}, ${aeropuerto.country}. Para buscar desde esta localizacion escribe arriba:  ${aeropuerto.name} `);

        console.log("resultados array", resultadosArray);


        return Promise.resolve(resultadosArray);

    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error; 
    }
}

/* const resultadosArray= getApi();
console.log("resultados array",resultadosArray)
 */
const resultadosArray = getApi();


// Configura el manejo del evento de entrada
document.addEventListener('DOMContentLoaded', async ()=> {
    const localizacionPrefInput = document.getElementById('fly_from');
    localizacionPrefInput.addEventListener('input', async ()=>  {
        console.log("Input event triggered",await resultadosArray);
        const inputValue = event.target.value.toLowerCase(); 
        console.log("DENTROOOOOO resultados array", await resultadosArray);
        const suggestions = await filterSuggestions( await resultadosArray, inputValue);
        console.log("Holiiiiii", suggestions);
        displaySuggestions(suggestions);
    });
   
});

function filterSuggestions(resultadosArray, input) {
    return resultadosArray.filter(suggestion => suggestion.toLowerCase().includes(input));
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions');
    suggestionsList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        suggestionsList.appendChild(listItem);
    });
}

