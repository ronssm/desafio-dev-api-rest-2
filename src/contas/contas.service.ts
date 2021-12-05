import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { Conta } from './entities/conta.entity';
import { TipoTransacao } from './entities/transacao.entity';
import { TransacoesService } from './transacoes.service';

@Injectable()
export class ContasService {
  constructor(
    @InjectModel(Conta) private contaModel: typeof Conta,
    private readonly pessoasService: PessoasService,
    private readonly transacoesService: TransacoesService,
  ) {}

  async create(createContaDto: CreateContaDto) {
    const pessoa = await this.pessoasService.findOne(createContaDto.idPessoa);
    if (!pessoa) {
      throw new NotFoundException('Pessoa inexistente');
    }
    return this.contaModel.create(createContaDto);
  }

  findAll() {
    return this.contaModel.findAll();
  }

  async findOne(id: number) {
    const conta = await this.contaModel.findByPk(id);
    if (!conta) {
      throw new NotFoundException('Conta inexistente');
    }
    return conta;
  }

  async update(id: number, updateContaDto: UpdateContaDto) {
    const conta = await this.findOne(id);
    return conta.update(updateContaDto);
  }

  async remove(id: number) {
    const conta = await this.findOne(id);
    return conta.destroy();
  }

  async ehContaBloqueada(id: number): Promise<boolean> {
    const conta = await this.findOne(id);
    if (!conta.flagAtivo) {
      throw new ForbiddenException('Conta bloqueada');
    }
    return conta.flagAtivo;
  }

  async depositar({ id, valor }) {
    await this.ehContaBloqueada(id);
    await this.transacoesService.create({
      idConta: id,
      tipo: TipoTransacao.CREDITO,
      valor: valor,
      dataTransacao: new Date(),
    });
    const conta = await this.findOne(id);
    const novoSaldo = Number(conta.saldo) + Number(valor);
    await this.update(id, { saldo: novoSaldo });
    return await this.consultarSaldo(id);
  }

  async consultarSaldo(id: number) {
    const conta = await this.findOne(id);
    return { conta: id, saldo: conta.saldo };
  }

  async verificaLimiteDiario(id: number, valor: number) {
    const conta = await this.findOne(id);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    const total = await this.transacoesService.saldoTransacoesPorPeriodo(
      id,
      [TipoTransacao.DEBITO],
      ontem,
      hoje,
    );
    if (conta.limiteSaqueDiario < total + valor) {
      throw new ForbiddenException('Limite de saque diário atingido');
    }
  }

  async verificaSaldoDisponivel(id: number, valor: number) {
    const conta = await this.findOne(id);
    if (Number(conta.saldo) < Number(valor)) {
      throw new ForbiddenException(
        'Saldo disponível é menor que valor do saque',
      );
    }
  }

  async sacar({ id, valor }) {
    await this.ehContaBloqueada(id);
    await this.verificaSaldoDisponivel(id, valor);
    await this.verificaLimiteDiario(id, valor);
    await this.transacoesService.create({
      idConta: id,
      tipo: TipoTransacao.DEBITO,
      valor: valor,
      dataTransacao: new Date(),
    });
    const conta = await this.findOne(id);
    const novoSaldo = Number(conta.saldo) - Number(valor);
    await this.update(id, { saldo: novoSaldo });
    return await this.consultarSaldo(id);
  }

  async bloquear(id: number) {
    const conta = await this.findOne(id);
    await this.update(id, { flagAtivo: false });
  }

  async consultarExtrato({ id, de, ate }) {
    await this.ehContaBloqueada(id);
    return await this.transacoesService.listaTransacoesPorPeriodo(
      id,
      [TipoTransacao.DEBITO, TipoTransacao.CREDITO],
      de,
      ate,
    );
  }
}
