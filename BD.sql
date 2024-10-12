/* create user 'dataquery'@'%' identified by 'D4t4Qu3rY!!';
grant all privileges on dataquery.* to 'dataquery'@'%';
FLUSH PRIVILEGES; */

drop database if exists dataquery;
create database dataquery;
use dataquery;

-- solicitação de uso da skill, conforme aparelho
CREATE TABLE  `dataquery`.`slc` (
  `deviceid` varchar(300) NOT NULL,
  `nome` varchar(20) DEFAULT NULL,
  `data_solicitacao` datetime,
  `bloqueado` decimal(1,0) DEFAULT '0',
  `tentativas` int(11) DEFAULT '0',
  PRIMARY KEY (`deviceid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- mensagens de retorno
CREATE TABLE  `dataquery`.`rtn` (
  `chave` varchar(30) NOT NULL,
  `texto` text NOT NULL,
  PRIMARY KEY (`chave`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into rtn values ('novaSolicitacao', 'Parece que é a primeira vez que você está executando a skill nesse aparelho. Vou enviar uma solicitação para a equipe Magnadata analisar seu aparelho.');
insert into rtn values ('repeteSolicitacao', 'Este aparelho está aguardando resposta da solicitação. Se desejar, contate a Magnadata para pedir admissão.');
insert into rtn values ('bloqueioSolicitacao', 'Sua solicitação para esse aparelho foi bloqueada pelos provedores da Skill.');
insert into rtn values ('bloqueioDevice', 'Este aparelho está bloqueado para o uso dessa Skill.');
insert into rtn values ('dadosInvalidos', 'Revise os dados de configuração e tente novamente mais tarde.');

-- cliente, grupo de queryes do cliente e queryes do cliente
CREATE TABLE  `dataquery`.`cli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` varchar(20) NOT NULL,
  `bloqueado` tinyint DEFAULT '0',
  `user` varchar(10) DEFAULT NULL,
  `pass` varchar(30) DEFAULT NULL,
  `port` int(5) DEFAULT NULL,
  `host` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE  `dataquery`.`grp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` int(11) NOT NULL DEFAULT '0',
  `grupo` varchar(30) NOT NULL,
  `ativo` tinyint DEFAULT 1,
  PRIMARY KEY (`id`,`cliente`),
  KEY `dvc_fk_1` (`cliente`),
  CONSTRAINT `dvc_fk_1` FOREIGN KEY (`cliente`) REFERENCES `cli` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE  `dataquery`.`qry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` int(11) NOT NULL DEFAULT '0',
  `grupo` int(11) NOT NULL DEFAULT '0',
  `descricao` text NOT NULL,
  `query` text NOT NULL,
  `ativo` tinyint DEFAULT 1,
  PRIMARY KEY (`id`,`cliente`,`grupo`),
  KEY `qry_fk_cliente` (`cliente`),
  KEY `qry_fk_grupo` (`grupo`),
  CONSTRAINT `qry_fk_cliente` FOREIGN KEY (`cliente`) REFERENCES `cli` (`id`) ON DELETE CASCADE,
  CONSTRAINT `qry_fk_grupo` FOREIGN KEY (`grupo`) REFERENCES `grp` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- device dos clientes, log dos devices
CREATE TABLE  `dataquery`.`dvc` (
  `cliente` int(11) NOT NULL,
  `deviceid` varchar(300) NOT NULL,
  `descricao` varchar(100) DEFAULT '',
  `data_criacao` datetime,
  `bloqueado` decimal(1,0) DEFAULT '0',
  PRIMARY KEY (`deviceid`,`cliente`),
  KEY `dvc_fk_cliente` (`cliente`),
  CONSTRAINT `dvc_fk_cliente` FOREIGN KEY (`cliente`) REFERENCES `cli` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE  `dataquery`.`log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(300) NOT NULL,
  `chave` text NOT NULL,
  `texto` text,
  `horario` datetime,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`,`deviceid`),
  KEY `log_fk_1` (`deviceid`),
  CONSTRAINT `log_fk_1` FOREIGN KEY (`deviceid`) REFERENCES `dvc` (`deviceid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='status: 1 - inicio. 2 - alerta. 3 - erro. 4 - retorno.';


-- cliente bebelandia
insert into cli values (1, 'teste', 1, 'root', 'j4c4r3z40!', 3306, '192.168.1.13');
insert into grp values (1, 1, 'faturamento diário', 1);
insert into qry (cliente, grupo, query, descricao) values (1, 1,'select FLOOR(value) as \'total vendido\' from bebelandia.pdv_valor_vendas;', 'total vendido');
insert into qry (cliente, grupo, query, descricao) values (1, 1, 'select FLOOR(value) as \'total de vendas\' from bebelandia.pdv_tot_vendas;', 'total de vendas');
insert into qry (cliente, grupo, query, descricao) values (1, 1, 'select value as \'novos clientes\' from bebelandia.pdv_qtde_vendas_novos_clientes;', 'novos clientes');
insert into qry (cliente, grupo, query, descricao) values (1, 1, 'select value as \'total de peças vendidos\' from bebelandia.pdv_tot_qtde_vendas;', 'total de peças vendidas');

insert into dvc values (1, '_teste1', 'Device com erro', now(), 0);
insert into dvc values (1, '_teste2_amzn1.ask.device.AMARFMWRHFYMHA7FNXXV7DK5INXLGKPQHGGWBUAH27PDHQY6SATI4XZPT7NE65BRWR3TEDS5EG7HAJAYQYG5SC6XIHUVTWAGTHSNJRGVQESDUROUJ23ILBV7WR3N4SZ7X7V7FLEMSR5VXPQX3TVMAJY52C2ZI3EKTJVV4D3OIAQBK4VINFLZPVES7NWZQYKM34FQI7OP5BRLLDAV', 'device bloqueado', now(), 1);
insert into dvc values (1, 'amzn1.ask.device.AMAQRJT7SGBHDBYW3EQSJ5NPO52UKCC5AJV6SSJLZ3FCALG6OZOPDZEIOFIJP7TWFMX5OSWK4WZOA2ZPR2AXXB2E67S4VUP25T33ECQNZGAG56NJ3UAXMALQ6JNKX7AWYWLMJX63T6HK6OWZ35OZJ4TQ7UUUQJXLL6GVBSXOP5CLCOFF3ZCVAIOPMDMSUL2YHLCC4SEY4SBL6ZG3', 'Alexa Andrew', now(), 0);


/*
-- cliente loja
insert into cli values (2, 'loja', 1, 'root', 'j4c4r3z40!', 3306, '187.0.7.139');
insert into grp values (1, 2, 'faturamento mensal', 1);
insert into grp values (2, 2, 'faturamento diário', 1);
insert into qry (cliente, grupo, query, descricao) values (2, 1,'select FLOOR(value) as \'total vendido\' from bebelandia.pdv_valor_vendas;', 'total vendido');
insert into qry (cliente, grupo, query, descricao) values (2, 1, 'select FLOOR(value) as \'total de vendas\' from bebelandia.pdv_tot_vendas;', 'total de vendas');
insert into qry (cliente, grupo, query, descricao) values (2, 2, 'select value as \'novos clientes\' from bebelandia.pdv_qtde_vendas_novos_clientes;', 'novos clientes');
insert into qry (cliente, grupo, query, descricao) values (2, 2, 'select value as \'total de peças vendidos\' from bebelandia.pdv_tot_qtde_vendas;', 'total de peças vendidas');

insert into dvc values (2, '_teste1', 'Device com erro', now(), 0);
insert into dvc values (2, '_teste2_amzn1.ask.device.AMARFMWRHFYMHA7FNXXV7DK5INXLGKPQHGGWBUAH27PDHQY6SATI4XZPT7NE65BRWR3TEDS5EG7HAJAYQYG5SC6XIHUVTWAGTHSNJRGVQESDUROUJ23ILBV7WR3N4SZ7X7V7FLEMSR5VXPQX3TVMAJY52C2ZI3EKTJVV4D3OIAQBK4VINFLZPVES7NWZQYKM34FQI7OP5BRLLDAV', 'device bloqueado', now(), 1);
insert into dvc values (2, 'amzn1.ask.device.AMAQRJT7SGBHDBYW3EQSJ5NPO52UKCC5AJV6SSJLZ3FCALG6OZOPDZEIOFIJP7TWFMX5OSWK4WZOA2ZPR2AXXB2E67S4VUP25T33ECQNZGAG56NJ3UAXMALQ6JNKX7AWYWLMJX63T6HK6OWZ35OZJ4TQ7UUUQJXLL6GVBSXOP5CLCOFF3ZCVAIOPMDMSUL2YHLCC4SEY4SBL6ZG3', 'Alexa Andrew', now(), 0);
*/
