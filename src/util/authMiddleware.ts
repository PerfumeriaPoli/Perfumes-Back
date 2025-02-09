import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function checkToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { idUsuario: string; isAdmin: boolean };
      req.body.idUsuario = decoded.idUsuario; // Añadir al cuerpo
      req.body.isAdmin = decoded.isAdmin; // Añadir al cuerpo
      next();
  } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export default checkToken;
