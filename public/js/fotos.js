// Variables para almacenar la última vista previa y el último input
let lastPreview = null;
let lastInput = null;

function mostrarVistaPrevia(input) {
  // Ocultar el elemento de resultado
  const resultado = document.getElementById('resultado');
  resultado.style.display = 'none';

  // Obtener el elemento de vista previa y la imagen subida
  const vistaPrevia = document.getElementById('vistaPrevia');
  const imagenSubida = input.files[0];

  // Verificar si hay una vista previa anterior y un input anterior
  if (lastPreview && lastInput) {
    // Eliminar la vista previa anterior
    lastPreview.parentNode.removeChild(lastPreview);
  }

  // Verificar si se seleccionó una nueva imagen
  if (imagenSubida) {
    // Crear un nuevo elemento de imagen para la nueva vista previa
    const nuevaVistaPrevia = document.createElement('img');
    nuevaVistaPrevia.id = 'vistaPrevia';
    nuevaVistaPrevia.style.display = 'block';

    // Agregar la nueva vista previa al DOM
    input.parentNode.insertBefore(nuevaVistaPrevia, input.nextSibling);

    // Actualizar las variables globales
    lastPreview = nuevaVistaPrevia;
    lastInput = input;

    // Usar FileReader para mostrar la nueva vista previa
    const lector = new FileReader();

    lector.onload = function (e) {
      nuevaVistaPrevia.src = e.target.result;
    };

    lector.readAsDataURL(imagenSubida);
  }
}


  // Realiza una solicitud GET a la API
  fetch('http://localhost:3009/datos')
  .then(response => response.json())
  .then(data => {
      
      console.log('Datos de la API:', data);
     
  })
  .catch(error => console.error('Error al obtener datos:', error));


  // POST fech para mostrar fotos: 


document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const resultadoContainer = document.getElementById('resultado'); // Asegúrate de que esté aquí
  
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(formulario);
  
      try {
        const response = await fetch('http://localhost:3009/foto', {
          method: 'POST',
          body: formData,
        });
  
        const result = await response.json();
        console.log('Contenido de la respuesta POST:', result);
        textoReconocido.textContent = `Texto reconocido: ${result.recognizedText || ''}`;
        textoTraducido.textContent = `Texto traducido: ${result.translatedText || ''}`;
  
        resultadoContainer.style.display = 'block';
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    });
  });