function DrawersBotString(operationsType, botStringElements) {

    this.operationsType = operationsType;
    this.botStringElements = botStringElements;

    this.toString = function () {
        return this.operationsType + " has done " + this.botStringElements + " miles";
    };

}

DrawersBotString.prototype.toJsonString = function () {
    return JSON.stringify(this);
};
module.exports = DrawersBotString;