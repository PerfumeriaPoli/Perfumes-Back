import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Perfume from '@src/models/Perfume.model';
import { IPerfume } from '@src/models/Perfume';
import { Op } from 'sequelize';

async function getPerfume(idPerfume: number): Promise<any> {
    return Perfume.findOne({
        where: {
            idPerfume: idPerfume
        }
    }).then((perfume: Perfume|null) => {
        if(!perfume) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Perfume not found');
        }
        return perfume;
    });
}

async function getPerfumesPorPagina(pagina: number): Promise<Perfume[]> {
    const limite = 8;
    const offset = (pagina - 1) * limite;

    return await Perfume.findAll({
        limit: limite,
        offset: offset
    });
}

async function addPerfume(perfume: any): Promise<void> {
    const {nombre, notas} = perfume;
    try {
        const existe = await Perfume.findOne({
            where: {
                nombre: nombre
            }
        });
        if(existe) {
            throw new Error(HttpStatusCodes.CONFLICT.toString());
        }
        await Perfume.create({
            nombre: nombre,
            notas: notas
        });    
    } catch (error) {
        throw new Error(HttpStatusCodes.INTERNAL_SERVER_ERROR.toString());
    }
}

async function updatePerfume(id: number, perfume: any): Promise<void> {
    const {nombre, notas} = perfume;
    try {
        
        await Perfume.update({
            nombre: nombre,
            notas: notas
        }, {
            where: {
                idPerfume: id
            }
        });
    } catch (error) {
        throw new Error(HttpStatusCodes.INTERNAL_SERVER_ERROR.toString());
    }
}

async function deletePerfume(id: number): Promise<void> {
    await Perfume.destroy({
        where: {
            idPerfume: id
        }
    });
}

async function buscarPerfume(nombre: string, pagina: number): Promise<Perfume[]> {
    const limite = 8;
    const offset = (pagina - 1) * limite;
    return await Perfume.findAll({
        limit: limite,
        where: {
            nombre: {
                [Op.like]: `%${nombre}%`
            }
        },
        offset: offset,
    });
}

export default {
    getPerfume,
    getPerfumesPorPagina,
    addPerfume,
    updatePerfume,
    deletePerfume,
    buscarPerfume
} as const;
