function DrawersBotString( operationType, botStringElements) {

    this.operationType = operationType;
    this.botStringElem = botStringElements;

    this.toString = function () {
        return this.operationType + " has done " + this.botStringElem + " miles";
    };

}

DrawersBotString.prototype.toJsonString = function() {
    return JSON.stringify(this);
};
module.exports.drawersBotString = DrawersBotString;