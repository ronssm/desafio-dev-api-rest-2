import { ApiProperty } from '@nestjs/swagger';
import { TipoTransacao } from '../entities/transacao.entity';

export class CreateTransacaoDto {
  @ApiProperty()
  idConta: number;

  @ApiProperty()
  valor: number;

  @ApiProperty()
  dataTransacao: Date;

  @ApiProperty()
  tipo: TipoTransacao;
}
