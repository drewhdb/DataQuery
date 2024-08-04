# projeto
Projeto integrador 2024
https://app.moqups.com/tZcdGBvl9FH6ElOaIDSi6uEe26MzgDiP/edit/page/a4ef3fe51

clientes campo link_trello
cliente -> cf1
estabelecimento -> est
est + mod -> esm
est + mod + ver -> esv

modulo -> mod
modulopai

scr
ved
ver

-- 
anotações campo lead


DOCUMENTAÇÃO 


**referencias**
Realizar a formatação das referências utilizando a norma NBR 6023. 
Sugestão: utilizar ferramenta MORE para geração automática das referências: https://more.ufsc.br/

https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ -> barra lateral, mas modifiquei bastante

----------------------------------
**ETAPA1 1 - PROJETO DE PESQUISA**

1. IDENTIFICAÇÃO DO PROJETO
Aluno integrante: Andrew Horn de Borba
Título (provisório): Oryx Support

2. CONTEXTUALIZAÇÃO DO TEMA
Organização de dados da empresa, a fim de armazenar e organizar dados importantes e demandas da empresa e dos clientes. 

A organização dos dados da empresa é algo crucial, e pensando nisso, foi notado na empresa Magnadata que não há uma organização dos dados de forma totalmente satisfatória: Temos dados espalhados em excels, vários sites em uso para organizar algumas coisas ou até mesmo dados não organizados. Ao ter os dados organizados e te fácil acesso, todas as demandas podem ser melhor planejada/executada sabendo aonde procurar os dados, e também evitará futuros problemas 

3. PROBLEMA E JUSTIFICATIVA
Entretanto, essa organização não é uma tarefa simples. Os funcionários da empresa que organizam os dados não conseguem fazer isso de forma tão prática e simples tendo todas as informações espalhadas, por isso é necessário uma aplicação para celular e computador, que permita a organização desses dados quando e onde quiser, além do fácil acesso a esses dados.

Apesar de existir alguns apps para documentar dados, a ideia da empresa ter o site do suporte é conseguir englobar mais de uma forma de anotação, uma junção do google keeps e trello - trazendo a área específica de controle de clientes e de dados da empresa - facilitando assim a organização. 

5. OBJETIVOS
Organizar e preservar os dados da empresa, centralizando os dados, tarefas e demais aplicações dentro do site. Também achar alguma forma de localizar outro site de maneira prática e rápida, armazenando o link do mesmo dentro do site do suporte.

6. HIPÓTESE (PROPOSTA DO PROJETO)
Fazer um site responsivo e intuitivo, para o suporte poder pegar dados ou anotar tarefas.

Anotações com base no app Google Keeps, mas adicionando a opção link que irá redirecionar para outros sites - para centralizar tudo.

Dados dos clientes baseado em CRUD com cliente X estabelecimento X módulo - versão e também baseado no excel, com colunas e linhas de forma mais prática para observação e edição de dados.

Armazenar arquivos do suporte no mesmo site

**ETAPA 2 - PLANEJAMENTO**

1. IDENTIFICAÇÃO DO PROJETO
Aluno integrante: Andrew Horn de Borba; 
Título (provisório): Oryx Support

2. RESULTADOS ESPERADOS
- Principais funcionalidades esperadas para o sistema:
CRUD de clientes funcional com analise de dados em tabela ou individual;
CRUD de anotações da empresa + view para aba lateral
CRUD das configurações da empresa

- Impacto esperado:
Iniciar o uso do sistema na empresa, para registrar dados dos clientes. O suporte da empresa iria usar para controle de dados, e praticidade na busca das informações da empresa

3. DEFINIÇÃO DA ARQUITETURA
Itens que poderão ser contemplados nesta seção:
- Apresentação das partes do sistema, possíveis integrações com aplicações, localização e contextualização do sistema dentro do ambiente já existente
    moqups
- Descrição das tecnologias a serem utilizadas:
    sistema web
- Linguagens de programação
    HTML, CSS e VUE.JS
- Bibliotecas
    Ionicons
- Banco de dados
    Mysql 5.5
- IDEs para o desenvolvimento
    Mysql Query Browser, VS Code

4. ESPECIFICAÇÕES E MODELAGEM DO SOFTWARE
Itens que poderão ser contemplados nesta seção:
- Requisitos do sistema (funcionais, não funcionais e de sistema)
    Permitir que os usuários façam login com um nome de usuário e senha, cadastrem, editem e excluam clientes, controlem anotações da empresa
    O sistema deve ser compatível com os navegadores mais recentes, acessível em qualquer lugar, seguro para guardar informações importantes
    O sistema deve ser leve e ter curto tempo de resposta, além de prático.

- Diagrama de casos de uso
    Envolve Login e cadastro. Não possui permissão por usuario. 

- Prototipação das interfaces do sistema
    Design intuitivo e de fácil acesso.
    Moqups
     
- Diagrama das tabelas do banco de dados
    Banco de dados está concluido.
    Fazer pelo Workbench
- Backlog com as funcionalidades a serem desenvolvidas
    Farei pelo Trello. Quero aprender VUE.JS antes
  
5. ATIVIDADES E CRONOGRAMA
Preencher o cronograma abaixo com a descrição das atividades a serem desenvolvidas (uma atividade por linha), apontando o período planejado para execução das atividades ao longo do período de execução dos projetos.

Descrição da atividade

Mai. **moqups e css do site para parte decorativa do site** 

Jun. **Aprender VUE.JS**

Jul. **Aprender VUE.JS e planejar parte lógica do site**

Ago. **Finalizar curso de VUE.JS e iniciar parte lógica do site**

Set. **terminar parte lógica (CRUD (tela clietes, tela anotações e tela configuração) , LOGIN e LOGOF)**  -- Apresentação do seminário de andamento

Out. **Integração com o busca cep - correios**

Nov. **planejar api da Alexa e da atualização automática no site e executar parte decorativa e lógica da api no site**

Dez. Entrega do artigo científico e apresentação final do projeto

