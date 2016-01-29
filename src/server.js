var XMPP = require('stanza.io'); // if using browserify
var rest = require('restler')

var client = XMPP.createClient({
    jid: '63d1911e-6de3-49d6-8d09-4f4fa39ab7db@ejabberd.sandwitch.in',
    password: 'irctc',

    // If you have a .well-known/host-meta.json file for your
    // domain, the connection transport config can be skipped.

    transport: 'websocket',
    wsURL: 'ws://ejabberd.sandwitch.in:5280/websocket'
    // (or `boshURL` if using 'bosh' as the transport)
});

client.on('session:started', function () {
    client.getRoster();
    client.sendPresence();
    console.log("Session started");
});

client.on('chat', function (msg) {
    if ("match".localeCompare(msg.body.toLocaleLowerCase()) === 0) {
        fetchallMatches(msg)
    } else {
        getUpdateScoreForMatch(msg.body, msg)
    }
    console.log("Message received" + msg.from);
});


function sendMessage(msg, replyBody) {
    client.sendMessage({
        to: msg.from,
        type: 'chat',
        requestReceipt: true,
        id: client.nextId(),
        body: replyBody,
        json:
        {
            subType: 'TEXT',
            message: replyBody,
            timestamp: Date.now()
        }
    });
}

client.connect();

function fetchallMatches(msg) {
    rest.get('http://cricscore-api.appspot.com/csa').on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultString = ''
            for (i=0; i<result.length; i++) {
                resultString = resultString + toUserString(result[i])
            }
            sendMessage(msg, resultString)
        }
    });
}

function toUserString(indResult) {
    return indResult["id"] + ":" + indResult["t2"] + "-" + indResult["t1"] +"\n"
}
function getUpdateScoreForMatch(match, msg) {
    rest.get('http://cricscore-api.appspot.com/csa', {
        query : { id : match}
    }).on('complete', function(result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            sendMessage(msg, JSON.stringify(result))
        }
    });
}

