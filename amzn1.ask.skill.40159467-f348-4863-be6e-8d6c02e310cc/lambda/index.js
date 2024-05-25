const Alexa = require('ask-sdk-core');
const http = require('http');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        const apiUrl = `http://187.0.7.139:89/alexa/script.js?deviceId=${deviceId}`;
    
        let resultado = '';
    
        try {
            resultado = await new Promise((resolve, reject) => {
                http.get(apiUrl, (res) => {
                    let data = '';
    
                    // A chunk of data has been received.
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
    
                    // The whole response has been received. Print out the result.
                    res.on('end', () => {
                        try {
                            const parsedData = JSON.parse(data);
                            resolve(parsedData.return); // Ajuste conforme a estrutura da sua resposta
                        } catch (e) {
                            reject('Erro ao analisar a resposta da API');
                        }
                    });
    
                }).on('error', (err) => {
                    reject('Erro ao chamar a API');
                });
            });
        } catch (error) {
            console.log(error);
            resultado = 'Erro ao chamar a API';
        }
    
        return handlerInput.responseBuilder
            .speak(resultado)
            .getResponse();
    }
}

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

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const resposta = "Erro.";

        return handlerInput.responseBuilder
            .speak(resposta)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CancelAndStopIntentHandler
    ).addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
