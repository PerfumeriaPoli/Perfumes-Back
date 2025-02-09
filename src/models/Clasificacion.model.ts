import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import UsuarioHasClasificacion from "./UsuarioHasClasificacion.model";

@Table({
  tableName: "Clasificacion",
  timestamps: false,
})
export class Clasificacion extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: "idClasificacion",
    type: DataType.INTEGER,
  })
  idClasificacion!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "nombre",
  })
  nombre!: string;

  @HasMany(() => UsuarioHasClasificacion)
  clasificaciones!: UsuarioHasClasificacion[];
}

export default Clasificacion;
