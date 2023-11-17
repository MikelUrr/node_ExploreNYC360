import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";



const airportModel = sequelize.define('tbairport', {
  code: {
    type: DataTypes.STRING(4),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  airport: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
  export default airportModel;