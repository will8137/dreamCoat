var Users = [];
var isRequesting = false;
var _ = require('lodash');
var MiniVents = require('minivents');
var Dispatcher = require('dispatcher');
var Constants = require('constants/users.js');

var UsersStore = _.assign({

    initialize: function() {
        Dispatcher.register(Constants.ADD_USER_REQUEST, this.onAddUserRequest, this);
        Dispatcher.register(Constants.ADD_USER_SYNC, this.onAddUserSync, this);
        Dispatcher.register(Constants.DELETE_USER_REQUEST, this.onDeleteUserRequest, this);
        Dispatcher.register(Constants.DELETE_USER_SYNC, this.onDeleteUserSync, this);
    },

    onAddUserRequest: function(newUser) {
        isRequesting = true;
        this.emit('change');
    },

    onAddUserSync: function(newUser) {
        isRequesting = false;
        Users.push(newUser);
        this.emit('change');
    },

    onDeleteUserRequest: function() {
        isRequesting = true;
        this.emit('change');
    },

    onDeleteUserSync: function(oldUser) {
        isRequesting = false;
        var updatedUsers = Users.filter(function(user){
            return user._id != oldUser._id;
        });
        
        Users = updatedUsers;

        this.emit('change');
    },
    
    getData: function() {
        return {
            _users: Users
        }
    },

    getById: function(id) {
        return _.find(Users, {_id: id});
    },

    isRequesting: function() {
        return isRequesting;
    }

}, new MiniVents());

UsersStore.initialize();

module.exports = UsersStore