
/* eslint-disable  func-names */

/* eslint-disable  no-console */


const Alexa = require('ask-sdk');
const Guru = require('guru.js');



const SKILL_NAME = 'Active Guru';

const GET_GURU_MESSAGE = 'You should';

const HELP_MESSAGE = 'You can say what should I do Active Guru?';

const HELP_REPROMPT = 'What can I help you with?';

const FALLBACK_MESSAGE = 'Active Guru can\'t help you with that. Try again?';

const FALLBACK_REPROMPT = 'What can I help you with?';

const STOP_MESSAGE = 'Goodbye!';



const GetLaunchHandler = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'LaunchRequest';
  },

  handle(handlerInput) {

    const speechOutput = 'Welcome, I am here to make you active';
    const cardOutput = 'I can tell you what you should do to be active';

    return handlerInput.responseBuilder

      .speak(speechOutput)

      .reprompt(cardOutput)

      .withSimpleCard(SKILL_NAME, cardOutput)

      .getResponse();
  },

};


const GuruHandler = {

  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return (request.type === 'IntentRequest'
      && request.intent.name === 'doStuffIntent');
  },

  handle(handlerInput) {
 
    const result = Guru.getAction();
    const speechOutput = GET_GURU_MESSAGE + ' ' + result;
    const outCard = GET_GURU_MESSAGE + ': ' + result;

    return handlerInput.responseBuilder

      .speak(speechOutput)

      .withSimpleCard(SKILL_NAME, outCard)

      .getResponse();
  },

};


const HelpHandler = {

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && request.intent.name === 'AMAZON.HelpIntent';

  },

  handle(handlerInput) {

    return handlerInput.responseBuilder

      .speak(HELP_MESSAGE)

      .reprompt(HELP_REPROMPT)

      .getResponse();

  },

};



const FallbackHandler = {

  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

  //              This handler will not be triggered except in that locale, so it can be

  //              safely deployed for any locale.

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && request.intent.name === 'AMAZON.FallbackIntent';

  },

  handle(handlerInput) {

    return handlerInput.responseBuilder

      .speak(FALLBACK_MESSAGE)

      .reprompt(FALLBACK_REPROMPT)

      .getResponse();

  },

};



const ExitHandler = {

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && (request.intent.name === 'AMAZON.CancelIntent'

        || request.intent.name === 'AMAZON.StopIntent');

  },

  handle(handlerInput) {

    return handlerInput.responseBuilder

      .speak(STOP_MESSAGE)

      .getResponse();

  },

};



const SessionEndedRequestHandler = {

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'SessionEndedRequest';

  },

  handle(handlerInput) {

    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);



    return handlerInput.responseBuilder.getResponse();

  },

};



const ErrorHandler = {

  canHandle() {

    return true;

  },

  handle(handlerInput, error) {

    console.log(`Error handled: ${error.message}`);



    return handlerInput.responseBuilder

      .speak('Sorry, an error occurred.')

      .reprompt('Sorry, an error occurred.')

      .getResponse();

  },

};



const skillBuilder = Alexa.SkillBuilders.custom();



exports.handler = skillBuilder

  .addRequestHandlers(
    GetLaunchHandler,

    GuruHandler,

    HelpHandler,

    ExitHandler,

    FallbackHandler,

    SessionEndedRequestHandler

  )

  .addErrorHandlers(ErrorHandler)

  .lambda();
