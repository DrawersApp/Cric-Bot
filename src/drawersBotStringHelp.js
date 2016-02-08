var drawersBotStringHelp = (function () {

    var drawersBotStringHelpInstance;

    function create () {

        var drawersBotStringList = [];
        function print() {
            // underlying printer mechanics
            return JSON.stringify(drawersBotStringList);
        }

        function addElement(drawersBotString) {
            // add to drawersbot string
            drawersBotStringList.push(drawersBotString);
        }

        return {
            print: print,
            addElement: addElement
        };
    }

    return {
        getInstance: function() {
            if(!drawersBotStringHelpInstance) {
                drawersBotStringHelpInstance = create();
            }
            return drawersBotStringHelpInstance;
        }
    };

})();
module.exports.drawersBotStringHelp = drawersBotStringHelp
