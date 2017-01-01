'use strict';

var events = require('events'),
    _ = require('underscore');
    
module.exports = function(logging, socketController, expressApp) {
    var server = require('http').createServer(expressApp),
        io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
        var clientId = socket.id;
        logging.info('Client connected', {socketId: socket.id});

        socket.on('people:joinRequest', function (data) {
            logging.info('User requested their person info.', data);
            if (socketController.isUserAlreadyAttendee(data.name)) {
                logging.warn('User is already attendee but attempted joining again.', data);
                return socket.emit('people:alreadyAttending');
            }
            var person = socketController.personInfoRequest(_.extend(data, {clientId: socket.id}));
            logging.debug('Sending person information', person);
            socket.emit('people:personInfo', person);
            socket.broadcast.emit('notification:user:connect', person);
        });

        socket.on('notification:user:reportSize', function (data) {
            logging.info('Received size report from user', data);
            socketController.updateUserSize(data);
            logging.debug('Broadcasting reported size to all users.', data);
            io.emit('notification:user:sizeValue', data);
        });
        
        socket.on('notification:presenter:clearRequest', function () {
            logging.info('Received request to clear reported sizes.');
            socketController.clearSizes();
            logging.debug('Broadcasting a clearSizes request to all clients.');
            io.emit('notification:user:clearSizes');
        });
        
        socket.on('people:currentAttendeesRequest', function () {
            logging.info('Received request for all current attendees.');
            socket.emit('people:currentAttendees', socketController.getUsers());
        });

        //Disconnect Event - Stop
        socket.on('disconnect', function () {
            logging.info('Client disconnected.', {socketId: clientId});
            socketController.removeUser(clientId);
            socket.broadcast.emit('notification:user:disconnect', {socketId: clientId});
        });
    });

    return {server: server, io: io};
};