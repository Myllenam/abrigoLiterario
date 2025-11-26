# AbrigoLiterario
O projeto **Abrigo Literário** consiste no desenvolvimento de uma aplicação web voltada ao gerenciamento de uma biblioteca virtual. A plataforma visa oferecer um ambiente acessível e intuitivo para o cadastro e a administração de livros, autores e categorias literárias, além de permitir a interação de leitores com o acervo digital.

# Objetivo do Projeto
O objetivo principal é criar um sistema funcional que permita a gestão eficiente do acervo literário e dos usuários da biblioteca. O sistema também busca promover o acesso à leitura, facilitando o contato entre leitores e o acervo disponível.

# Tecnologias Utilizadas
## Frontend
• Next.js 15 — Framework React para construção de interfaces modernas com Server Components e Server Actions. • TypeScript — Tipagem estática garantindo maior segurança e escalabilidade. • Tailwind CSS — Framework CSS utilitário para estilização rápida e consistente. • Shadcn UI — Biblioteca de componentes acessíveis, tipados e altamente customizáveis. • React Hook Form — Gerenciamento de formulários com alta performance. • Zod — Validação de dados integrada aos formulários.

## Backend
• Java 17 — Linguagem backend principal com alta performance e maturidade. • Spring Boot 3 — Framework para construção da API REST, com validação, controllers e services. • Spring Data JPA — Simplificação do acesso ao banco de dados usando repositórios. • Hibernate — ORM utilizado para mapeamento objeto-relacional.

## Banco de Dados
• PostgreSQL — Banco de dados relacional utilizado para armazenar usuários, livros, empréstimos, categorias e autores.

## Infraestrutura
• Docker — Contêinerização do PostgreSQL para garantir reprodutibilidade do ambiente. • Docker Compose — Orquestração do serviço de banco de dados.

## Autenticação
• Server Actions + Cookies — Login e persistência de sessão utilizando cookies HTTP-only no Next.js.


# Passo a Passo – Subindo o Backend e o Banco de
Dados

## 1. Pré-requisitos
Antes de começar, verifique se cada notebook tem os seguintes programas instalados: - Git - Docker e Docker Compose - Java 17+ (para rodar o backend localmente) - (Opcional) IntelliJ ou VS Code.

## 2. Clonar o projeto
Abra o terminal e execute os comandos abaixo: git clone cd ~/Documentos/abrigoLiterario/backend

## 3. Subir apenas o banco de dados (PostgreSQL) com Docker
Execute no terminal: docker compose up -d postgres Para verificar se o container subiu: docker compose ps docker compose logs -f postgres O Postgres será executado na porta 5433 (configurada no docker-compose.yaml).

## 4. Testar a conexão com o banco
psql -h 127.0.0.1 -p 5433 -U postgres -d abrigoliterario -c "\l" Senha: admin

## 5. Executar o backend localmente
Se estiver usando Maven: ./mvnw spring-boot:run -Dspring-boot.run.main-class=biblioteca.AbrigoLiterarioApplication Se estiver usando Gradle: ./gradlew bootRun -Dspring-boot.run.main-class=biblioteca.AbrigoLiterarioApplication

## 6. Verificar se o backend está rodando
Abra o navegador ou use o curl: http://localhost:8080 ou curl -i http://localhost:8080/actuator/health

## 7. Parar e remover containers
Para parar e remover o banco de dados: docker compose down Para apagar tudo, incluindo os dados: docker compose down -v

## 8. Rodar tudo com Docker (opcional)
Caso queira rodar o backend e o banco de dados no Docker Compose, adicione o serviço 'app' no docker-compose.yaml e um Dockerfile

# Especificação de Requisitos da Aplicação

Este documento detalha os requisitos funcionais (RF), não funcionais (RNF) e as regras de negócio (RN) que guiam o desenvolvimento desta aplicação.

---

## Requisitos Funcionais (RFs)

Os requisitos funcionais descrevem as funcionalidades que o sistema deve fornecer aos usuários.

### Gestão de Autores

* **RF001** - Cadastrar novo autor
* **RF002** - Listar todos os autores
* **RF003** - Buscar autor por ID
* **RF004** - Atualizar informações do autor
* **RF005** - Excluir autor

