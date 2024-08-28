Projeto integrador 2024
**DataQuery**

----------------------------------
** FUNCIONAMENTO
- Fluxograma da Alexa e API e Diagrama de casos de uso:
https://www.canva.com/design/DAGBsv26MYc/1_93cT9uQputTXvGIbSkCQ/edit

- Layout Site
https://app.moqups.com/tZcdGBvl9FH6ElOaIDSi6uEe26MzgDiP/edit/page/a4ef3fe51

**MELHORAR SKILL**
- escolher grupo;
- escolher data;
- dizer ajuda -> opções, como relatar problema, ensinar a usar, etc.
- escolher grupo - Quando validado, retornar uma lista de clientes no Return

**MELHORAR API**
- dizer que não há dados quando os valores das querye de um grupo estiver zerado 
-> não há dados para ?{nome do grupo}
- criar base Alexa nos clientes com as views já programadas
- criar cadastro sem grupo , e não o dizer quando for esse parametro.

**MELHORAR SITE**
- revisar todas as colunas do banco
- botão de copiar grupo para outro
- botão de vincular solicitação ao cliente
- log na tela de cliente

----------------------------------
** DOCUMENTAÇÃO 
**ETAPA 1 - PROJETO DE PESQUISA**

**1. IDENTIFICAÇÃO DO PROJETO**

1.1. Aluno integrante: Andrew Horn de Borba  
1.2. Título: DATAQUERY

**2. CONTEXTUALIZAÇÃO DO TEMA**

O projeto DATAQUERY tem como objetivo criar um sistema para consultas rápidas e pré-definidas a partir de um único chamado, visando relatar dados de maneira prática e ágil. Este sistema será especialmente útil para lojistas, permitindo que o proprietário de uma empresa acompanhe o progresso de seu negócio de forma eficiente. O sistema possibilitará, por exemplo, a consulta de faturamento diário e mensal, total produzido e a produzir, ou o percentual de progresso de tarefas, entre outras métricas. Tudo isso será acessível por meio de um site, proporcionando ao usuário uma visão clara e atualizada das informações necessárias para a gestão eficaz de seu negócio.

**3. PROBLEMA E JUSTIFICATIVA**

A implementação da funcionalidade proposta apresenta desafios significativos, principalmente devido à necessidade de criar uma API que se conecte a vários bancos de dados e retorne dados de maneira segura e eficiente. Esse processo é complexo e envolve questões de segurança e controle de acesso, já que o sistema deve garantir que as informações sejam protegidas e acessíveis apenas aos usuários autorizados. Além disso, será necessário um planejamento detalhado para gerenciar o acesso individualizado por cliente, garantindo que cada um tenha seu próprio dispositivo e consultas personalizadas. A solução precisa lidar com a variedade de dados e consultas de forma robusta e segura, garantindo a integridade e confidencialidade das informações.

**4. OBJETIVOS**

4.1. Permitir que o usuário configure consultas de banco de dados (DB) para gerar relatórios categorizados.  
4.2. Controlar quais dispositivos podem acessar e processar as consultas.  
4.3. Gerenciar o uso da aplicação por diferentes funcionários e setores da empresa.

**5. HIPÓTESE (PROPOSTA DO PROJETO)**

5.1. Desenvolver um site responsivo e intuitivo para facilitar a organização das informações de cada cliente.  
5.2. Implementar um sistema de CRUD (Create, Read, Update, Delete) para gerenciar dados de clientes e dispositivos (CLIENTE X DEVICE - QUERY) em um banco de dados MySQL.  
5.3. Permitir que o usuário defina quais consultas serão realizadas, quais problemas serão reportados e quais dispositivos terão acesso às habilidades do sistema.  
5.4. Criar uma API que retorne respostas pré-formatadas com os dados consultados.  
5.5. A API deve consultar informações do cliente e acessar bancos de dados externos para recuperar dados relevantes.  
5.6. Suportar múltiplas consultas, que serão agrupadas por categorias específicas de consultas.

**ETAPA 2 - PLANEJAMENTO**

**1. RESULTADOS ESPERADOS**

1.1. Principais Funcionalidades do Sistema:

Implementação de um módulo CRUD para gerenciamento de clientes, que inclui a criação, leitura, atualização e exclusão de registros de dados relacionados a bancos de dados externos, consultas realizadas e dispositivos utilizados.
Desenvolvimento de uma API para permitir consultas aos dados dos clientes e retorno das informações de maneira formatada.

1.2. Impacto Esperado:
Facilitar o acompanhamento do progresso das empresas, proporcionando uma visão clara e atualizada das métricas de desempenho através de um sistema acessível e eficiente.
Criação de uma skill para Alexa que integrará com a API, permitindo consultas por meio de comandos de voz e simulando operações de uma empresa, o que melhorará a acessibilidade e a interação com o sistema.

**2. DEFINIÇÃO DA ARQUITETURA**

2.1. Partes do Sistema e Integrações:

Sistema Web: Interface principal para acesso e gerenciamento dos dados dos clientes.
API: Desenvolvida em Node.js, será responsável por consultar dados dos clientes, integrando-se com bancos de dados externos e retornando as informações necessárias de maneira segura e eficiente.
Banco de Dados: Utilização de MySQL 5.5 para o armazenamento e gerenciamento das informações.

2.2. Tecnologias e Ferramentas:
Sistema Web: Desenvolvimento em PHP para garantir compatibilidade e funcionalidades robustas.
API: Implementada em Node.js para suportar múltiplas consultas e retornos de dados.
Banco de Dados: MySQL 5.5 para o gerenciamento e armazenamento de dados.

2.3. Linguagens de Programação:
Frontend: HTML, CSS, PHP
Backend: JavaScript (Node.js)

IDEs e Ferramentas:
Banco de Dados: MySQL Query Browser para gerenciamento de banco de dados.
Desenvolvimento: VS Code para programação e desenvolvimento.
Diagrama de Casos de Uso: Criado com Canva para visualizar as interações dos usuários com o sistema.
Prototipação de Interfaces: Utilização de Moqups para criar protótipos interativos e visuais do sistema.
Diagrama das Tabelas do Banco de Dados: Modelagem das tabelas com MySQL Workbench.
Backlog: Gerenciado através do GitHub para rastreamento e gerenciamento das funcionalidades a serem desenvolvidas.

**3. ESPECIFICAÇÕES E MODELAGEM DO SOFTWARE**

3.1. Requisitos Funcionais:

O sistema deve permitir a criação, edição, bloqueio e exclusão de registros de clientes e seus dados associados.
A aplicação web deve ser compatível com os navegadores mais recentes e acessível de qualquer local, com segurança para proteção das informações sensíveis.
Implementação de mensagens de erro claras e precisas para situações em que a API não valide corretamente os dados dos clientes.

3.2. Requisitos Não Funcionais:

Desenvolvimento de uma skill para Alexa que permitirá consultas à API por meio de comandos de voz, simulando operações empresariais.
Implementação de um sistema de logs para monitorar e revisar erros e atividades do sistema.
Criação de um painel para visualização de métricas, incluindo total de chamados, número de clientes e erros ocorridos no dia.

3.3. Requisitos de Sistema:

O site deve ser acessível exclusivamente pelas empresas autorizadas, como empresas de sistemas de vendas ou de controle financeiro.
Garantir que o site esteja sempre disponível e operacional para os usuários autorizados.

----------------------------------
**REFERENCIAS**
Realizar a formatação das referências utilizando a norma NBR 6023. 
Sugestão: utilizar ferramenta MORE para geração automática das referências: https://more.ufsc.br/

https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ -> barra lateral, mas modifiquei bastante

