module.exports = function(gui) {
    var devTools = {
        key : "Ctrl+Alt+J",
        active : function() {
            // console.log("Global desktop keyboard shortcut: " + this.key + " active.");
        },
        failed : function(msg) {
            // :(, fail to register the |key| or couldn't parse the |key|.
            //console.log(msg);
        }
    };

    var exit = {
        key : "Ctrl+Alt+L",
        active : function() {
            // console.log("Global desktop keyboard shortcut: " + this.key + " active.");
        },
        failed : function(msg) {
            // :(, fail to register the |key| or couldn't parse the |key|.
            //console.log(msg);
        }
    };

    // Create a shortcut with |option|.
    var devToolsShortCut = new gui.Shortcut(devTools);
    var exitShortCut = new gui.Shortcut(exit);

    gui.App.registerGlobalHotKey(devToolsShortCut);
    devToolsShortCut.on('active', function() {
        gui.Window.get().showDevTools();
    });
    devToolsShortCut.on('failed', function(msg) {
    });

    gui.App.registerGlobalHotKey(exitShortCut);
    exitShortCut.on('active', function() {
        gui.Window.get().close();
    });
    exitShortCut.on('failed', function(msg) {

    });
};