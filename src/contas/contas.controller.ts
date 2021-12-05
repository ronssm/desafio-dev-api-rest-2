import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@ApiTags('contas')
@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Conta criada',
  })
  @ApiResponse({ status: 400, description: 'Dados incompletos' })
  create(@Body() createContaDto: CreateContaDto) {
    return this.contasService.create(createContaDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de contas',
  })
  findAll() {
    return this.contasService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Conta encontrada por ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  findOne(@Param('id') id: string) {
    return this.contasService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Conta atualizada',
  })
  @ApiResponse({ status: 400, description: 'Dados incompletos' })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contasService.update(+id, updateContaDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Conta excluida',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  remove(@Param('id') id: string) {
    return this.contasService.remove(+id);
  }

  @Get(':id/saldo')
  @ApiResponse({
    status: 200,
    description: 'Saldo da Conta',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  consultarSaldo(@Param('id') id: string) {
    return this.contasService.consultarSaldo(+id);
  }

  @Get(':id/extrato')
  @ApiResponse({
    status: 200,
    description: 'Lista de transações da Conta',
  })
  @ApiResponse({
    status: 403,
    description: 'Conta bloqueada',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  consultarExtrato(
    @Param('id') id: string,
    @Query('de') de: string,
    @Query('ate') ate: string,
  ) {
    return this.contasService.consultarExtrato({ id: +id, de, ate });
  }

  @Patch(':id/bloquear')
  @ApiResponse({
    status: 200,
    description: 'Conta bloqueada',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  bloquear(@Param('id') id: string) {
    return this.contasService.bloquear(+id);
  }

  @Post(':id/depositar')
  @ApiResponse({
    status: 201,
    description: 'Depósito realizado na Conta',
  })
  @ApiResponse({
    status: 403,
    description:
      'Limite diário excedido, Saldo insuficiente ou conta bloqueada',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  depositar(@Param('id') id: string, @Body() valor) {
    return this.contasService.depositar({ id: +id, ...valor });
  }

  @Post(':id/sacar')
  @ApiResponse({
    status: 201,
    description: 'Saque realizado na Conta',
  })
  @ApiResponse({
    status: 403,
    description:
      'Limite diário excedido, Saldo insuficiente ou conta bloqueada',
  })
  @ApiResponse({
    status: 404,
    description: 'Conta inexistente',
  })
  sacar(@Param('id') id: string, @Body() valor) {
    return this.contasService.sacar({ id: +id, ...valor });
  }
}
