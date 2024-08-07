/* -- VALIDAÇÃO E CONSULTA -- */

	let deviceId, connection, device, clientes = [], grupos = [], cliente,
	bloqueioDevice, bloqueioSolicitacao, novaSolicitacao, repeteSolicitacao;


	// retornos

    let queryBloqueioDevice = 'SELECT texto as bloqueioDevice FROM rtn where chave = \'bloqueioDevice\';';
    let queryBloqueioSolicitacao = 'SELECT texto as bloqueioSolicitacao FROM rtn where chave = \'bloqueioSolicitacao\';';
    let queryNovaSolicitacao = 'SELECT texto as novaSolicitacao FROM rtn where chave = \'novaSolicitacao\';';
    let queryRepeteSolicitacao = 'SELECT texto as repeteSolicitacao FROM rtn where chave = \'repeteSolicitacao\';';

    // consulta Device na alexa
	let queryDevice = 'SELECT * from dvc where deviceid = \'' + deviceId + '\';';
	
	try {
        connection = await mysql.createConnection(dbConfig);
		bloqueioDevice = await connection.execute(queryBloqueioDevice);
		bloqueioSolicitacao = await connection.execute(queryBloqueioSolicitacao);
		novaSolicitacao = await connection.execute(queryNovaSolicitacao);
		repeteSolicitacao = await connection.execute(queryRepeteSolicitacao);
	
		device = await connection.execute(queryDevice);
		connection.end();
    } catch (error) {
        return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }

	// cliente e consultas
	let insertHistórico = 'INSERT INTO htr (deviceId, execucao) values (\'' + deviceId + '\', now());';
	let queryClientes = 'SELECT * from cli where cli.id in (SELECT dvc.cliente from dvc where deviceid = \'' + deviceId + '\');';
	let queryGrupo = 'SELECT * from grp where grp.cliente \'' + cliente + '\';';

	try {
        connection = await mysql.createConnection(dbConfig);
		await connection.execute(insertHistórico);
		clientes = await connection.execute(queryClientes);
		connection.end();
    } catch (error) {
        return res.status(500).send({'return' : 'Erro ao se conectar ao banco de dados principal.'});
    }



	/*
// testar se o Device existe no DVC
	// se existir, testar se ele está bloqueado
		// caso não, somar no histórico e testar se ele possui algum cliente que não esteja bloqueado
			%% para cada cliente não bloqueqado
			// testar se a conexão com o banco de dados está ativa
				// testar se ele possui grupo de query ativo
					%% para cada grupo de query ativo
					// testar se ele possui algum query ativo
						%% para cada query ativo, 
						// fazer a consulta e colocar em um texto
							TEXTO PRINCIPAL + CONSULTA + VALOR
						*** quando acabar as consultas
							RETORNAR TEXTO PRINCIPAL
							ENCERRAR
					// se não tiver query's ativos para o grupo, ignorar grupo
				// se não ter nenhum grupo ativo e válido, retornar que os dados estão errados
					TEXTO DE ERRO + GRUPO COM ERRO
			// caso não conseguir conectar no banco de dados
				TEXTO DE ERRO + CLIENTE COM ERRO
		// se estiver bloqueado, colocar no log na API e ignorar o cliente.
		*** se não tiver nenhum cliente válido, retornar que os dados estão errados
		TEXTO DE ERRO NA TABELA HISTÓRICO
		RETORNAR QUE A CONSULTA FALHOU
		ENCERRAR
	// se estiver bloqueado, retornar e encerrar chamado
	RETORNAR BLOQUEIO DEVICE
// caso não exista DVC, testar se existe solicitação
	// testar se está bloqueado
		RETORNAR SOLICITAÇÃO BLOQUEADA
		ENCERRAR
	// caso não esteja
		tentativa + 1
		RETORNAR SOLICITAÇÃO JÁ EXISTENTE
		ENCERRAR
// caso não exista SLC, criar 
	RETORNAR SLC CRIADA
	ENCERRAR



obs:
retirar texto de bloqueio cliente
*/