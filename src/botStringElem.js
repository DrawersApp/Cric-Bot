function BotStringElement( type, placeHolder, text, defaults ) {

    this.type = type;
    this.placeHolder = placeHolder;
    this.text = text;
    this.defaults = defaults;
}

BotStringElement.prototype.toJsonString = function() {
    return JSON.stringify(this);
};
module.exports.bse = BotStringElement;