### Gestão de Categorias

* **RF006** - Cadastrar nova categoria
* **RF007** - Listar todas as categorias
* **RF008** - Buscar categoria por ID
* **RF009** - Atualizar categoria
* **RF010** - Excluir categoria

### Gestão de Livros

* **RF011** - Cadastrar novo livro
* **RF012** - Listar livros com filtros (título, categoria, autor)
* **RF013** - Buscar livro por ID
* **RF014** - Atualizar informações do livro
* **RF015** - Excluir livro

### Gestão de Exemplares

* **RF016** - Cadastrar novo exemplar
* **RF017** - Listar todos os exemplares
* **RF018** - Buscar exemplar por ID
* **RF019** - Atualizar exemplar
* **RF020** - Excluir exemplar
* **RF021** - Controlar disponibilidade do exemplar

### Gestão de Usuários

* **RF022** - Cadastrar novo usuário
* **RF023** - Listar todos os usuários
* **RF024** - Buscar usuário por ID
* **RF025** - Atualizar usuário
* **RF026** - Excluir usuário
* **RF027** - Sistema de login com email e senha

### Sistema de Autenticação

* **RF028** - Validar credenciais de usuário
* **RF029** - Diferenciar perfis (**ADMIN**, **LEITOR**)

---

## Requisitos Não Funcionais (RNFs)

Os requisitos não funcionais especificam critérios que podem ser usados para julgar a operação de um sistema, em vez de comportamentos específicos.

### Desempenho

* **RNF001** - Tempo de resposta inferior a **2 segundos** para operações CRUD.
* **RNF002** - Suporte a até **1000 usuários concorrentes**.
* **RNF003** - Busca filtrada de livros otimizada com índices.

### Segurança

* **RNF004** - Validação de dados de entrada em todos os endpoints.
* **RNF005** - Prevenção de injeção SQL através do JPA.
* **RNF006** - Autenticação básica via email/senha.

### Usabilidade

* **RNF007** - API **RESTful** com **JSON**.
* **RNF008** - Mensagens de erro claras e consistentes.
* **RNF009** - Documentação da API implícita através dos endpoints.

### Confiabilidade

* **RNF010** - Disponibilidade de **99.5%**.
* **RNF011** - Backup automático do banco de dados.
* **RNF012** - Tratamento de exceções centralizado.

### Manutenibilidade

* **RNF013** - Código modular seguindo padrões **Spring Boot**.
* **RNF014** - Logs detalhados para auditoria.
* **RNF015** - Versionamento da API.

---

## Regras de Negócio (RNs)

As regras de negócio definem as políticas, restrições e condições que governam as operações do sistema.

### Validação de Dados

* **RN001** - Nome do autor deve ter no mínimo **2 caracteres**.
* **RN002** - Categoria deve ter no mínimo **3 caracteres** e ser **única**.
* **RN003** - Título do livro deve ter no mínimo **2 caracteres**.
* **RN004** - URL da capa deve ter no mínimo **5 caracteres**.
* **RN005** - Descrição do livro deve ter entre **10 e 1000 caracteres**.
* **RN006** - Email do usuário deve ser **válido**.
* **RN007** - Senha do usuário deve ter no mínimo **6 caracteres**.

### Integridade Referencial

* **RN008** - Não pode excluir autor que possui livros associados.
* **RN009** - Não pode excluir categoria que possui livros associados.
* **RN010** - Livro deve ter **autor** e **categoria** obrigatórios.
* **RN011** - Exemplar deve estar vinculado a um livro.

### Gestão de Exemplares

* **RN012** - Exemplar é criado com status **"disponível"** por padrão.
* **RN013** - A disponibilidade do exemplar pode ser alterada.

### Autenticação e Autorização

* **RN014** - Credenciais devem ser validadas no login.
* **RN015** - Senha **não é retornada** nas consultas por segurança.
* **RN016** - Sistema suporta dois perfis: **ADMIN** e **LEITOR**.

### Busca e Filtros

* **RN017** - Busca de livros permite filtro por título (**case insensitive**).
* **RN018** - Filtros por categoria e autor são opcionais.
* **RN019** - Busca por título usa **correspondência parcial**.
