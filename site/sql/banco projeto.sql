-- Deleta o banco de dados 'projeto' caso exista
DROP DATABASE IF EXISTS projeto;

-- Cria o banco de dados 'projeto'
CREATE DATABASE projeto;

-- Define o banco de dados a ser utilizado
USE projeto;

-- Criação da tabela de usuários para acesso ao sistema
CREATE TABLE usr (
    usrid INT PRIMARY KEY AUTO_INCREMENT,
    usrnome VARCHAR(30),
    usrsenha VARCHAR(20),
    usrcriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usrativo INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Inserção de usuários na tabela 'usr'
INSERT INTO usr (usrnome, usrsenha) VALUES
    ('Andrew', 'senha'),
    ('Luan', 'senha'),
    ('Braian', 'senha');

-- Criação da tabela de anotações
CREATE TABLE nta (
    ntaid INT PRIMARY KEY AUTO_INCREMENT,
    ntatitulo VARCHAR(20) NOT NULL,
    ntainfo VARCHAR(60) DEFAULT '',
    ntaconteudo LONGTEXT,
    ntacriador INT NOT NULL,
    ntacriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ntalink DECIMAL(1,0) DEFAULT 0,
    ntalinkdir VARCHAR(250),
    CONSTRAINT fk_nta_criador FOREIGN KEY (ntacriador) REFERENCES usr (usrid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de sistemas
CREATE TABLE sis (
    sisid INT PRIMARY KEY AUTO_INCREMENT,
    sisdesc VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de módulos
CREATE TABLE mdl (
    mdlmodulo INT PRIMARY KEY AUTO_INCREMENT,
    mdlsistema INT NOT NULL,
    mdldesc VARCHAR(100),
    CONSTRAINT fk_mdl_sis FOREIGN KEY (mdlsistema) REFERENCES sis (sisid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Inserção de sistemas na tabela 'sis'
INSERT INTO sis (sisdesc) VALUES
    ('GESTÃO'),
    ('PLACE'),
    ('MEMORIES'),
    ('ESQUADRIAS'),
    ('PDV'),
    ('WHATSAPP'),
    ('LOGISTICA');

-- Inserção de módulos na tabela 'mdl'
INSERT INTO mdl (mdldesc, mdlsistema) VALUES
    ('OUTDOOR', 1),
    ('GERTEC', 1),
    ('ORYXNFE', 2),
    ('BI', 1),
    ('BI', 2),
    ('BI', 3),
    ('BI', 4),
    ('BI', 5),
    ('ALEXA', 1),
    ('ALEXA', 2),
    ('ALEXA', 3),
    ('ALEXA', 4),
    ('ALEXA', 5),
    ('TEF', 5),
    ('MODULO1', 6),
    ('MODULO2', 6),
    ('MODULO3', 6),
    ('MODULO4', 6),
    ('MODULO5', 6),
    ('MODULO6', 6);

-- Criação da tabela de tipos de estabelecimentos
CREATE TABLE tpo (
    tpotipo INT PRIMARY KEY AUTO_INCREMENT,
    tpodesc VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Inserção de tipos de estabelecimentos na tabela 'tpo'
INSERT INTO tpo (tpodesc) VALUES
    ('Filial'),
    ('Matriz');

-- Criação da tabela de shoppings
CREATE TABLE shp (
    shpshopping INT PRIMARY KEY AUTO_INCREMENT,
    shpapelido VARCHAR(10) DEFAULT '',
    shpdesc VARCHAR(40) NOT NULL,
    shpatacado INT DEFAULT 0,
    shplocal VARCHAR(30) DEFAULT '',
    shpintegra VARCHAR(30) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Inserção de shoppings na tabela 'shp'
INSERT INTO shp (shpapelido, shpdesc, shplocal, shpatacado, shpintegra) VALUES
    ('CCF', 'Centro de Compras Farroupilha', 'Farroupilha - RS', 0, ''),
    ('FAC', 'Farroupilhas center', 'Farroupilha - RS', 1, ''),
    ('585', '', 'Farroupilha - RS', 1, ''),
    ('GOLDEN', 'Golden Center', 'Farroupilha - RS', 1, 'Ezetech'),
    ('CCB', 'Centro de Compras Bom Principio', 'Bom Principio - RS', 0, ''),
    ('LITORAL', 'Shopping Litoral', 'Litoral - SC', 0, 'ibasi'),
    ('BRUSQUE', '', 'Brusque - SC', 0, 'ibasi');

-- Criação da tabela de bancos
CREATE TABLE bnc (
    bncbanco INT(4) PRIMARY KEY,
    bncdesc VARCHAR(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Inserção de bancos na tabela 'bnc'
INSERT INTO bnc VALUES
    ('0001', 'BANCO DO BRASIL'),
    ('0748', 'SICREDI'),
    ('0756', 'SICOOB');

-- Criação da tabela de clientes principais
CREATE TABLE cl1 (
    cl1cliente INT PRIMARY KEY AUTO_INCREMENT,
    cl1nome VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de estabelecimentos, matriz ou filiais de um cliente
CREATE TABLE cl2 (
    cl2est INT PRIMARY KEY AUTO_INCREMENT,
    cl2cliente INT NOT NULL,
    cl2nome VARCHAR(50) NOT NULL,
    cl2tipoest INT,
    cl2shopping INT,
    cl2cnpj VARCHAR(18) DEFAULT '',
    cl2gerente VARCHAR(50) DEFAULT '',
    cl2ctt VARCHAR(15) DEFAULT '',
    cl2fim TIMESTAMP,
    cl2inicio TIMESTAMP,
    cl2pais VARCHAR(50) NOT NULL DEFAULT 'Brasil',
    cl2estado VARCHAR(2) NOT NULL,
    cl2cidade VARCHAR(50) NOT NULL,
    cl2obs LONGTEXT,
    cl2acesso LONGTEXT,
    cl2ender LONGTEXT,
    cl2link LONGTEXT,
    CONSTRAINT fk_cl2_cl1 FOREIGN KEY (cl2cliente) REFERENCES cl1 (cl1cliente),
    CONSTRAINT fk_cl2_tpo FOREIGN KEY (cl2tipoest) REFERENCES tpo (tpotipo),
    CONSTRAINT fk_cl2_shp FOREIGN KEY (cl2shopping) REFERENCES shp (shpshopping)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de histórico do cliente
CREATE TABLE cl3 (
    cl3id INT PRIMARY KEY AUTO_INCREMENT,
    cl3est INT,
    cl3desc VARCHAR(50),
    cl3data DATETIME,
    cl3resp INT,
    CONSTRAINT fk_cl3_responsavel FOREIGN KEY (cl3resp) REFERENCES usr (usrid),
    CONSTRAINT fk_cl3_cl2 FOREIGN KEY (cl3est) REFERENCES cl2 (cl2est)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de bancos do cliente
CREATE TABLE cl4 (
    cl4est INT,
    cl4banco INT(4),
    PRIMARY KEY (cl4est, cl4banco),
    CONSTRAINT fk_cl4_cl2 FOREIGN KEY (cl4est) REFERENCES cl2 (cl2est),
    CONSTRAINT fk_cl4_bnc FOREIGN KEY (cl4banco) REFERENCES bnc (bncbanco)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de sistemas dos clientes
CREATE TABLE cl5 (
    cl5est INT,
    cl5sistema INT,
    cl5versao VARCHAR(10) DEFAULT '',
    cl5resp INT NOT NULL,
    cl5inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cl5respatt INT,
    cl5atualiz TIMESTAMP,
    PRIMARY KEY (cl5est, cl5sistema),
    CONSTRAINT fk_cl5_cl2 FOREIGN KEY (cl5est) REFERENCES cl2 (cl2est),
    CONSTRAINT fk_cl5_mdl FOREIGN KEY (cl5sistema) REFERENCES sis (sisid),
    CONSTRAINT fk_cl5_responsavel FOREIGN KEY (cl5resp) REFERENCES usr (usrid),
    CONSTRAINT fk_cl5_responsavel_atualizacao FOREIGN KEY (cl5respatt) REFERENCES usr (usrid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de módulos dos clientes
CREATE TABLE cl6 (
    cl6est INT,
    cl6sistema INT,
    cl6modulo INT,
    cl6versao VARCHAR(10) DEFAULT '',
    cl6resp INT NOT NULL,
    cl6inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cl6respatt INT,
    cl6atualiz TIMESTAMP,
    PRIMARY KEY (cl6est, cl6sistema, cl6modulo),
    CONSTRAINT fk_cl6_cl5 FOREIGN KEY (cl6est, cl6sistema) REFERENCES cl5 (cl5est, cl5sistema),
    CONSTRAINT fk_cl6_mdl FOREIGN KEY (cl6modulo) REFERENCES mdl (mdlmodulo),
    CONSTRAINT fk_cl6_responsavel FOREIGN KEY (cl6resp) REFERENCES usr (usrid),
    CONSTRAINT fk_cl6_responsavel_atualizacao FOREIGN KEY (cl6respatt) REFERENCES usr (usrid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Criação da tabela de pdv
CREATE TABLE pdv (
    pdvest INT,
    pdvsistema INT,
    pdvexe char(100) not null,
    pdvhost char(100) not null,
    pdvweb int not null,
    pdvsrvc int not null,
    pdvgtw int not null,
    pdvhostext int not null,
    pdvhost2ext int not null,
    pdvwebext int not null,
    pdvgtwext int not null,
    PRIMARY KEY (pdvest, pdvsistema),
    CONSTRAINT fk_pdv_cl2 FOREIGN KEY (pdvest) REFERENCES cl2 (cl2est),
    CONSTRAINT fk_pdv_mdl FOREIGN KEY (pdvsistema) REFERENCES sis (sisid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
