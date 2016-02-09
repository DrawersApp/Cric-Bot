var chatType = (function () {
    var text = 'TEXT';
    var image = 'IMAGE';

    return {
        TEXT: text,
        IMAGE: image
    }
})();

var botStringType = (function () {
    var date = 'D';
    var location = 'L';
    var time = 'T';
    var string = 'S';
    var uneditableText = 'U';

    return {
        DATE: date,
        LOCATION: location,
        TIME: time,
        STRING: string,
        UNEDITABLE: uneditableText
    }
})();

var operationsType = (function () {
    var match = 'MATCH';
    var matches = 'MATCHES';
    var summary = 'SUMMARY';

    return {
        MATCH: match,
        MATCHES: matches,
        SUMMARY: summary
    }
})();
module.exports.chatType = chatType;
module.exports.botStringType = botStringType;
module.exports.operationType = operationsType;