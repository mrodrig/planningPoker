'use strict';
var _ = require('underscore'),
    idGenerator = require('shortid');

var controller = {},
    users = [];

controller.isUserAlreadyAttendee = function (id) {
    return _.findWhere(users, {id: id});
};

controller.addUser = function (user) {
    users.push(user);
};

controller.removeUser = function (id) {
    var indx = _.indexOf(users, _.findWhere(users, {socketId: id}));
    delete users[indx];
    users = _.filter(users);
};

controller.personInfoRequest = function (data) {
    var person = {
        socketId: data.clientId,
        id: idGenerator.generate(),
        name: data.name || 'Unknown User',
        sizeValue: null
    };
    controller.addUser(person);
    return person;
};

controller.getUsers = function () {
    return users;
};

controller.updateUserSize = function (data) {
    console.log(data);
    _.findWhere(users, {id: data.id}).sizeValue = data.sizeValue;
};

controller.clearSizes = function () {
    _.each(_.keys(users), function (id) {
        users[id].sizeValue = null;
    });
};

module.exports = controller;