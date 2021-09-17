## API Restful com Node.js, Express, Typescript, TypeORM, Postgres, Redis, Docker, ...

Repositório do projeto do curso de API Restful de Vendas com Node.js, Typescript, TypeORM, entre outros, do professor Jorge Aluizio Alves ( AluizioDev )

### Estrutura do Projeto

Estrutura de pastas:

`config` - configurações de bibliotecas externas, como por exemplo, autenticação, upload, email, etc.

`modules` - abrangem as áreas de conhecimento da aplicação, diretamente relacionados com as regras de negócios. A princípio criaremos os seguintes módulos na aplicação: customers, products, orders e users.

`shared` - módulos de uso geral compartilhados com mais de um módulo da aplicação, como por exemplo, o arquivo server.ts, o arquivo principal de rotas, conexão com banco de dados, etc.

`services` - estarão dentro de cada módulo da aplicação e serão responsáveis por todas as regras que a aplicação precisa atender, como por exemplo:

- A senha deve ser armazenada com criptografia;
- Não pode haver mais de um produto com o mesmo nome;
- Não pode haver um mesmo email sendo usado por mais de um usuário;

### Executando o projeto

Instalar dependências: `yarn`

Iniciar servidor: `yarn dev`

Acessar o endereço: `http://localhost:3333`

#### Executando container do Postgres

docker run -d --rm --name db \
-p 5432:5432 \
-e POSTGRES_PASSWORD=12qwASzx@@ \
-e TZ=America/Sao_Paulo \
-v /opt/eleva/postgresql/12:/var/lib/postgresql/data \
-v /opt/eleva/backup/postgresql:/opt/backup \
postgres:12.2

##### Executando container do Redis

docker run -d --name redis -p 6379:6379 -t redis:alpine

##### Executando container do Redis Client

docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
