import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import ListaHasPerfume from "./ListaHasPerfume.model";
import Usuario from "./Usuario.model";
import { on } from "events";

@Table({
  tableName: "Lista",
  timestamps: false,
})
export class Lista extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: "idLista",
    type: DataType.INTEGER,
  })
  idLista!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "nombre",
  })
  nombre!: string;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "usuario_idUsuario",
  })
  usuario_idUsuario!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @HasMany(() => ListaHasPerfume, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  perfumes!: ListaHasPerfume[];
}

export default Lista;
