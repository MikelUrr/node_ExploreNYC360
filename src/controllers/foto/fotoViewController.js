import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import translate from 'translate'; // Agrega la importación de 'translate'
import dotenv from "dotenv";

dotenv.config();

const renderFotoPage = (req, res) => {
  console.log("QUIERO VER QUE HAY AQUI", JSON.stringify(req.session));
  const user = req.query.user;
  const rol = req.query.rol;
  res.render("fotos/fotos", { session: req.session });
};

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/fotos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Configuración opcional del idioma de origen
translate.engine = 'google';
translate.from = 'es';

// Función de controlador para manejar la carga de archivos y el reconocimiento de texto
const subirFile = async (req, res) => {
  // Verifica si se ha subido un archivo
  if (!req.file) {
    return res.status(400).send('No se ha seleccionado ningún archivo');
  }

  // Ruta de la imagen subida
  const imagePath = 'public/images/fotos/' + req.file.filename;

  // Configuración para la API de Tesseract
  const tesseractApiUrl = 'https://api.ocr.space/parse/image';
  const apiKey =  process.env.FOTO_APIKEY;

  // Parámetros de la solicitud a la API de Tesseract
  const params = new URLSearchParams();
  params.append('apikey', apiKey);
  params.append('isOverlayRequired', 'false');

  // Lee el contenido binario del archivo
  const imageBuffer = fs.readFileSync(imagePath);

  // Añade el contenido binario al formulario de solicitud
  params.append('base64Image', `data:image/jpeg;base64,${imageBuffer.toString('base64')}`);

  try {
    // Realiza la solicitud a la API de Tesseract
    const response = await axios.post(tesseractApiUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Obtiene el texto reconocido desde la respuesta
    const recognizedText = response.data.ParsedResults[0].ParsedText;

    console.log('Texto reconocido:', recognizedText);

    // Traduce el texto reconocido
    const translatedText = await translate(recognizedText, { from: 'en', to: 'es' });

    console.log('Texto traducido:', translatedText);
    res.json({ recognizedText, translatedText });

  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    res.status(500).send('Error al procesar la imagen');
  } finally {
    // Elimina el archivo después de procesar y traducir
    fs.unlinkSync(imagePath);
    console.log('Imagen eliminada:', imagePath);
  } 
};

export default { upload, subirFile , renderFotoPage};
