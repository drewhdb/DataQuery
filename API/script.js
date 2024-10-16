const port = process.env.PORT || 85;

const express = require('express');
const app = express();
app.use(express.json());

const mysql = require('mysql2/promise');

let deviceId, connection, texto = '', bloqueio = 0,
dadosInvalidos = '', bloqueioDevice = '', bloqueioSolicitacao = '', novaSolicitacao = '', repeteSolicitacao = '';

const dbConfig = {
    host: '192.168.1.13',
    user: 'dataquery',
    password: 'D4t4Qu3rY!!',
    port: '3306',
    database: 'dataquery'
};

// principal
app.get('/', async (req, res) => {
	
    /* -- VALIDAÇÃO DO DEVICE ID -- */
    deviceId = req.query.deviceId;
    if (!deviceId || deviceId.length < 50) {
        return res.status(200).send({'return' : 'Parâmetro deviceId é necessário.'});
    }

    /* -- CONEXÃO COM O BANCO PRINCIPAL -- */
    try {
        connection = await mysql.createConnection(dbConfig);
    } catch (error) {
        console.log('Erro ao se conectar ao banco de dados principal.' + error);
        return res.status(200).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }
    
    /* -- DECLARAÇÃO DOS RETORNOS -- */
    await pegaRetornos();
    if (dadosInvalidos == '' || bloqueioDevice == '' || bloqueioSolicitacao == '' || novaSolicitacao == '' || repeteSolicitacao == '') {
        return res.status(200).send({'return' : 'configurações erradas.'});
    };

    /* -- VALIDAÇÃO -- */
    // Pegar dados vinculados a esse device
	let queryDevice = 'SELECT * from dvc where deviceid = \'' + deviceId + '\';';	
    let clientes_do_device = await connection.execute(queryDevice);
    clientes_do_device = clientes_do_device[0];
    
    // testar se o Device existe no DVC
    if(clientes_do_device.length > 0){
    	texto = '';
        log('inicio', 'Inicio do chamado. Iniciando validação', 1);
        if (await consulta(clientes_do_device)){
            log('concluido','Chamado encerrado', 4);
            return res.status(200).send({'return' : texto});
        } else if (bloqueio == clientes_do_device.length){
            log('retorno','aparelho bloqueado para consultas.', 3);
            return res.status(200).send({'return' : bloqueioDevice});
        } else {
            log('retorno','não foi encontrado nenhum cliente válido', 3);
            return res.status(200).send({'return' : dadosInvalidos});
        }
    // testar se existe solicitação
    } else {
        consultaSolicitacao(res);
    }
});

async function consulta(clientes_do_device){
    let clientes = [];
    // para cada cliente
    for (let i = 0; i < clientes_do_device.length; i++) {
        let textoCliente = '';
        // pega os dados do cliente
        let queryCliente = 'Select * from cli where cli.id = \'' + clientes_do_device[i]['cliente'] + '\';'; 
        let cliente = await connection.execute(queryCliente);
        cliente = cliente[0][0];
        

        // testa se bloqueado
        if(cliente['bloqueado'] == 1){
            log('consulta', 'cliente ' + cliente['cliente'] + ' bloqueado.', 2);
        } else if(clientes_do_device[i]['bloqueado'] == 1){
            log('consulta', 'o device está bloqueado para o cliente ' + cliente['cliente'] + '.', 2);
            bloqueio ++;
        } else {
           const dbCliente = {
                host: cliente['host'],
                user: cliente['user'],
                password: cliente['pass'],
                port: cliente['port']
            }
        
            let conexao = 1;
            try{
                connectionCliente = await mysql.createConnection(dbCliente);
            } catch (error) {
                log('falha na conexão', 'cliente ' + clientes[i]['cliente'] + ' sem acesso ao banco de dados.', 2);
                conexao = 0;
            }
		
            if (conexao == 1){
                let queryGrupos = 'Select * from grp where grp.cliente = \'' + clientes_do_device[i]['cliente'] + '\';'; 
                let grupos_do_cliente = await connection.execute(queryGrupos);
                grupos_do_cliente = grupos_do_cliente[0];
                
                if(grupos_do_cliente.length > 0){
                    let grupos = [];

                    for (let g = 0; g < grupos_do_cliente.length; g++) {
                        if(grupos_do_cliente[g]['ativo'] == 1){
                            let textoQueryes = ''
                            let queryQueryes = 'Select * from qry where qry.grupo = \'' + grupos_do_cliente[g]['id'] + '\' and qry.cliente = \'' + clientes_do_device[i]['cliente'] + '\';'; 
                            let queryes_do_grupo = await connection.execute(queryQueryes);
                            queryes_do_grupo = queryes_do_grupo[0];

                            if(queryes_do_grupo.length > 0){
                                let queryes = [];
                                for (let q = 0; q < queryes_do_grupo.length; q++) {
                                    if(queryes_do_grupo[q]['ativo'] == 1){
                                        try{
                                            let consultaqry = await connectionCliente.execute(queryes_do_grupo[q]['query']);
                                            for (const [key, value] of Object.entries(consultaqry[0][0])) {
                                                textoQueryes += `${key}: ${value}. `;
                                            }
                                            queryes.push(queryes_do_grupo[q]);
  
                                        } catch (error) {
                                            console.log('Erro durante a consulta: ' + error);
                                        }
 
                                    }
                                }
                                if (queryes.length > 0) {
                                    grupos.push(grupos_do_cliente[g]);

                                    textoCliente += grupos_do_cliente[g]['grupo'] + ': ';
                                    textoCliente += textoQueryes;
                                }
                            }
                        }
                    }
                    if (grupos.length === 0){
                        log('dados cliente ' + cliente['cliente'], 'Todos os grupos estão inativos', 2);
                    } else {
                        clientes.push(cliente);

                        texto += "Dados do cliente " + cliente['cliente'] + ": ";
                        texto += textoCliente;
                    }
                } else{
                    log('retorno', 'nenhum grupo para o cliente ' + cliente['cliente'], 3);
                }    
            } else {
                log('retorno', 'falha na conexão do banco de dados do cliente ' + cliente['cliente'], 3);
            }
        }
    }
    // testa se possui cliente valido
    if (clientes.length > 0){
        return true;
    }
    return false;
}

