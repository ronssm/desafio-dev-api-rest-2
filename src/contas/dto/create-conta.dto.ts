import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContaDto {
  @ApiProperty()
  @IsNotEmpty()
  idPessoa: number;

  @ApiProperty()
  @IsNotEmpty()
  saldo: number;

  @ApiProperty()
  @IsNotEmpty()
  limiteSaqueDiario: number;

  @ApiProperty()
  @IsNotEmpty()
  flagAtivo: boolean;

  @ApiProperty()
  @IsNotEmpty()
  tipoConta: number;

  @ApiProperty()
  @IsNotEmpty()
  dataCriacao: Date;
}
