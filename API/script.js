const http = require('http');
const express = require('express');
const app = express();
const port = 89;

const mysql = require('mysql2/promise');

const cors = require('cors');
app.use(cors());

// CRIAÇÃO DAS VARIAVEIS
let deviceId, connection, clientes = [],
bloqueioDevice, bloqueioSolicitacao, novaSolicitacao, repeteSolicitacao;

// CONEXÃO COM O BANCO PRINCIPAL
const dbConfig = {
    host: '187.0.7.139',
    user: 'alexa',
    password: 'Al3x4!!',
    port: '3306',
    database: 'alexa'
};

app.get('/alexa/script.js', async (req, res) => {
    /* -- VALIDAÇÃO DO DEVICE ID -- */
    deviceId = req.query.deviceId;
    if (!deviceId || deviceId.length < 250) {
        return res.status(200).send({'return' : 'Parâmetro "deviceId" é necessário.'});
    }

    /* -- DECLARAÇÃO DOS RETORNOS -- */
    pegaRetornos();

    /* -- VALIDAÇÃO -- */
    // QUERY DEVICE
	let queryDevice = 'SELECT * from dvc where deviceid = \'' + deviceId + '\';';
	
	try {
        connection = await mysql.createConnection(dbConfig);

		cli_dvc = await connection.execute(queryDevice);
        cli_dvc.pop();

        connection.end();        
    } catch (error) {
        return res.status(200).send({'return' : 'Erro ao se conectar ao banco de dados principal.' + error});
    }
    
    // testar se o Device existe no DVC
    if(cli_dvc[0].length > 0){
        if (validacao()){
            consulta();
        }
    // testar se existe solicitação
    } else {
        consultaSolicitacao();
    }
});

function consulta(){
    log('consulta', 'inicio da consulta', 1);

}

function validacao(){
    // filtra clientes ativos
    cli_dvc[0].forEach(element => {
        if (element['bloqueado'] == 1){
            log('device_cliente', 'device bloqueado para o cliente ' + element['cliente'], 2);
        } else {
            clientes.push(element);
        }        
    });
    // testa se possui cliente valido
    if (clientes.length === 0){
        log('retorno','não foi encontrado nenhum device válido', 3);
        return res.status(200).send({'return' : bloqueioDevice});
    }
    //testa clientes
    for (let i = 0; i < clientes.length; i++) {
        let queryCliente = 'Select * from cli where cli.id = \'' + clientes[i]['cliente'] + '\';'; 
        let queryGrupos = 'Select * from grp where grp.cliente = \'' + clientes[i]['cliente'] + '\';'; 
        try {
            connection = mysql.createConnection(dbConfig);
            
            cliente = connection.execute(queryCliente);
            cliente = cliente[0][0];
            
            if(cliente['bloqueado'] == 1){
                log('consulta', 'cliente ' + cliente['cliente'] + ' bloqueado.', 2);
            } else if (testarConexao(cliente) == 0){
                log('falha na conexão', 'cliente ' + cliente['cliente'] + ' sem acesso ao banco de dados.', 2);
            } else {
                let grp_cli = connection.execute(queryGrupos);
                grp_cli.pop();

                // testa grupos
                if(grp_cli[0].length > 0){
                    // filtra grupos ativos
                    let grupos = [];
                    grp_cli[0].forEach(element => {
                        if (element['ativo'] == 0){
                            log('consulta cliente ' + element['cliente'], 'grupo inativo ' + element['grupo'], 2);
                        } else {
                            grupos.push(element);
                        }
                    });
                                           
                    if (grupos.length === 0){
                        log('consulta cliente ' + cliente['cliente'], 'Todos os grupos estão inativos', 2);
                        clientes = clientes.filter(item => item['cliente'] !== cliente['id']);
                        if (clientes.length === 0){
                            log('retorno','não foi encontrado nenhum device válido', 3);
                            return res.status(200).send({'return' : bloqueioDevice});
                        }
                    } else {
                        // testa queryes
                    }
                } else{
                    log('retorno', 'nenhum grupo para o cliente ' + cliente['cliente'], 3);
                }
            }
            connection.end();        
        } catch (error) {
            return res.status(200).send({'return' : 'Erro ao se conectar ao banco de dados principal.' + error});
        }
    }
}

async function pegaRetornos() {	
    // QUERYES RETORNOS
    let queryBloqueioDevice = 'SELECT texto as bloqueioDevice FROM rtn where chave = \'bloqueioDevice\';';
    let queryBloqueioSolicitacao = 'SELECT texto as bloqueioSolicitacao FROM rtn where chave = \'bloqueioSolicitacao\';';
    let queryNovaSolicitacao = 'SELECT texto as novaSolicitacao FROM rtn where chave = \'novaSolicitacao\';';
    let queryRepeteSolicitacao = 'SELECT texto as repeteSolicitacao FROM rtn where chave = \'repeteSolicitacao\';';

    // PEGA RETORNOS NO BANCO DE DADOS PRINCIPAL
    try {
        connection = await mysql.createConnection(dbConfig);

        resposta = await connection.execute(queryBloqueioDevice);
		bloqueioDevice = resposta[0][0]['bloqueioDevice'];
		resposta = await connection.execute(queryBloqueioSolicitacao);
		bloqueioSolicitacao = resposta[0][0]['bloqueioSolicitacao'];
		resposta = await connection.execute(queryNovaSolicitacao);
		novaSolicitacao = resposta[0][0]['novaSolicitacao'];
		resposta = await connection.execute(queryRepeteSolicitacao);
		repeteSolicitacao = resposta[0][0]['repeteSolicitacao'];

		connection.end();        
    } catch (error) {
        return res.status(200).send({'return' : 'Erro ao se conectar ao banco de dados principal.' + error});
    }
}

async function log(chave, texto, status) {
	let query = 'INSERT INTO log (deviceId, horario, chave, texto, status) values (\'' + deviceId + '\', now(), \'' + chave + '\', \'' + texto + '\', \'' + status + '\');';
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(query);
        await connection.end();
        
    } catch (error) {
        console.error('Erro ao inserir log.', error);
    }
}

async function testarConexao(cliente) {
    console.log('foi a conexão');
    let status = 0; // Valor padrão é 0 (erro)
    try {
      // Cria uma conexão com o banco de dados usando Promises
      const conexao = await mysql.createConnection({
        host: cliente.host,
        user: cliente.user,
        password: cliente.pass,
        port: cliente.port
      });
  
      // Se conectar sem erros, define o status como 1
      status = 1;
  
      // Fecha a conexão
      await conexao.end();
    } catch (err) {
      // Se ocorrer um erro, o status permanece como 0
      console.error('Erro ao conectar:', err);
    }
  
    // Retorna o status
    return status;
}

http.createServer(app).listen(port, () => {
    console.log(`Server running at port ${port}`);
});
