import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(@InjectModel(Pessoa) private pessoaModel: typeof Pessoa) {}

  create(createPessoaDto: CreatePessoaDto) {
    return this.pessoaModel.create(createPessoaDto);
  }

  findAll() {
    return this.pessoaModel.findAll();
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaModel.findByPk(id);
    if (!pessoa) {
      throw new NotFoundException('Pessoa inexistente');
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoa = await this.findOne(id);
    return pessoa.update(updatePessoaDto);
  }

  async remove(id: number) {
    const pessoa = await this.findOne(id);
    pessoa.destroy();
  }
}
