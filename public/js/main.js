document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('button-menu');
  const navWrapper = document.getElementById('nav');

  toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('close');
    navWrapper.classList.toggle('show');
  });

  navWrapper.addEventListener('click', (e) => {
    if (e.target.id === 'nav') {
      navWrapper.classList.remove('show');
      toggleButton.classList.remove('close');
    }
  });
});

function toggleSection(sectionId) {
  const contenido = document.getElementById('contenido-' + sectionId);
  const formulario = document.getElementById('formulario');
  const resultado = document.getElementById('resultado');

  // Oculta todo el contenido de las secciones al principio
  const secciones = document.querySelectorAll('[id^="contenido-"]');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });

  // Muestra solo la sección clicada
  contenido.style.display = contenido.style.display === 'none' ? 'block' : 'none';

  // Oculta el formulario y el resultado al cambiar de sección
  if (contenido.style.display === 'none') {
    formulario.style.display = 'none';
    resultado.style.display = 'none';
  } else {
    formulario.style.display = 'block';
    resultado.style.display = 'block';
  }
}


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


 