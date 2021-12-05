import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'pessoas',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class Pessoa extends Model {
  /*
Pessoas	Tipo
idPessoa	Numérico
nome	Texto
cpf	Texto
dataNascimento	Data
*/
  @PrimaryKey
  @Column({ type: DataType.BIGINT, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  nome: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @Column({ type: DataType.STRING })
  cpf: string;

  @Column({ type: DataType.DATEONLY })
  dataNascimento: Date;
}
