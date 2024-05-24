const Alexa = require('ask-sdk-core');

let deviceId = 'deviceid';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        const apiUrl = `http://localhost:89/alexa/script.js?deviceId=${deviceId}`;
        let retorno = '';
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                retorno = data['return']; 
        })
            .catch(error => console.error('Error:', error));
        });

        let resultado = retorno['retorno'];
        
        return handlerInput.responseBuilder
            .speak(resultado)
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

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const resposta = "Tivemos um problema na conexão com o banco de dados.";

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
