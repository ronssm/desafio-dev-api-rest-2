import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ContasModule } from './../src/contas/contas.module';
import { PessoasModule } from './../src/pessoas/pessoas.module';

describe('PessoasController (e2e)', () => {
  let app: INestApplication;

  afterAll((done) => {
    done();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PessoasModule, ContasModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/pessoas (POST)', () => {
    it('Deve criar uma pessoa', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
    });
    it('Não deve criar uma pessoa', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'abc' })
        .expect(400, done);
    });
  });

  describe('/pessoas (GET)', () => {
    it('Deve listar pessoas', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer()).get('/pessoas').expect(200, done);
    });
  });

  describe('/pessoas/:id (GET)', () => {
    it('Deve listar uma pessoa', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer()).get('/pessoas/1').expect(200, done);
    });
  });

  describe('/pessoas/:id (PATCH)', () => {
    it('Deve atualizar uma pessoa', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer())
        .patch('/pessoas/1')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(200, done);
    });
    it('Não deve atualizar uma pessoa (dados incompletos)', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer())
        .patch('/pessoas/1')
        .send({})
        .expect(400, done);
    });
    it('Não deve atualizar uma pessoa (pessoa inexistente)', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer())
        .patch('/pessoas/5')
        .send({ nome: '' })
        .expect(400, done);
    });
  });
  /* 
  describe('/pessoas/:id (DELETE)', () => {
    it('Deve excluir uma pessoa', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer()).delete('/pessoas/1').expect(204, done);
    });
    it('Não deve excluir uma pessoa (pessoa inexistente)', (done) => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({ nome: 'joao', cpf: '1234', dataNascimento: '19860129' })
        .expect(201, done);
      request(app.getHttpServer()).delete('/pessoas/5').expect(400, done);
    });
  }); */
});
