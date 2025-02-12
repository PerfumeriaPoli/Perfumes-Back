/**
 * Express router paths go here.
 */

import Clasificacion from "@src/models/Clasificacion.model";
import { Verify } from "node:crypto";


export default {
  Base: '/',
  Home: '/home',
  Usuarios: {
    Base: '/usuarios',
    Login: '/login',
    GetOne: '/:email',
    GetAll: '/all',
    Add: '/add',
    Delete: '/delete/:email',
  },
  Perfumes: {
    Base: '/perfumes',
    GetPorPagina: '/all/:pagina',
    Buscar: '/buscar/:nombre',
    GetOne: '/:idPerfume',
    Add: '/add',
    Update: '/update/:idPerfume',
    Delete: '/delete/:idPerfume',
  },
  Listas: {
    Base: '/listas',
    GetOne: '/:idLista',
    GetListas: '/all',
    GetPorUsuario: '/usuario/:idUsuario',
    Add: '/add',
    Delete: '/delete/:idLista',
    AddPerfume: '/addPerfume/:idLista',
    DeletePerfume: '/deletePerfume/:idLista/:idPerfume',
  },
  Clasificaciones: {
    Base: '/clasificaciones',
    GetAll: '/all/:idPerfume',
    GetOne: '/:idPerfume',
    Add: '/add',
    Delete: '/delete',
  },
  Auth: {
    Base: '/auth',
    Verify: '/verify',
    Decode: '/decode',
  },
} as const;
