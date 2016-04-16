'use strict';
var Reflux = require('reflux');

var appActions = require('../actions/appActions');

var user = {};

var tweetsStore = Reflux.createStore({
    init: function () {
        this.listenTo(appActions.init, this.appInit);
    },
    appInit: function (INITIAL_APP_STATE) {
        user = INITIAL_APP_STATE.user;
        this.trigger(user);
    }
});

module.exports = tweetsStore;