import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./Usuario.model";
import Perfume from "./Perfume.model";
import Clasificacion from "./Clasificacion.model";

@Table({
  tableName: "Usuario_has_Clasificacion",
  timestamps: false,
})
export class UsuarioHasClasificacion extends Model {
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    field: "usuario_idUsuario",
  })
  usuario_idUsuario!: number;

  @ForeignKey(() => Perfume)
  @Column({
    type: DataType.INTEGER,
    field: "perfume_idPerfume",
  })
  perfume_idPerfume!: number;

  @ForeignKey(() => Clasificacion)
  @Column({
    type: DataType.INTEGER,
    field: "clasificacion_idClasificacion",
  })
  clasificacion_idClasificacion!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @BelongsTo(() => Perfume)
  perfume!: Perfume;

  @BelongsTo(() => Clasificacion)
  clasificacion!: Clasificacion;
}

export default UsuarioHasClasificacion;
