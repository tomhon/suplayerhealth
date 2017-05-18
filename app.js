var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// List the questions to be asked
var questionsList = Array ();
questionsList[0] = 'How are you feeling today? (1=Bad, 10=Amazing)';
questionsList[1] = 'Team Enjoyment? (1=Bad, 10=Amazing)';
questionsList[2] = 'Session Intensity? (1=Low, 10=High)';
questionsList[3] = 'Freshness? (1=Low, 10=High)';
questionsList[4] = 'Sleep Quality? (1=Low, 10=High)';
questionsList[5] = 'Muscle Health? (1=Low, 10=High)';
questionsList[6] = 'Happiness? (1=Low, 10=High)';
questionsList[7] = 'Mood? (1=Bad, 10=Good)';
questionsList[8] = 'Wellness? (1=Bad, 10=Good)';
questionsList[9] = 'Objective of Session? (text)';
questionsList[10] = 'What was learned / improved? (text)';

function logData (session, question, response) {
    this.timestamp = null,
    this.user = null,
    this.question = null,
    this.response = null
};

var logDataArray = Array();

var numberPromptOptions = { speak: questionsList[0], inputHint: builder.InputHint.expectingInput,
                maxRetries: 3, minValue: 1, maxValue: 10, retryPrompt: 'Not a valid option'};

console.log(numberPromptOptions);

function logResponse (session, question, results) {
        oLogData = new logData();
        oLogData.timestamp = session.message.timestamp;
        oLogData.user = session.message.user.name;
        oLogData.question = question.slice(0,question.indexOf('?')+1);
        oLogData.response = results.response;
        logDataArray.push(oLogData);
        console.log(oLogData);
}


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID || '2b58001f-47d5-41d7-bab3-041eea37358c',
    appPassword: process.env.MICROSOFT_APP_PASSWORD || '7JQN9RLVmXWirhFQeHSNuFe'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        // prompt for search option
        builder.Prompts.number( session, questionsList[0], numberPromptOptions );
        },
    function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[1], results);
        builder.Prompts.number( session, questionsList[1], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[2], results);
        builder.Prompts.number( session, questionsList[2], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[3], results);
        builder.Prompts.number( session, questionsList[3], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[4], results);
        builder.Prompts.number( session, questionsList[4], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[5], results);
        builder.Prompts.number( session, questionsList[5], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[6], results);
        builder.Prompts.number( session, questionsList[6], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[7], results);
        builder.Prompts.number( session, questionsList[7], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[8], results);
        builder.Prompts.number( session, questionsList[8], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[9], results);
        builder.Prompts.number( session, questionsList[9], numberPromptOptions );
        next();
    },
        function (session, results, next) {
        session.send('Great - thanks');
        logResponse(session, questionsList[10], results);
        builder.Prompts.number( session, questionsList[10], numberPromptOptions );
        next();
    },

    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Too many attemps :( But don\'t worry, I\'m handling that exception and you can try again!');
            return session.endDialog();
        }



        // on error, start over

        session.on('error', function (err) {

            session.send('Failed with message: %s', err.message);

            session.endDialog();

        });

        // continue on proper dialog

        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.Flights:
                return session.beginDialog('flights');
            case DialogLabels.Hotels:
                return session.beginDialog('hotels');
        }
    }
]);


// web interface
server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html',
}));