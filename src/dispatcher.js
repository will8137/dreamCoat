var callbacks = [];
var Dispatcher = {

    register: function(action, callback, context) {
        (callbacks[action] = callbacks[action] || []).push([callback, context])
    },

    unregister: function(action, callback) {
        action || (callbacks = {})
        var list = callbacks[action] || [],
            i = list.length = callback ? list.length : 0;
        while(i--) callback == list[i][0] && list.splice(i,1)
    },

    dispatch: function(payload) {
        if (!payload.action) {
            console.log('Dispatcher requires an action attribute');
        }
        var list = callbacks[payload.action] || [], i=0, j;
        while(j=list[i++]) j[0].apply(j[1], [payload.data])
    }

};

module.exports = Dispatcher;