async function pegaRetornos() {	
    // QUERYES RETORNOS
    let queryBloqueioDevice = 'SELECT texto as bloqueioDevice FROM rtn where chave = \'bloqueioDevice\';';
    let queryBloqueioSolicitacao = 'SELECT texto as bloqueioSolicitacao FROM rtn where chave = \'bloqueioSolicitacao\';';
    let queryNovaSolicitacao = 'SELECT texto as novaSolicitacao FROM rtn where chave = \'novaSolicitacao\';';
    let queryRepeteSolicitacao = 'SELECT texto as repeteSolicitacao FROM rtn where chave = \'repeteSolicitacao\';';
    let queryDadosInvalidos = 'SELECT texto as dadosInvalidos FROM rtn where chave = \'dadosInvalidos\';';

    // PEGA RETORNOS NO BANCO DE DADOS PRINCIPAL
    resposta = await connection.execute(queryBloqueioDevice);
    if(resposta[0].length != 0){
        bloqueioDevice = resposta[0][0]['bloqueioDevice'];
    };    
    resposta = await connection.execute(queryBloqueioSolicitacao);
    if(resposta[0].length != 0){
        bloqueioSolicitacao = resposta[0][0]['bloqueioSolicitacao'];
    };    
    
    resposta = await connection.execute(queryNovaSolicitacao);
    if(resposta[0].length != 0){
        novaSolicitacao = resposta[0][0]['novaSolicitacao'];
    };    
    
    resposta = await connection.execute(queryRepeteSolicitacao);
    if(resposta[0].length != 0){
        repeteSolicitacao = resposta[0][0]['repeteSolicitacao'];
    };    
    
    resposta = await connection.execute(queryDadosInvalidos);
    if(resposta[0].length != 0){
        dadosInvalidos = resposta[0][0]['dadosInvalidos'];
    };    
}

async function log(chave, texto, status) {
	let query = 'INSERT INTO log (deviceId, horario, chave, texto, status) values (\'' + deviceId + '\', now(), upper(\'' + chave + '\'), \'' + texto + '\', \'' + status + '\');';
    await connection.execute(query);        
}

async function consultaSolicitacao(res) {
	let solicitacao;
    let querySolicitacao = 'SELECT * from slc where deviceid = \'' + deviceId + '\';';	
    solicitacao = await connection.execute(querySolicitacao);
    solicitacao.pop();

    // testar se a solicitacao existe no SLC
    if(solicitacao[0].length > 0){
        // testa se a solicitação está bloqueado
        if(solicitacao[0][0]['bloqueado'] == 1){
            return res.status(200).send({'return' : bloqueioSolicitacao});
        } else {
            // soma tentativa
            let updateSolicitacao = 'update slc set tentativas = tentativas + 1, data_solicitacao = now() where deviceid = \'' + deviceId + '\';';	
            await connection.execute(updateSolicitacao);
            return res.status(200).send({'return' : repeteSolicitacao});
        }
    } else{
        // insere solicitação
        let insertSolicitacao = 'insert into slc values (\'' + deviceId + '\', \'nome\', now(), 0, 0);';	
        await connection.execute(insertSolicitacao);
        return res.status(200).send({'return' : novaSolicitacao});
    }
}

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
