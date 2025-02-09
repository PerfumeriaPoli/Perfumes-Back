import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import UsuarioService from '@src/services/UsuarioService';

async function getUsuario(req: IReq, res: IRes) {
    const email = req.params.email; 
    const usuario = await UsuarioService.getUsuario(email);
    res.status(HttpStatusCodes.OK).json(usuario);
}

async function addUsuario(req: IReq, res: IRes) {
    const usuario = req.body;
    try{
        const result = await UsuarioService.addUsuario(usuario);
    res.status(HttpStatusCodes.CREATED).json({ success: true, message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}
    
async function login(req: IReq, res: IRes) {
    const usuario = req.body;
    const token = await UsuarioService.login(usuario);
    if(token) {
        res.status(HttpStatusCodes.OK).json({ token });
    } else {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
}

export default {
    getUsuario,
    addUsuario,
    login,
} as const;