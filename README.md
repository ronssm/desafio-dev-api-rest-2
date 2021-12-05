Para executar o projeto, acesse o diretório raiz que contém o arquivo docker-compose.yaml e execute o comando docker-compose up;

Serão criados containers para a aplicação e para o banco de dados mysql;

Após inicialização dos containers, as tabelas do sistema serão criadas automaticamente;

Fluxo Básico de execução:

1 - CRIAR PESSOA

POST http://localhost:3000/pessoas
Content-Type: application/json

{
  "nome": "joao",
  "cpf": "1234",
  "dataNascimento": "19860129"
}

2 - CRIAR CONTA ASSOCIADA À PESSOA (CONSIDERANDO QUE O ID DA PESSOA É 1)

POST http://localhost:3000/contas
Content-Type: application/json

{
  "idPessoa": 1,
  "saldo": 0,
  "limiteSaqueDiario": 10,
  "flagAtivo": 1,
  "tipoConta": 1,
  "dataCriacao": "20211201"
}

3 - REALIZAR TRANSAÇÕES (CONSIDERANDO QUE O ID DA CONTA É 1)

  - CONSULTAR SALDO
  GET http://localhost:3000/contas/1/saldo

  - DEPOSITAR
  POST http://localhost:3000/contas/1/depositar
  Content-Type: application/json

  {
    "valor": 10.97
  }

  - SACAR
  POST http://localhost:3000/contas/1/sacar
  Content-Type: application/json

  {
    "valor": 10.00
  }

  - EXTRATO POR PERÍODO
  GET http://localhost:3000/contas/1/extrato?de=20211201&ate=20211217


  Todos os Endpoints estão listados na URL http://localhost:3000/api/, utilizando OpenAPI.
  
  
  
