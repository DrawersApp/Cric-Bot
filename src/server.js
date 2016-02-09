var XMPP = require('stanza.io'); // if using browserify
var rest = require('restler');
var cache = require('memory-cache');
var constants = require('./constants');
var botStringElement = require('./botStringElements');
var operationsManager = require('./operationsmanager');
var operations = require('./operations')
var matchListString = require('./matchsummarystring');
var matchesString = require('./matchesstring');
var matchString = require('./matchstring');
var DrawersBotStringHelp = require('./drawersBotStringHelp');
// Todo - Live cricket score every x minute.

matchesString.getInstance();
matchListString.getInstance();
matchString.getInstance();
console.log(DrawersBotStringHelp.getInstance().print());
var client = XMPP.createClient({
    jid: 'harshit1@ejabberd.sandwitch.in',
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
    generateReply(msg);
    console.log("Message received" + msg.from);
});


function sendMessage(msg, replyBody, subType) {
    client.sendMessage({
        to: msg.from,
        type: 'chat',
        requestReceipt: true,
        id: client.nextId(),
        body: replyBody,
        json: {
            subType: subType,
            message: replyBody,
            timestamp: Date.now()
        }
    });
}

client.connect();


function generateReply(msg) {
    if (msg.body == null) {
        return "Empty message";
    }
    var decodedMessage = decodeURIComponent(msg.body);
    var drawersBotString = JSON.parse(decodedMessage);
    operationsManager.getInstance().performOperations(drawersBotString['operationsType'], drawersBotString, msg);
}

module.exports.client = client;


