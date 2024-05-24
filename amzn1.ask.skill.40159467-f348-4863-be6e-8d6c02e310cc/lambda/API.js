const express = require('express');
const app = express();
const port = 89;

const mysql = require('mysql2/promise');

const cors = require('cors');
app.use(cors());

let deviceId, result = '', connection, query, rows, consultas, cliente;

const dbConfig = {
    host: '187.0.7.139',
    user: 'alexa',
    password: 'Al3x4!!',
    port: '3306',
    database: 'alexa'
};

const novaSolicitacao = "Parece que é a primeira vez que você está executando a skill nesse aparelho. Vou enviar uma solicitação para a equipe Magnadata analisar seu aparelho.";
const repeteSolicitacao = "Este aparelho está aguardando resposta da solicitação. Se desejar, contate a Magnadata para pedir admissão.";
const bloqueioSolicitacao = "Sua solicitação para esse aparelho foi bloqueada pelos provedores da Skill.";
const bloqueioCliente = "Você está bloqueado para o uso dessa Skill. Qualquer dúvida contate a Magnadata para entender o que aconteceu.";
const bloqueioDevice = "Este aparelho está bloqueado para o uso dessa Skill.";

app.get('/alexa/script.js', async (req, res) => {
    deviceId = req.query.deviceId;
    if (!deviceId) {
        return res.status(400).send({'return' : 'Parâmetro "deviceId" é necessário.'});
    }

    // consulta cliente na alexa
    query = 'SELECT cli.cliente, user, host, pass, port, cli.bloqueado as cliBlq, dvc.bloqueado as dvcBlq FROM cli INNER JOIN dvc ON dvc.cliente = cli.cliente WHERE deviceId = \'' + deviceId + '\';';

    try {
        connection = await mysql.createConnection(dbConfig);
        rows = await connection.execute(query);
        connection.end();
    } catch (error) {
        return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }
        
    // testa se o cliente está ativo
    if (rows[0].length == 1){ //existe device
        cliente = rows[0][0]['cliente'];
        if(rows[0][0]['cliBlq'] == 1){ //testa se o cliente está bloqueado
            return res.send({'return' : bloqueioCliente}); 
        } else if (rows[0][0]['dvcBlq'] == 1){ // testa se o device está bloqueado
            return res.send({'return' : bloqueioDevice}); 
        }
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

    // consulta queryes a partir do cliente
    query_consultas = 'SELECT query FROM qry WHERE cliente = \'' + cliente + '\';';

    try {
        connection = await mysql.createConnection(dbConfig);
        consultas = await connection.execute(query_consultas);
        connection.end();
    } catch (error) {
        return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }

    lista_consultas = consultas[0];
    
    if(lista_consultas.length == 0){
        return res.send({'return' : 'Cliente não possui queryes.'});
    }

    // conecta ao cliente
    const dbClient = {
        host: rows[0][0]['host'],
        user: rows[0][0]['user'],
        password: rows[0][0]['pass'],
        port: rows[0][0]['port']
    };

    try {
        connection_client = await mysql.createConnection(dbClient);

        for (const item of lista_consultas) {
            const consulta = await connection_client.execute(item.query);
            
            const key = Object.keys(consulta[0][0])[0];
            const value = consulta[0][0][key];

            console.log(key + ': ' + value + '.');
            result += key + ': ' + value + '.';
        }
        
        console.log(result);

        connection_client.end();
    } catch (error) {
        res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados do cliente.'});
    }

    res.send({'return' : result});
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
