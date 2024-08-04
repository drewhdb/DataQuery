const http = require('http');
const express = require('express');
const app = express();
const port = 89;

const mysql = require('mysql2/promise');

const cors = require('cors');
app.use(cors());

let deviceId, connection, rows, listReturns, consultas, cliente;

const dbConfig = {
    host: '192.168.1.13',
    user: 'alexa',
    password: 'Al3x4!!',
    port: '3306',
    database: 'alexa'
};

app.get('/alexa/script.js', async (req, res) => {
    deviceId = req.query.deviceId;

    if (!deviceId) {
        return res.status(400).send({'return' : 'Parâmetro "deviceId" é necessário.'});
    }

    // consulta cliente na alexa
    let query = 'SELECT cli.cliente, cli.nome, user, host, pass, port, cli.bloqueado as cliBlq, dvc.bloqueado as dvcBlq FROM cli INNER JOIN dvc ON dvc.cliente = cli.cliente WHERE deviceId = \'' + deviceId + '\';';
    let queryReturns = 'SELECT * FROM rtn;';

    try {
        connection = await mysql.createConnection(dbConfig);
    	rows = await connection.execute(query);	
	    listReturns = await connection.execute(queryReturns);
        connection.end();
    } catch (error) {
        return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }

    const bloqueioCliente = listReturns[0][0]['texto'];
    const bloqueioDevice = listReturns[0][1]['texto'];
    const bloqueioSolicitacao = listReturns[0][2]['texto'];
    const novaSolicitacao = listReturns[0][3]['texto'];
    const repeteSolicitacao = listReturns[0][4]['texto'];
        
    // testa se o cliente está ativo
    if (rows[0].length >= 1){ //existe device
        if (rows[0][0]['dvcBlq'] == 1){ // testa se o device está bloqueado
            return res.send({'return' : bloqueioDevice}); 
        } 
        // for (let i = 0; i < rows[0].length; i++) {
        //     if (rows[0][i]['cliBlq'] == 1){
        //         console.log('cliente bloqueado');
        //         return res.send({'return' : bloqueioCliente}); 
        //     }
        // }

    } else {
        querySolicitacao = 'SELECT * FROM slc WHERE deviceId = \'' + deviceId + '\';';

        try {
            connection = await mysql.createConnection(dbConfig);
            rows = await connection.execute(querySolicitacao);
            connection.end();
        } catch (error) {
            return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
        }
  
        if (rows[0].length == 1){ //existe solicitação
            if(rows[0][0]['bloqueado'] == 1){ // solicitação bloqueada
                return res.send({'return' : bloqueioSolicitacao});
            } else { // somar tentativa
                queryUpdateSolicitacao = `update slc set slc.tentativas = slc.tentativas + 1 where slc.deviceId = '${deviceId}';`;
                try {
                    connection = await mysql.createConnection(dbConfig);
                    await connection.execute(queryUpdateSolicitacao);
                    connection.end();
                } catch (error) {
                    return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
                }
                return res.send({'return' : repeteSolicitacao});
            }
        } else { //criar solicitação
            queryInsertSolicitacao = `insert into slc (deviceId) values ('${deviceId}');`;
            try {
                connection = await mysql.createConnection(dbConfig);
                await connection.execute(queryInsertSolicitacao);
                connection.end();
            } catch (error) {
                return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
            }

            return res.send({'return' : novaSolicitacao});
        }
    }

    let result = '';
    for (let i = 0; i < rows[0].length; i++) {
        cliente = rows[0][i]['nome'];
        console.log('requisição de ' + cliente);
        
        if(rows[0][i]['cliBlq'] == 1){ //testa se o cliente está bloqueado
            result += '; ; ; ' + cliente + ' está bloqueado para consultar. ';
            break;
        }

        // consulta queryes a partir do cliente
        query_consultas = 'SELECT query, grupo FROM qry WHERE cliente = \'' + cliente + '\'ORDER BY grupo;';
        query_consultas_grupos = 'SELECT distinct grupo FROM qry WHERE cliente = \'' + cliente + '\'ORDER BY grupo;';
        updateUltimaExecucao = 'UPDATE cli SET ultima_execucao = NOW() WHERE cliente = \'' + cliente + '\';';

        try {
            connection = await mysql.createConnection(dbConfig);
            consultas = await connection.execute(query_consultas);
            consultas_grupos = await connection.execute(query_consultas_grupos);
            await connection.execute(updateUltimaExecucao)
            connection.end();
        } catch (error) {
            return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
        }

        lista_consultas = consultas[0];
        lista_grupos = consultas_grupos[0];
        
        if(lista_consultas.length == 0){
            result += cliente + 'não possui consultas para relatar. . . ';
        }

        // conecta ao cliente
        const dbClient = {
            host: rows[0][i]['host'],
            user: rows[0][i]['user'],
            password: rows[0][i]['pass'],
            port: rows[0][i]['port']
        };
        
        try {
            connection_client = await mysql.createConnection(dbClient);
            result += 'Relatório ' + cliente + ': ';

            for (let grupo in lista_grupos) {
                result += '. . .' + lista_grupos[grupo]['grupo'] + ': ';
                for (const item of lista_consultas) {
                    if(item.grupo == lista_grupos[grupo]['grupo']){
                        const consulta = await connection_client.execute(item.query);
                        
                        const key = Object.keys(consulta[0][0])[0];
                        const value = consulta[0][0][key];
        
                        result += key + ': ' + value + '; ';    
                    }
                }
            }
            
            connection_client.end();
        } catch (error) {
            result += '; ; ; Erro ao se conectar ao banco de dados do servidor ' + cliente + '. . . ';
            //res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados do cliente.'});
        }
    }

    res.send({'return' : result});
});

http.createServer(app).listen(port, () => {
    console.log(`Server running at port ${port}`);
});
