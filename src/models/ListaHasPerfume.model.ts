import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Lista from "./Lista.model";
import Perfume from "./Perfume.model";

@Table({
  tableName: "Lista_has_Perfume",
  timestamps: false,
})
export class ListaHasPerfume extends Model {
  @ForeignKey(() => Lista)
  @Column({
    type: DataType.INTEGER,
    field: "lista_idLista",
  })
  lista_idLista!: number;

  @ForeignKey(() => Perfume)
  @Column({
    type: DataType.INTEGER,
    field: "perfume_idPerfume",
  })
  perfume_idPerfume!: number;

  @BelongsTo(() => Lista,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lista!: Lista;

  @BelongsTo(() => Perfume)
  perfume!: Perfume;
}

export default ListaHasPerfume;
