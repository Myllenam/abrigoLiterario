# abrigoLiterario
O Abrigo Literário é um sistema de gestão bibliotecária realizado em parceria com uma ong, que foi desenvolvido como uma API RESTful em Spring Boot. Sua finalidade principal é automatizar e otimizar todos os processos de uma biblioteca, desde o cadastro de acervo até o controle de usuários, proporcionando uma plataforma centralizada e eficiente para administração do patrimônio literário.

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
