import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UsuarioHasClasificacion from '@src/models/UsuarioHasClasificacion.model';
import Clasificacion from '@src/models/Clasificacion.model';
import { get } from 'http';

async function getClasificaciones() {
    return await Clasificacion.findAll();
}

async function getClasificacion(idUsuario: number, idPerfume: number) {
    return await UsuarioHasClasificacion.findOne({
        where: {
            usuario_idUsuario: idUsuario,
            perfume_idPerfume: idPerfume
        }
    });
}

async function actualizarClasificacion(clasificacion: any) {
    const { idPerfume, idClasificacion, idUsuario } = clasificacion;
    await UsuarioHasClasificacion.update({
        clasificacion_idClasificacion: idClasificacion
    }, {
        where: {
            usuario_idUsuario: idUsuario,
            perfume_idPerfume: idPerfume
        }
    });
}


async function addClasificacion(clasificacion: any) {
    const { idPerfume, idClasificacion, idUsuario, } = clasificacion;
    try{
        const clasificacionExistente = await getClasificacion(idUsuario, idPerfume);
        if(clasificacionExistente){
            await actualizarClasificacion(clasificacion);
            return;
        }
        await UsuarioHasClasificacion.create({
            usuario_idUsuario: idUsuario,
            perfume_idPerfume: idPerfume,
            clasificacion_idClasificacion: idClasificacion
        });
    } catch (error) {
        throw error;
    }
    
}

async function deleteClasificacion(clasificacion: any) {
    const { idPerfume, idUsuario } = clasificacion;
    const existente = await getClasificacion(idUsuario, idPerfume);
    if (!existente) {
        throw new Error('Clasificacion no encontrada');
    }
    await UsuarioHasClasificacion.destroy({
        where: {
            usuario_idUsuario: idUsuario,
            perfume_idPerfume: idPerfume
        }
    });
}

export default {
    addClasificacion,
    getClasificaciones,
    deleteClasificacion,
} as const;