import { Router } from 'express';
import Paths from '@src/common/Paths';
import checkToken from '@src/util/authMiddleware';
import UsuarioRoutes from './UsuarioRoutes';
import authRoutes from './authRoutes';
import PerfumeRoutes from './PerfumeRoutes';
import ListaRoutes from './ListaRoutes';
import ClasificacionRoutes from './ClasificacionRoutes';

const usuarioRouter = Router();
const perfumeRouter = Router();
const listaRouter = Router();
const clasificacionRouter = Router();
const authRouter = Router();

//* Usuarios

usuarioRouter.get(
    Paths.Usuarios.GetOne,
    checkToken,
    UsuarioRoutes.getUsuario
);

usuarioRouter.post(
    Paths.Usuarios.Add,
    UsuarioRoutes.addUsuario
);

usuarioRouter.post(
    Paths.Usuarios.Login,
    UsuarioRoutes.login
)

//* Perfumes

perfumeRouter.get(
    Paths.Perfumes.GetOne,
    checkToken,
    PerfumeRoutes.getPerfume
);

perfumeRouter.get(
    Paths.Perfumes.GetPorPagina,
    checkToken,
    PerfumeRoutes.getPerfumesPorPagina
);

perfumeRouter.post(
    Paths.Perfumes.Add,
    checkToken,
    PerfumeRoutes.addPerfume
);

perfumeRouter.put(
    Paths.Perfumes.Update,
    checkToken,
    PerfumeRoutes.updatePerfume
);

perfumeRouter.delete(
    Paths.Perfumes.Delete,
    checkToken,
    PerfumeRoutes.deletePerfume
);

perfumeRouter.get(
    Paths.Perfumes.Buscar,
    checkToken,
    PerfumeRoutes.buscarPerfume
);

//*Lista de Perfumes

listaRouter.get(
    Paths.Listas.GetPorUsuario,
    checkToken,
    ListaRoutes.getListaPorUsuario
);

listaRouter.get(
    Paths.Listas.GetListas,
    checkToken,
    ListaRoutes.getListas
)

listaRouter.post(
    Paths.Listas.Add,
    checkToken,
    ListaRoutes.addLista
);

listaRouter.delete(
    Paths.Listas.Delete,
    checkToken,
    ListaRoutes.deleteLista
);

listaRouter.post(
    Paths.Listas.AddPerfume,
    checkToken,
    ListaRoutes.addPerfume
);

listaRouter.delete(
    Paths.Listas.DeletePerfume,
    checkToken,
    ListaRoutes.deletePerfume
);

//* Clasificaciones

clasificacionRouter.post(
    Paths.Clasificaciones.Add,
    checkToken,
    ClasificacionRoutes.addClasificacion
)

clasificacionRouter.get(
    Paths.Clasificaciones.GetAll,
    checkToken,
    ClasificacionRoutes.getAllClasificaciones
)

clasificacionRouter.get(
    Paths.Clasificaciones.GetOne,
    checkToken,
    ClasificacionRoutes.getClasificacion
)

clasificacionRouter.delete(
    Paths.Clasificaciones.Delete,
    checkToken,
    ClasificacionRoutes.deleteClasificacion
)


//*Auth

authRouter.post(
    Paths.Auth.Verify,
    (req, res, next) => authRoutes.verifyToken(req, res).then(next).catch(next)
);

authRouter.get(
    Paths.Auth.Decode,
    checkToken,
    authRoutes.decodeToken
  );


const apiRouter = Router();

apiRouter.use(Paths.Usuarios.Base, usuarioRouter);
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.Perfumes.Base, perfumeRouter);
apiRouter.use(Paths.Listas.Base, listaRouter);
apiRouter.use(Paths.Clasificaciones.Base, clasificacionRouter);
apiRouter.use(checkToken);

export default apiRouter;