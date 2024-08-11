const http = require('http');
const express = require('express');
const app = express();
const port = 89;

const mysql = require('mysql2/promise');

const cors = require('cors');
app.use(cors());

// CRIAÇÃO DAS VARIAVEIS
let deviceId, connection,
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
    if (!deviceId || deviceId.length < 200) {
        return res.status(200).send({'return' : 'Parâmetro deviceId é necessário.'});
    }

    try {
        connection = await mysql.createConnection(dbConfig);
    } catch (error) {
        console.log('Erro ao se conectar ao banco de dados principal.' + error);
        return res.status(200).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }
    
    /* -- DECLARAÇÃO DOS RETORNOS -- */
    await pegaRetornos();

    /* -- VALIDAÇÃO -- */
    // Pegar dados vinculados a esse device
	let queryDevice = 'SELECT * from dvc where deviceid = \'' + deviceId + '\';';	
    let clientes_do_device = await connection.execute(queryDevice);
    clientes_do_device.pop();

    
    // testar se o Device existe no DVC
    if(clientes_do_device[0].length > 0){
        log('chamado', 'Inicio do chamado. Iniciando validação', 1);
        if (await validacao(clientes_do_device[0])){
            log('validado', 'Dados validados, iniciando consulta', 2);
            consulta();
        } else {
            log('retorno','não foi encontrado nenhum cliente válido', 3);
            return res.status(200).send({'return' : bloqueioDevice});
        }
    // testar se existe solicitação
    } else {
        consultaSolicitacao();
    }
});

async function validacao(clientes_do_device){
    //testa clientes
    let clientes = [];
    for (let i = 0; i < clientes_do_device.length; i++) {
        let queryCliente = 'Select * from cli where cli.id = \'' + clientes_do_device[i]['cliente'] + '\';'; 
        let cliente = await connection.execute(queryCliente);
        cliente = cliente[0][0];

        if(cliente['bloqueado'] == 1){
            log('consulta', 'cliente ' + cliente['cliente'] + ' bloqueado.', 2);
        } else if (await testarConexao(cliente) == 0){
            log('falha na conexão', 'cliente ' + cliente['cliente'] + ' sem acesso ao banco de dados.', 2);
        } else {
            let queryGrupos = 'Select * from grp where grp.cliente = \'' + clientes_do_device[i]['cliente'] + '\';'; 
            let grupos_do_cliente = await connection.execute(queryGrupos);
            grupos_do_cliente.pop();
            grupos_do_cliente = grupos_do_cliente[0];
            // testa grupos
            if(grupos_do_cliente.length > 0){
                // filtra grupos ativos
                let grupos = [];
                for (let g = 0; g < grupos_do_cliente.length; g++) {
                    if(grupos_do_cliente[g]['ativo'] == 1){
                        let queryQueryes = 'Select * from qry where qry.grupo = \'' + grupos_do_cliente[g]['id'] + '\' and qry.cliente = \'' + clientes_do_device[i]['cliente'] + '\';'; 
                        let queryes_do_grupo = await connection.execute(queryQueryes);
                        queryes_do_grupo.pop();
                        queryes_do_grupo = queryes_do_grupo[0];
                        // testa queryes
                        if(queryes_do_grupo.length > 0){
                            let queryes = [];
                            for (let q = 0; q < queryes_do_grupo.length; q++) {
                                if(queryes_do_grupo[q]['ativo'] == 1){
                                    queryes.push(queryes_do_grupo[q]);
                                }
                            }
                            if (queryes.length > 0) {
                                grupos.push(grupos_do_cliente[g]);
                            }
                        }
                    }
                }
                if (grupos.length === 0){
                    log('dados cliente ' + cliente['cliente'], 'Todos os grupos estão inativos', 2);
                } else {
                    clientes.push(cliente);
                }
            } else{
                log('retorno', 'nenhum grupo para o cliente ' + cliente['cliente'], 3);
            }
        }
    }
    console.log(clientes);
    // testa se possui cliente valido
    if (clientes.length > 0){
        return true;
    }
    return false;
}

function consulta(){
    
}

async function pegaRetornos() {	
    // QUERYES RETORNOS
    let queryBloqueioDevice = 'SELECT texto as bloqueioDevice FROM rtn where chave = \'bloqueioDevice\';';
    let queryBloqueioSolicitacao = 'SELECT texto as bloqueioSolicitacao FROM rtn where chave = \'bloqueioSolicitacao\';';
    let queryNovaSolicitacao = 'SELECT texto as novaSolicitacao FROM rtn where chave = \'novaSolicitacao\';';
    let queryRepeteSolicitacao = 'SELECT texto as repeteSolicitacao FROM rtn where chave = \'repeteSolicitacao\';';

    // PEGA RETORNOS NO BANCO DE DADOS PRINCIPAL
    resposta = await connection.execute(queryBloqueioDevice);
    bloqueioDevice = resposta[0][0]['bloqueioDevice'];
    resposta = await connection.execute(queryBloqueioSolicitacao);
    bloqueioSolicitacao = resposta[0][0]['bloqueioSolicitacao'];
    resposta = await connection.execute(queryNovaSolicitacao);
    novaSolicitacao = resposta[0][0]['novaSolicitacao'];
    resposta = await connection.execute(queryRepeteSolicitacao);
    repeteSolicitacao = resposta[0][0]['repeteSolicitacao'];
}

async function log(chave, texto, status) {
	let query = 'INSERT INTO log (deviceId, horario, chave, texto, status) values (\'' + deviceId + '\', now(), \'' + chave + '\', \'' + texto + '\', \'' + status + '\');';
    await connection.execute(query);        
}

async function testarConexao(cliente) {
    try {
      const conexaoCliente = await mysql.createConnection({
        host: cliente.host,
        user: cliente.user,
        password: cliente.pass,
        port: cliente.port
      });
      await conexaoCliente.end();
      
    } catch (err) {
      console.error('Erro ao conectar:', err);
      return 0
    }
    return 1;
}

http.createServer(app).listen(port, () => {
    console.log(`Server running at port ${port}`);
});
