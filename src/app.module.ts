import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContasModule } from './contas/contas.module';
import { Conta } from './contas/entities/conta.entity';
import { Pessoa } from './pessoas/entities/pessoa.entity';
import { PessoasModule } from './pessoas/pessoas.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'db',
      port: 3306,
      database: 'cdtbass',
      username: 'root',
      password: 'root',
      models: [Pessoa, Conta],
      autoLoadModels: true,
      sync: { force: true },
    }),
    PessoasModule,
    ContasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
