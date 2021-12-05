import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Conta } from './conta.entity';

export enum TipoTransacao {
  'CREDITO' = '0',
  'DEBITO' = '1',
}

@Table({
  tableName: 'transacoes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class Transacao extends Model {
  /*

Transacoes	Tipo
idTransacao	Numérico
idConta	Numérico
valor	Monetário
dataTransacao	Data
  */

  @PrimaryKey
  @Column({ type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.BIGINT, references: { model: Conta, key: 'id' } })
  idConta: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  valor: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  dataTransacao: Date;

  @Column({
    type: DataType.ENUM(TipoTransacao.CREDITO, TipoTransacao.DEBITO),
  })
  tipo: string;
}
