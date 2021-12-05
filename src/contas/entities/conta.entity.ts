import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Table({
  tableName: 'contas',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class Conta extends Model {
  /*
Contas	Tipo
idConta	Numérico
idPessoa	Numérico
saldo	Monetário
limiteSaqueDiario	Monetário
flagAtivo	Condicional
tipoConta	Numérido
dataCriacao	Data

  */

  @PrimaryKey
  @Column({ type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.BIGINT, references: { model: Pessoa, key: 'id' } })
  idPessoa: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  saldo: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  limiteSaqueDiario: number;

  @Column({ type: DataType.BOOLEAN })
  flagAtivo: boolean;

  @Column({ type: DataType.INTEGER })
  tipoConta: number;

  @Column({ type: DataType.DATEONLY })
  dataCriacao: Date;
}
