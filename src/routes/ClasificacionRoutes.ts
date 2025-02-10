import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import ClasificacionService from '@src/services/ClasificacionService';

async function getClasificacion(req: IReq, res: IRes) {
    const idPerfume = +req.params.idPerfume;
    const body: any = req.body;
    const {idUsuario} = body;
    try{
        const clasificacion = await ClasificacionService.getClasificacion(idUsuario, idPerfume);
        res.status(HttpStatusCodes.OK).json(clasificacion);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

async function addClasificacion(req: IReq, res: IRes) {
    const clasificacion = req.body;
    try{
        await ClasificacionService.addClasificacion(clasificacion);
        res.status(HttpStatusCodes.OK).json({ message: 'Clasificacion added' });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
    
}

async function getAllClasificaciones(req: IReq, res: IRes) {
    try{
        const clasificaciones = await ClasificacionService.getAllClasificaciones(+req.params.idPerfume);
        res.status(HttpStatusCodes.OK).json(clasificaciones);
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

async function deleteClasificacion(req: IReq, res: IRes) {
    try{
        await ClasificacionService.deleteClasificacion(req.body);
        res.status(HttpStatusCodes.OK).json({ message: 'Clasificacion deleted' });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export default {
    getClasificacion,
    addClasificacion,
    getAllClasificaciones,
    deleteClasificacion
} as const;