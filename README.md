Projeto integrador 2024
**DataQuery**

----------------------------------
** FUNCIONAMENTO
- Fluxograma da Alexa e API e Diagrama de casos de uso:
https://www.canva.com/design/DAGBsv26MYc/1_93cT9uQputTXvGIbSkCQ/edit

- Layout Site
https://app.moqups.com/tZcdGBvl9FH6ElOaIDSi6uEe26MzgDiP/edit/page/a4ef3fe51

fazer tela de retorno
fazer tela de grupos
fazer edição e cadastro de queryes e devices nos clientes
Solicitação virar Device, selecionando cliente -> usar mesma tela, se $_GET cliente for vazio, poder escolher

----------------------------------
** DOCUMENTAÇÃO 
**ETAPA1 1 - PROJETO DE PESQUISA**

1. IDENTIFICAÇÃO DO PROJETO
Aluno integrante: Andrew Horn de Borba
Título: DATAQUERY

2. CONTEXTUALIZAÇÃO DO TEMA
Fazer uma consulta em um banco de dados a partir de uma interação com a Alexa, com o intuito de relatar dados. Modelado em um cenário para lojistas, onde é de extrema importancia um dono de empresa saber como está o progresso de sua empresa. Pode ser usado para saber o faturamento diário e mensal, por exemplo, abrangindo diversas possibilidades onde o usuário possa controlar a partir de um site.

3. PROBLEMA E JUSTIFICATIVA
Entretanto, essa funcionalidade não é uma tarefa simples. Será necessário criar uma Skill na Alexa onde consulte uma API, que retorne e relate esses dados pela Alexa, por consequencia poderá ter várias brechas na segurança e no controle de clientes, precisando assim de um planejamento mais elaborado com controle por cliente e cada cliente tendo seu aparelho e consulta.

O Fácil acesso á Alexa tornará extremamente prático para o dono saber a informação que quiser.

5. OBJETIVOS
Relatar a partir de consultas de DB que o usuário programar para dizer, agrupando os dados em categorias e controlando qual Alexa pode falar os dados, controlando assim o uso do cliente.

6. HIPÓTESE (PROPOSTA DO PROJETO)
1- Fazer um site responsivo e intuitivo, para o usuário organizar as informações de cada cliente;
Dados dos clientes baseado em CRUD com cliente X DEVICE - QUERY.
O Usuário poder ditar quais consultas, quais retornos de 'problemas' e quais Devices podem acessar a Skill.

2- Fazer uma Skill da Alexa;
Essa Skill poderá ser baixada por qualquer um, e o controle ficará a partir do mesmo banco de dados que o site;
A Skill fará validação de cliente, caso exista e não esteja bloqueado, retornará uma frase com os dados já prontos;
Os dados serão retornados a partir de uma API;

3- fazer uma APi que retonre uma frase pronta com os dados já prontos;
Consultar as informações do cliente e acessar um banco de dados externos para pegar os dados da consulta;
Pode ter N consultas e serão agrupadas por uma categoria de queryes;

**ETAPA 2 - PLANEJAMENTO**

2. RESULTADOS ESPERADOS
- Principais funcionalidades esperadas para o sistema:
CRUD de clientes com registro de dados de banco de dados externo, consultas e aparelhos;
Edição de textos de retornos de frases da Alexa caso a validação não esteja ok;
Criação da Skill da Alexa;
Criação da API para consulta de dados do cliente;

- Impacto esperado:
Usuários da Alexa usarem para saber informações conforme o banco de dados deles, exemplo para saber sobre lucros e dividas, progressos de projetos e etc;

3. DEFINIÇÃO DA ARQUITETURA
Itens que poderão ser contemplados nesta seção:
- Apresentação das partes do sistema, possíveis integrações com aplicações, localização e contextualização do sistema dentro do ambiente já existente
    moqups
    Canva
    Alexa Skill Kit da Amazon
- Descrição das tecnologias a serem utilizadas:
    sistema web em php e API em node.js, além de ALEXA SKILLS KIT da própria
- Linguagens de programação
    HTML, CSS e PHP; JS (Node.js) para a API
- Banco de dados
    Mysql 5.5
- IDEs para o desenvolvimento
    Mysql Query Browser, VS Code;

4. ESPECIFICAÇÕES E MODELAGEM DO SOFTWARE
Itens que poderão ser contemplados nesta seção:
- Requisitos do sistema (funcionais, não funcionais e de sistema)
    Permitir que os usuários cadastrem, editem, bloqueiem e excluam clientes e seus dados;
    O sistema deve ser compatível com os navegadores mais recentes, acessível em qualquer lugar, seguro para guardar informações importantes
    O sistema deve ser leve e ter curto tempo de resposta, além de prático.
    A Alexa deverá dizer detalhadamente os dados necessários;
    A API deve ser segura e suportar todas as conexões com o BD

- Diagrama de casos de uso
    canva

- Prototipação das interfaces do sistema
    Moqups
     
- Diagrama das tabelas do banco de dados
    Workbench

- Backlog com as funcionalidades a serem desenvolvidas
    Farei pelo Github mesmo.
  
5. ATIVIDADES E CRONOGRAMA

Jul. **Finalizar API da Alexa** - ok

Ago. **Finalizar site com CRUD de tudo completo.**

Set. **Criar política de dados**  -- Apresentação do seminário de andamento

Out. **Lançar a Skill publicamente**

Nov. **Testar diferentes cenários e analisar melhorias**

Dez. Entrega do artigo científico e apresentação final do projeto

----------------------------------
**REFERENCIAS
Realizar a formatação das referências utilizando a norma NBR 6023. 
Sugestão: utilizar ferramenta MORE para geração automática das referências: https://more.ufsc.br/

https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ -> barra lateral, mas modifiquei bastante

