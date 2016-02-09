var drawersBotStringHelp = (function () {

    var drawersBotStringHelpInstance;

    function create() {

        var drawersBotStrings = [];

        function print() {
            var drawersBotStringContainer = {};
            drawersBotStringContainer['drawersBotStrings'] = drawersBotStrings;
            return JSON.stringify(drawersBotStringContainer);
        }

        function addElement(drawersBotString) {
            drawersBotStrings.push(drawersBotString);
        }

        return {
            print: print,
            addElement: addElement
        };
    }

    return {
        getInstance: function () {
            if (!drawersBotStringHelpInstance) {
                drawersBotStringHelpInstance = create();
            }
            return drawersBotStringHelpInstance;
        }
    };

})();
module.exports = drawersBotStringHelp
