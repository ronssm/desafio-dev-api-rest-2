import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PessoasModule } from '../pessoas/pessoas.module';
import { ContasController } from './contas.controller';
import { ContasService } from './contas.service';
import { Conta } from './entities/conta.entity';
import { Transacao } from './entities/transacao.entity';
import { TransacoesService } from './transacoes.service';

@Module({
  imports: [SequelizeModule.forFeature([Conta, Transacao]), PessoasModule],
  controllers: [ContasController],
  providers: [ContasService, TransacoesService],
})
export class ContasModule {}
