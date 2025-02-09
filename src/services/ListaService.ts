import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import Lista from '@src/models/Lista.model';
import ListaHasPerfume from '@src/models/ListaHasPerfume.model';
import Perfume from '@src/models/Perfume.model';

async function getListaPorNombre(nombre: string, idUsuario: number) {

    try {
        const lista = await Lista.findOne({
            where: {
                nombre,
                usuario_idUsuario: idUsuario,
            },
            include: [
                {
                    model: ListaHasPerfume,
                    include: [
                        {
                            model: Perfume,
                        }
                    ]
                },
        ]});
        return lista;
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}


async function getListaPorUsuario(idUsuario: number) {
    console.log('getListaPorUsuario');
    try {
        const listas = await Lista.findAll({
            where: {
                usuario_idUsuario: idUsuario,
            },
            include: [
                {
                    model: ListaHasPerfume,
                    include: [
                        {
                            model: Perfume,
                        }
                    ]
                },
        ]});
        return listas;
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function addLista(lista: any) {
    const { nombre, idUsuario } = lista;
    try {
        const listaExistente = await getListaPorNombre(nombre, idUsuario);
        if (listaExistente) {
            throw new Error('Ya tenes una lista con ese nombre');
        }
        const result = await Lista.create({
            nombre,
            usuario_idUsuario: idUsuario,
        });
        return result;
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function deleteLista(idLista: number, body: any) {
    const { idUsuario } = body;
    try {
        const lista = await Lista.findOne({
            where: {
                idLista,
                usuario_idUsuario: idUsuario,
            },
        });
        if (!lista) {
            throw new Error('Esta lista no te pertenece');
        }
        await lista.destroy();      
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function addPerfume(idLista: number, perfume: any) {
    try {
        const lista = await Lista.findOne({
            where: {
                idLista,
            },
        });
        if (!lista) {
            throw new Error('Esta lista no existe');
        }
        const result = await ListaHasPerfume.create({
            lista_idLista: idLista,
            perfume_idPerfume: perfume.idPerfume,
        });
        return result;
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function getListas(body: any) {
    const { idUsuario } = body;
    try {
        const listas = await Lista.findAll({
            where: {
                usuario_idUsuario: idUsuario,
            },
        });
        return listas;
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}

async function deletePerfume(idLista: number, perfume: any) {
    try {
        const lista = await Lista.findOne({
            where: {
                idLista,
            },
        });
        if (!lista) {
            throw new Error('Esta lista no existe');
        }
        const result = await ListaHasPerfume.destroy({
            where: {
                lista_idLista: idLista,
                perfume_idPerfume: perfume.idPerfume,
            },
        });
        return result;
    } catch (error) {
        throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, error.message);
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