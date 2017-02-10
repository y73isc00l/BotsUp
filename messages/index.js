/*-----------------------------------------------------------------------------
This template demonstrates how to use Waterfalls to collect input from a user using a sequence of steps.
For a complete walkthrough of creating this type of bot see the article at
https://docs.botframework.com/en-us/node/builder/chat/dialogs/#waterfall
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var natural=require('natural');
var classifier=new natural.BayesClassifier();

// console.log(classifier.classify('i am short silver'));
// classifier.save('classifier.json',function(err,classifier){
//     //the classifier is saved to classifier.json file!
// });


var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        classifier.addDocument('i would like to buy fdfssfg','buy');
        classifier.addDocument('woul sell fssljjf','sell');
        classifier.addDocument('How much would u sell this to me for','sell');
        classifier.train();
        builder.Prompts.text(session, "classifier.classify('i am short silver')");
        
    },
    function (session, results) {
        session.userData.name = results.response;
        if(!session.userData.age){
        builder.Prompts.number(session, "Hi " + results.response + ", How old are ypu?");
        }
    },
    function (session, results) {
        session.userData.age = results.response;
        if(!session.userData.language){
        builder.Prompts.choice(session, "What is your primary language?", ["English", "Hindi", "Regional"]);
        }
            
        },
    function (session, results) {
        session.userData.language = results.response.entity;
        if(session.userData.language=="Regional"){
        session.send("Got it... " + session.userData.name + 
                    " you are comfortable with" + session.userData.language + ".");
        }
        else{
            session.send("Got it... " + session.userData.name + 
                    " you are comfortable with" + session.userData.language + ".");
        }
        }
    
]);

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
