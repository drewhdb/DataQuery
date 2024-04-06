function chamaApi(alexa) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: conexao["host"],
            user: conexao["user"],
            password: conexao["password"],
            port: conexao["port"]
        });

        connection.connect(err => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                reject(err);
            } else {
                connection.query('INSERT INTO teste.chamadas (alexa) VALUES ("' + alexa + '");', (error, results) => {
                    connection.end();
                    
                    if (error) {
                        console.error('Erro ao executar a consulta:', error);
                        reject(error);
                    } else {
                        resolve("deu certo");
                    }
                });
            }
        });
    });
}


const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        
        chamaApi(deviceId);
        
        const speakOutput = 'Qual relatório você deseja??';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Caso você precise de ajuda, contatar o suporte da Magnadata.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Até a próxima.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Tente novamente com um dos relatórios abaixo:';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/*
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const resposta = "Algo deu errado. Tente verificar a conexão com o Banco de Dados.";
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(resposta)
            .reprompt(resposta)
            .getResponse();
    }
};
    
/*
=============================================================================================================
    aqui começa a mudança. 
    
    Adicionar na skill da Alexa do cliente a conexão com o mysql e 
        os relatórios que desejar. 
        
    Caso queira mais de uma conexão com um banco de dados, criar conectionLoja e mysqlLoja, por exemplo
=============================================================================================================
*/

//=======================================
// fazer conexão com o banco de dados
//=======================================
const mysql = require('mysql');

const conexao = {
    "host" : "187.0.7.139",
    "user" : "root",
    "password" : "j4c4r3z40!",
    "port" : "3306",
    "base" : "bebelandia"
};

const queryes = {
    "totalVendidoIntent" :          "SELECT concat(header, ': ', value) as valor from " + conexao["base"] + ".pdv_valor_vendas;",
    "totalProdutosVendidosIntent" : "SELECT concat(header, ': ', value) as valor from " + conexao["base"] + ".pdv_tot_qtde_vendas;",
    "totalNovosClientesIntent" :    "SELECT concat(header, ': ', value) as valor from " + conexao["base"] + ".pdv_qtde_vendas_novos_clientes;",
    "totalVendasIntent" :           "SELECT concat(header, ': ', value) as valor from " + conexao["base"] + ".pdv_tot_vendas;"
}

// Função para conectar e consultar o banco de dados
function executeQuery(query) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: conexao["host"],
            user: conexao["user"],
            password: conexao["password"],
            port: conexao["port"]
        });

        connection.connect(err => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                reject(err);
            } else {
                connection.query(query, (error, results) => {
                    connection.end();
                    
                    if (error) {
                        console.error('Erro ao executar a consulta:', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
}

//=======================================
// handlers dos relatórios
//=======================================

const totalVendidoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'totalVendidoIntent';
    },
    async handle(handlerInput) {
        try {
            const resultados = await executeQuery(queryes[handlerInput.requestEnvelope.request.intent.name]);

            return handlerInput.responseBuilder
                .speak(resultados[0].valor)
                .reprompt('Qual outro relatório você deseja?')
                .getResponse();
        } catch (error) {
            console.error('Erro ao obter o relatório:', error);
            const resposta = "Desculpe, houve um erro ao obter o relatório.";
            return handlerInput.responseBuilder
                .speak(resposta)
                .reprompt(resposta)
                .getResponse();
        }
    }
};

// ---- 

const totalProdutosVendidosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'totalProdutosVendidosIntent';
    },
    async handle(handlerInput) {
        try {
            const resultados = await executeQuery(queryes[handlerInput.requestEnvelope.request.intent.name]);

            return handlerInput.responseBuilder
                .speak(resultados[0].valor)
                .reprompt('Qual outro relatório você deseja?')
                .getResponse();
        } catch (error) {
            console.error('Erro ao obter o relatório:', error);
            const resposta = "Desculpe, houve um erro ao obter o relatório.";
            return handlerInput.responseBuilder
                .speak(resposta)
                .reprompt(resposta)
                .getResponse();
        }
    }
};

// ---- 

const totalNovosClientesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'totalNovosClientesIntent';
    },
    async handle(handlerInput) {
        try {
            const resultados = await executeQuery(queryes[handlerInput.requestEnvelope.request.intent.name]);

            return handlerInput.responseBuilder
                .speak(resultados[0].valor)
                .reprompt('Qual outro relatório você deseja?')
                .getResponse();
        } catch (error) {
            console.error('Erro ao obter o relatório:', error);
            const resposta = "Desculpe, houve um erro ao obter o relatório.";
            return handlerInput.responseBuilder
                .speak(resposta)
                .reprompt(resposta)
                .getResponse();
        }
    }
};

// ---- 

const totalVendasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'totalVendasIntent';
    },
    async handle(handlerInput) {
        try {
            const resultados = await executeQuery(queryes[handlerInput.requestEnvelope.request.intent.name]);

            return handlerInput.responseBuilder
                .speak(resultados[0].valor)
                .reprompt('Qual outro relatório você deseja?')
                .getResponse();
        } catch (error) {
            console.error('Erro ao obter o relatório:', error);
            const resposta = "Desculpe, houve um erro ao obter o relatório.";
            return handlerInput.responseBuilder
                .speak(resposta)
                .reprompt(resposta)
                .getResponse();
        }
    }
};


// ---- 

const geralIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'geralIntent';
    },
    async handle(handlerInput) {
        try {
            let resultado = '';
            for (const intentName in queryes) {
                const query = queryes[intentName];
                const resultados = await executeQuery(query);
                // Vamos concatenar os resultados de cada consulta
                resultado += `${resultados[0].valor}. `;
            }
        
            return handlerInput.responseBuilder
                .speak(resultado)
                .reprompt('Qual outro relatório você deseja?')
                .getResponse();
        } catch (error) {
            console.error('Erro ao obter o relatório:', error);
            const resposta = "Desculpe, houve um erro ao obter o relatório.";
            return handlerInput.responseBuilder
                .speak(resposta)
                .reprompt(resposta)
                .getResponse();
        }
    }
};

//
// etapa final: colocar os handlers criados anteriormente aqui
//

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        
        totalVendidoIntentHandler,
        totalProdutosVendidosIntentHandler,
        totalNovosClientesIntentHandler,
        totalVendasIntentHandler,
        geralIntentHandler,

        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
