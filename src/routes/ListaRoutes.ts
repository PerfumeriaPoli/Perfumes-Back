import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';

import ListaService from '@src/services/ListaService';
import { get } from 'http';


async function getListaPorUsuario(req: IReq, res: IRes) {
    console.log('getListaPorUsuario');
    try {
        const idUsuario = +req.params.idUsuario;
        const listas = await ListaService.getListaPorUsuario(idUsuario);
        res.status(HttpStatusCodes.OK).json(listas);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

async function addLista(req: IReq, res: IRes) {
    try {
        const lista = req.body;
        const result = await ListaService.addLista(lista);
        res.status(HttpStatusCodes.CREATED).json(result);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

async function deleteLista(req: IReq, res: IRes) {
    try {
        const idLista = +req.params.idLista;
        
        const result = await ListaService.deleteLista(idLista, req.body);
        res.status(HttpStatusCodes.OK).json(result);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

async function addPerfume(req: IReq, res: IRes) {
    try {
        const idLista = +req.params.idLista;
        const perfume = req.body;
        const result = await ListaService.addPerfume(idLista, perfume);
        res.status(HttpStatusCodes.CREATED).json(result);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

async function getListas(req: IReq, res: IRes) {
    try {
        const listas = await ListaService.getListas(req.body);
        res.status(HttpStatusCodes.OK).json(listas);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

async function deletePerfume(req: IReq, res: IRes) {
    try {
        const idLista = +req.params.idLista;
        const perfume = req.body;
        const result = await ListaService.deletePerfume(idLista, perfume);
        res.status(HttpStatusCodes.OK).json(result);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

export default {
    getListaPorUsuario,
    addLista,
    deleteLista,
    addPerfume,
    getListas,
    deletePerfume,
} as const;