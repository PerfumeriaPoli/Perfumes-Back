import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import ListaHasPerfume from "./ListaHasPerfume.model";
import UsuarioHasClasificacion from "./UsuarioHasClasificacion.model";

@Table({
  tableName: "Perfume",
  timestamps: false,
})
export class Perfume extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: "idPerfume",
    type: DataType.INTEGER,
  })
  idPerfume!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "nombre",
  })
  nombre?: string;

  @Column({
    type: DataType.STRING,
    field: "notas",
  })
  notas?: string;

  @HasMany(() => ListaHasPerfume)
  listas!: ListaHasPerfume[];

  @HasMany(() => UsuarioHasClasificacion)
  clasificaciones!: UsuarioHasClasificacion[];
}

export default Perfume;
