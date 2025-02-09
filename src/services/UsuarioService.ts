import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IUsuario } from '@src/models/Usuario';
import Usuario from '@src/models/Usuario.model';
import { hash } from 'crypto';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsuario(email: string): Promise<Usuario|null> {
    return Usuario.findOne({
        where: {
            email: email
        }
    }).then((usuario: Usuario|null) => {
        return usuario;
    });
}

async function addUsuario(usuario: any): Promise<any> {
    const { nombre, email, contrasenia, isAdmin } = usuario;

    const usuarioExistente = await getUsuario(email);
    if(usuarioExistente) {
        throw new Error(`El email "${email}" ya está registrado.`);
    }

    await Usuario.create({
        nombre,
        email,
        hash: bcrypt.hashSync(contrasenia, 10),
        isAdmin
    });

    return;
}

async function login(usuario: any): Promise<string> {
    const usuarioExistente = await getUsuario(usuario.email);
    if(!usuarioExistente) {
        throw new Error('Usuario no encontrado.');
    }

    console.log(usuarioExistente);

    const contraseniaValida = bcrypt.compareSync(usuario.contrasenia, usuarioExistente.hash);

    if(!contraseniaValida) {
        throw new Error('Contraseña incorrecta.');
    }

    return jwt.sign({ idUsuario: usuarioExistente.idUsuario, isAdmin: usuarioExistente.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1000h' });
}

export default {
    getUsuario,
    addUsuario,
    login,
} as const;
