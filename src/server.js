var XMPP = require('stanza.io'); // if using browserify
var rest = require('restler');
var cache = require('memory-cache');
var constants = require('./constants');
var botStringElement = require('./botStringElem');
var operationsManager = require('./opmanager');


// Todo - Live cricket score every x minute.

var client = XMPP.createClient({
    jid: 'harshit@ejabberd.sandwitch.in',
    password: 'tractor',

    // If you have a .well-known/host-meta.json file for your
    // domain, the connection transport config can be skipped.

    transport: 'websocket',
    wsURL: 'ws://ejabberd.sandwitch.in:5280/websocket'
    // (or `boshURL` if using 'bosh' as the transport)
});

opts = {};
opts.interval = 180;
opts.timeout = 30;
client.enableKeepAlive(opts);
client.on('session:started', function () {
    client.sendPresence();
    console.log("Session started");
});

client.on('chat', function (msg) {
    if ("match".localeCompare(msg.body.toLocaleLowerCase()) === 0) {
        fetchallMatches(msg, true)
    } else if ("matches".localeCompare(msg.body.toLocaleLowerCase()) === 0) {
        fetchAllMatchesScore(msg)
    }
    else {
        getUpdateScoreForMatch(msg.body, msg)
    }
    console.log("Message received" + msg.from);
});


function sendMessage(msg, replyBody, subType) {
    client.sendMessage({
        to: msg.from,
        type: 'chat',
        requestReceipt: true,
        id: client.nextId(),
        body: replyBody,
        json:
        {
            subType: subType,
            message: replyBody,
            timestamp: Date.now()
        }
    });
}

client.connect();

function fetchallMatches(msg) {
    var resultString = cache.get("matchesString");
    if (resultString !== null) {
        console.log("Cache hit matchesString" + resultString);
        sendMessage(msg, resultString, constants.chatType.TEXT);
        return
    }
    rest.get('http://cricapp-1206.appspot.com/csa').on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultString = '';
            for (i=0; i<result.length; i++) {
                resultString = resultString + toUserString(result[i])
            }
            sendMessage(msg, resultString, constants.chatType.TEXT);
            console.log("Cache miss matchesString" + resultString);
            cache.put("matchesString", resultString, 60 * 60 * 1000)
        }
    });
}

function toUserString(indResult) {
    return indResult["id"] + ":" + indResult["t2"] + "-" + indResult["t1"] +"\n"
}

function scoreToUserString(indResut) {
    return "Match:" + indResut["id"] + "\n" + indResut["de"] + "\n" + indResut["si"] + "\n\n"

}
function getUpdateScoreForMatch(match, msg) {
    rest.get('http://cricapp-1206.appspot.com/csa', {
        query : { id : match}
    }).on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultString = '';
            for (i=0; i<result.length; i++) {
                resultString = resultString + scoreToUserString(result[i])
            }
            sendMessage(msg, resultString, constants.chatType.TEXT)
        }
    });
}

function fetchAllMatchesScore(msg) {
    var resultString = cache.get("matches");
    if (resultString !== null) {
        console.log("Cache hit matches" + resultString);
        getUpdateScoreForMatch(resultString, msg);
        return
    }
    rest.get('http://cricapp-1206.appspot.com/csa').on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultStringArray = new Array();
            for (i=0; i<result.length; i++) {
                resultStringArray[i] = result[i]['id']
            }
            resultString = resultStringArray.join("+");
            console.log("Cache miss matches" + resultString);
            getUpdateScoreForMatch(resultString, msg);
            cache.put("matches", resultString, 60 * 60 * 1000)
        }
    });
}

function generateReply(msg) {
    if (msg.body == null) {
        return "Empty message";
    }
    var decodedMessage = decodeURIComponent(msg.body);
    var drawersBotString = JSON.parse(decodedMessage);
    operationsManager.performOperations(decodedMessage['operationType'], drawersBotString);
}

module.exports.client = client;


