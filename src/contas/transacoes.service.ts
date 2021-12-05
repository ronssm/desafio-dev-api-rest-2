import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { Transacao } from './entities/transacao.entity';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao) private transacaoModel: typeof Transacao,
  ) {}

  async create(createTransacaoDto: CreateTransacaoDto) {
    return await this.transacaoModel.create(createTransacaoDto);
  }

  findAll() {
    return this.transacaoModel.findAll();
  }

  async findOne(id: number) {
    const conta = await this.transacaoModel.findByPk(id);
    if (!conta) {
      throw new NotFoundException('Transacao inexistente');
    }
    return conta;
  }

  async update(id: number, updateTransacaoDto: UpdateTransacaoDto) {
    const conta = await this.findOne(id);
    return conta.update(updateTransacaoDto);
  }

  async remove(id: number) {
    const conta = await this.findOne(id);
    return conta.destroy();
  }

  async saldoTransacoesPorPeriodo(
    id: number,
    tipo: string[],
    de: Date,
    ate: Date,
  ) {
    const total = await this.transacaoModel.sum('valor', {
      where: {
        [Op.and]: [
          { idConta: id },
          {
            dataTransacao: {
              [Op.between]: [de, ate],
            },
          },
          { tipo: { [Op.in]: tipo } },
        ],
      },
    });
    return total;
  }

  async listaTransacoesPorPeriodo(
    id: number,
    tipo: string[],
    de: Date,
    ate: Date,
  ) {
    return await this.transacaoModel.findAll({
      where: {
        [Op.and]: [
          { idConta: id },
          {
            dataTransacao: {
              [Op.between]: [de, ate],
            },
          },
          { tipo: { [Op.in]: tipo } },
        ],
      },
    });
  }
}
