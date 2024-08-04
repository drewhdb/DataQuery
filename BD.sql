drop database if exists alexa;
create database alexa;
use alexa;

-- mensagens de retorno
CREATE TABLE `rtn` (
  `chave` varchar(30) NOT NULL,
  `texto` text NOT NULL,
  PRIMARY KEY (`chave`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into rtn values ('novaSolicitacao', 'Parece que é a primeira vez que você está executando a skill nesse aparelho. Vou enviar uma solicitação para a equipe Magnadata analisar seu aparelho.');
insert into rtn values ('repeteSolicitacao', 'Este aparelho está aguardando resposta da solicitação. Se desejar, contate a Magnadata para pedir admissão.');
insert into rtn values ('bloqueioSolicitacao', 'Sua solicitação para esse aparelho foi bloqueada pelos provedores da Skill.');
insert into rtn values ('bloqueioCliente', 'Você está bloqueado para o uso dessa Skill. Qualquer dúvida contate a Magnadata para entender o que aconteceu.');
insert into rtn values ('bloqueioDevice', 'Este aparelho está bloqueado para o uso dessa Skill.');

-- cliente, aparelho do cliente, grupo de queryes do cliente e queryes do cliente
CREATE TABLE  `alexa`.`cli` (
  `id` INT AUTO_INCREMENT,
  `cliente` varchar(20) NOT NULL,
  `bloqueado` decimal(1,0) DEFAULT '0',
  `user` varchar(10) DEFAULT NULL,
  `pass` varchar(30) DEFAULT NULL,
  `port` int(5) DEFAULT NULL,
  `host` varchar(15) DEFAULT NULL,
  `ultima_execucao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE  `alexa`.`dvc` (
  `cliente` INT NOT NULL,
  `deviceId` varchar(300) NOT NULL,
  `descricao` varchar(100) DEFAULT '',
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bloqueado` decimal(1,0) DEFAULT '0',
  PRIMARY KEY (`deviceId`,`cliente`),
  KEY `dvc_fk_1` (`cliente`),
  CONSTRAINT `dvc_fk_1` FOREIGN KEY (`cliente`) REFERENCES `cli` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE  `alexa`.`grp` (
  `id` INT AUTO_INCREMENT,
  `grupo` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE  `alexa`.`qry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente` INT NOT NULL,
  `query` text NOT NULL,
  `grupo` INT DEFAULT NULL,
  PRIMARY KEY (`id`,`cliente`),
  KEY `qry_fk_cliente` (`cliente`),
  KEY `qry_fk_grupo` (`grupo`),
  CONSTRAINT `qry_fk_cliente` FOREIGN KEY (`cliente`) REFERENCES `cli` (`id`) ON DELETE CASCADE,
  CONSTRAINT `qry_fk_grupo` FOREIGN KEY (`grupo`) REFERENCES `grp` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- solicitação de uso da skill, conforme aparelho
CREATE TABLE  `slc` (
  `deviceId` varchar(300) NOT NULL,
  `nome` varchar(20),
  `data_solicitacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bloqueado` decimal(1,0) DEFAULT '0',
  `tentativas` int(11) DEFAULT '0',
  PRIMARY KEY (`deviceId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into grp values (1, 'faturamento mensal'), (2, 'faturamento diário');

insert into cli values (1, 'bebelândia', 0, 'root', 'j4c4r3z40!', 3306, '187.0.7.139', null);
insert into dvc values (1, 'teste', 'Celular Andrew', now(), 0);
insert into dvc values (1, 'amzn1.ask.device.AMARFMWRHFYMHA7FNXXV7DK5INXLGKPQHGGWBUAH27PDHQY6SATI4XZPT7NE65BRWR3TEDS5EG7HAJAYQYG5SC6XIHUVTWAGTHSNJRGVQESDUROUJ23ILBV7WR3N4SZ7X7V7FLEMSR5VXPQX3TVMAJY52C2ZI3EKTJVV4D3OIAQBK4VINFLZPVES7NWZQYKM34FQI7OP5BRLLDAV', 'Celular Andrew', now(), 0);
insert into dvc values (1, 'amzn1.ask.device.AMAQRJT7SGBHDBYW3EQSJ5NPO52UKCC5AJV6SSJLZ3FCALG6OZOPDZEIOFIJP7TWFMX5OSWK4WZOA2ZPR2AXXB2E67S4VUP25T33ECQNZGAG56NJ3UAXMALQ6JNKX7AWYWLMJX63T6HK6OWZ35OZJ4TQ7UUUQJXLL6GVBSXOP5CLCOFF3ZCVAIOPMDMSUL2YHLCC4SEY4SBL6ZG3', 'Celular Andrew', now(), 0);
insert into qry (cliente, grupo, query) values (1, 1,'select FLOOR(value) as \'total vendido\' from bebelandia.pdv_valor_vendas;');
insert into qry (cliente, grupo, query) values (1, 1, 'select FLOOR(value) as \'total de vendas\' from bebelandia.pdv_tot_vendas;');
insert into qry (cliente, grupo, query) values (1, 2, 'select value as \'novos clientes\' from bebelandia.pdv_qtde_vendas_novos_clientes;');
insert into qry (cliente, grupo, query) values (1, 2, 'select value as \'total de peças vendidos\' from bebelandia.pdv_tot_qtde_vendas;');

insert into cli values (2, 'bebelândia loja', 0, 'root', 'j4c4r3z40!', 3306, '187.0.7.139', null);
insert into dvc values (2, 'teste', 'Celular Andrew', now(), 0);
insert into dvc values (2, 'amzn1.ask.device.AMARFMWRHFYMHA7FNXXV7DK5INXLGKPQHGGWBUAH27PDHQY6SATI4XZPT7NE65BRWR3TEDS5EG7HAJAYQYG5SC6XIHUVTWAGTHSNJRGVQESDUROUJ23ILBV7WR3N4SZ7X7V7FLEMSR5VXPQX3TVMAJY52C2ZI3EKTJVV4D3OIAQBK4VINFLZPVES7NWZQYKM34FQI7OP5BRLLDAV', 'Celular Andrew', now(), 0);
insert into dvc values (2, 'amzn1.ask.device.AMAQRJT7SGBHDBYW3EQSJ5NPO52UKCC5AJV6SSJLZ3FCALG6OZOPDZEIOFIJP7TWFMX5OSWK4WZOA2ZPR2AXXB2E67S4VUP25T33ECQNZGAG56NJ3UAXMALQ6JNKX7AWYWLMJX63T6HK6OWZ35OZJ4TQ7UUUQJXLL6GVBSXOP5CLCOFF3ZCVAIOPMDMSUL2YHLCC4SEY4SBL6ZG3', 'Celular Andrew', now(), 0);
insert into qry (cliente, grupo, query) values (2, 1,'select FLOOR(value) as \'total vendido\' from bebelandia.pdv_valor_vendas;');
insert into qry (cliente, grupo, query) values (2, 1, 'select FLOOR(value) as \'total de vendas\' from bebelandia.pdv_tot_vendas;');
insert into qry (cliente, grupo, query) values (2, 2, 'select value as \'novos clientes\' from bebelandia.pdv_qtde_vendas_novos_clientes;');
insert into qry (cliente, grupo, query) values (2, 2, 'select value as \'total de peças vendidos\' from bebelandia.pdv_tot_qtde_vendas;');
