import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Clasificacion from '@src/models/Clasificacion.model';
import Lista from '@src/models/Lista.model';
import ListaHasPerfume from '@src/models/ListaHasPerfume.model';

import Perfume from '@src/models/Perfume.model';
import Usuario from '@src/models/Usuario.model';
import UsuarioHasClasificacion from '@src/models/UsuarioHasClasificacion.model';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql', 
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    logging: console.log,
    models: [Clasificacion, Lista, ListaHasPerfume, Perfume, Usuario, UsuarioHasClasificacion], 
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');


    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database and tables have been created.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;