_# projeto Projeto integrador 2024 

https://app.moqups.com/tZcdGBvl9FH6ElOaIDSi6uEe26MzgDiP/edit/page/a4ef3fe51

fazer tela de retorno fazer tela de grupos fazer edição e cadastro de queryes e devices nos clientes Solicitação virar Device, selecionando cliente -> usar mesma tela, se $_GET cliente for vazio, poder escolher

DOCUMENTAÇÃO

referencias Realizar a formatação das referências utilizando a norma NBR 6023. Sugestão: utilizar ferramenta MORE para geração automática das referências: https://more.ufsc.br/

https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ -> barra lateral, mas modifiquei bastante

ETAPA1 1 - PROJETO DE PESQUISA

IDENTIFICAÇÃO DO PROJETO Aluno integrante: Andrew Horn de Borba Título (provisório): INTEGRAÇÃO COM ALEXA PARA CONSULTA DE DADOS EM UM BD

CONTEXTUALIZAÇÃO DO TEMA Fazer uma consulta em um banco de dados a partir de uma interação com a Alexa, com o intuito de relatar dados. Modelado em um cenário para lojistas, onde é de extrema importancia um dono de empresa saber como está o progresso de sua empresa. Pode ser usado para saber o faturamento diário e mensal, por exemplo, abrangindo diversas possibilidades onde o usuário possa controlar a partir de um site.

PROBLEMA E JUSTIFICATIVA Entretanto, essa funcionalidade não é uma tarefa simples. Será necessário criar uma Skill na Alexa onde consulte uma API, que retorne e relate esses dados pela Alexa, por consequencia poderá ter várias brechas na segurança e no controle de clientes, precisando assim de um planejamento mais elaborado com controle por cliente e cada cliente tendo seu aparelho e consulta.

O Fácil acesso á Alexa tornará extremamente prático para o dono saber a informação que quiser.

OBJETIVOS Relatar dados que o usuário programar para dizer, agrupando os dados em categorias e controlando qual Alexa pode falar, controlando o uso do cliente.

HIPÓTESE (PROPOSTA DO PROJETO) 1- Fazer um site responsivo e intuitivo, para o usuário organizar as informações; Dados dos clientes baseado em CRUD com cliente X DEVICE - QUERY. O Usuário poder ditar quais consultas, quais retornos de 'problemas' e quais Devices podem acessar a Skill.

2- Fazer uma Skill da Alexa; Essa Skill poderá ser baixada por qualquer um, e o controle ficará a partir do mesmo banco de dados que o site; A Skill fará validação de cliente, caso exista e não esteja bloqueado, retornará uma frase com os dados já prontos; Os dados serão retornados a partir de uma API;

3- fazer uma APi que retonre uma frase pronta com os dados já prontos; Consultar as informações do cliente e acessar um banco de dados externos para pegar os dados da consulta; Pode ter N consultas e serão agrupadas por uma categoria de queryes;

ETAPA 2 - PLANEJAMENTO

RESULTADOS ESPERADOS
Principais funcionalidades esperadas para o sistema: CRUD de clientes com registro de dados de banco de dados externo, consultas e aparelhos; CRUD de retornos de frases da Alexa caso a validação não esteja ok; Criação da Skill da Alexa; Criação da API para consulta de dados do cliente;

Impacto esperado: Vender para nossos clientes na empresa onde trabalho, onde eles usam para saber sobre faturamento, progressos e etc;

DEFINIÇÃO DA ARQUITETURA Itens que poderão ser contemplados nesta seção:
Apresentação das partes do sistema, possíveis integrações com aplicações, localização e contextualização do sistema dentro do ambiente já existente moqups
Descrição das tecnologias a serem utilizadas: sistema web e API, além de ALEXA SKILLS KIT
Linguagens de programação HTML, CSS e PHP; JS (Node.js) para a API
Banco de dados Mysql 5.5
IDEs para o desenvolvimento Mysql Query Browser, VS Code;
ESPECIFICAÇÕES E MODELAGEM DO SOFTWARE Itens que poderão ser contemplados nesta seção:
Requisitos do sistema (funcionais, não funcionais e de sistema) Permitir que os usuários cadastrem, editem, bloqueiem e excluam clientes e seus dados; O sistema deve ser compatível com os navegadores mais recentes, acessível em qualquer lugar, seguro para guardar informações importantes O sistema deve ser leve e ter curto tempo de resposta, além de prático. A Alexa deverá dizer detalhadamente os dados necessários; A API deve ser segura e suportar todas as conexões com o BD

Diagrama de casos de uso canva

Prototipação das interfaces do sistema Moqups

Diagrama das tabelas do banco de dados Workbench

Backlog com as funcionalidades a serem desenvolvidas Farei pelo Trello.

ATIVIDADES E CRONOGRAMA
Jul. Finalizar site com CRUD de tudo completo.

Ago. Finalizar API da Alexa

Set. Criar política de dados -- Apresentação do seminário de andamento

Out. Lançar a Skill publicamente

Nov. Testar diferentes cenários e analisar melhorias

Dez. Entrega do artigo científico e apresentação final do projeto



Programação:

1. achar vinculo da Alexa para permissões :: deviceID
2. criar BD relacional :: Alexa
3. fazer conexão com o BD para validação de aparelho e cliente :: feito
4. fazer chamada a API para busca de dados para a Alexa
5. construir controlador disso tudo no site do suporte

melhorias
6. fazer relatórios personalizados com filtros 
  -> reprompt com tipos de relatórios. Conforme o BI?
  -> estudar maneira de filtragem direto pela Alexa


para a API:

- receber solicitação com chave cliente, query e validação
- buscar nos dados do cliente a conexão com o BD e fazer select conforme query recebido -> criar tabela query com chave e query
- retornar dados 
