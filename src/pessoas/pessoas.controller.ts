import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoasService } from './pessoas.service';

@ApiTags('pessoas')
@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Pessoa criada',
  })
  @ApiResponse({ status: 400, description: 'Dados incompletos' })
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de pessoas',
  })
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Pessoa encontrada por ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa inexistente',
  })
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Pessoa atualizada',
  })
  @ApiResponse({ status: 400, description: 'Dados incompletos' })
  @ApiResponse({
    status: 404,
    description: 'Pessoa inexistente',
  })
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Pessoa excluida',
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa inexistente',
  })
  remove(@Param('id') id: string) {
    return this.pessoasService.remove(+id);
  }
}
