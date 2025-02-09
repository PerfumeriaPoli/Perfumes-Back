import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import UsuarioHasClasificacion from "./UsuarioHasClasificacion.model";
import Lista from "./Lista.model";

@Table({
  tableName: "Usuario",
  timestamps: false,
})
export class Usuario extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: "idUsuario",
    type: DataType.INTEGER,
  })
  idUsuario!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "nombre",
  })
  nombre!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: "email",
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "hash",
  })
  hash!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: "isAdmin",
  })
  isAdmin!: boolean;

  @HasMany(() => Lista)
  listas!: Lista[];

  @HasMany(() => UsuarioHasClasificacion)
  clasificaciones!: UsuarioHasClasificacion[];
}

export default Usuario;
