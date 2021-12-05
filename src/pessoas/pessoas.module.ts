import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa])],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService],
})
export class PessoasModule {}
