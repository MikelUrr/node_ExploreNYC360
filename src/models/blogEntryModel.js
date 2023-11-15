import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";



const blogEntrySchema = new mongoose.Schema({
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    contenido: {
      type: String,
      required: true
    },
    categoria: {
      type: String,
      required: true
    },
    categoriaMes: {
      type: String,
      required: true
    },
    
    fechaPublicacion: {
      type: Date,
      default: Date.now
    },
    autor: {
      type: String,
      required: true
    },
    foto: {
      type: String // Almaceno solo la URL
    }
  });
  
 
  const BlogEntry = mongoose.model('BlogEntry', blogEntrySchema);
  
 
  export default BlogEntry;