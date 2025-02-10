import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';

import PerfumeService from '@src/services/PerfumeService';

async function getPerfume(req: IReq, res: IRes) {
    const idPerfume = +req.params.idPerfume;
    const perfume = await PerfumeService.getPerfume(idPerfume);
    res.status(HttpStatusCodes.OK).json(perfume);
}

async function getPerfumesPorPagina(req: IReq, res: IRes) {
    const pagina = +req.params.pagina;
    const perfumes = await PerfumeService.getPerfumesPorPagina(pagina);
    res.status(HttpStatusCodes.OK).json(perfumes);
}

async function addPerfume(req: IReq, res: IRes) {
    const perfume = req.body;
    const isAdmin = (req.body as any).isAdmin;
    if (!isAdmin) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
    }
    try {
        await PerfumeService.addPerfume(perfume);
        res.status(HttpStatusCodes.CREATED).json({ message: 'Perfume added' });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Perfume con ese nombre ya existe' });
    }
}

async function updatePerfume(req: IReq, res: IRes) {
    const perfume = req.body;
    const id = +req.params.idPerfume;
    const isAdmin = (req.body as any).isAdmin;
    if (!isAdmin) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
    }
    try {
        await PerfumeService.updatePerfume(id,perfume);
        res.status(HttpStatusCodes.OK).json({ message: 'Perfume updated' });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Perfume das ese nombre ya existe' });
    }
}

async function deletePerfume(req: IReq, res: IRes) {
    const id = +req.params.idPerfume;
    const isAdmin = (req.body as any).isAdmin;
    if (!isAdmin) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
    }
    await PerfumeService.deletePerfume(id);
    res.status(HttpStatusCodes.OK).json({ message: 'Perfume deleted' });
}

async function buscarPerfume(req: IReq, res: IRes) {
    const nombre = req.params.nombre;
    const perfume = await PerfumeService.buscarPerfume(nombre);
    res.status(HttpStatusCodes.OK).json(perfume);
}

export default {
    getPerfume,
    getPerfumesPorPagina,
    addPerfume,
    updatePerfume,
    deletePerfume,
    buscarPerfume,
} as const;