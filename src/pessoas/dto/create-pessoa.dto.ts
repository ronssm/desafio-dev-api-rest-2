import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePessoaDto {
  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  dataNascimento: Date;
}
