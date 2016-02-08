var drawersBotStringHelp = (function () {

    var drawersBotStringHelpInstance;

    function create () {

        var DrawersBotStringHelp = [];
        function print() {
            // underlying printer mechanics
            return JSON.stringify(DrawersBotStringHelp);
        }

        function addElement(drawersBotString) {
            // add to drawersbot string
            DrawersBotStringHelp.push(drawersBotString);
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
