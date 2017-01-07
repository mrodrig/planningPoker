'use strict';

// Declare app level module which depends on filters, and services
angular.module('planning', ['ngRoute'])
    .run(['$rootScope', '$http', '$location', '$routeParams',
        function ($rootScope, $http, $location, $routeParams) {

            $rootScope.socket = io();
            $rootScope.connectionStatus = '';

            /**
             * If not current in a digest cycle, apply the changes to the scope
             * @param cb {Function} callback function to be called after applying
             */
            $rootScope.apply = function (scope) {
                scope = scope || $rootScope;
                if (!scope.$$phase) {
                    scope.$apply(function () {});
                }
            };

            $rootScope.populateUserDetails = function () {
                // When reconnecting, don't re-prompt if the user already entered their info or is in presentation mode
                if (!$rootScope.name && !$rootScope.presentationMode) {
                    $rootScope.name = prompt('Please enter your name.');
                    if (!$rootScope.name) {
                        $rootScope.presentationMode = true;
                    }
                }

                // If in presentation mode, don't continue (don't need to request user's data)
                if ($rootScope.presentationMode) { return ; }
                $rootScope.socket.emit('people:joinRequest', {name: $rootScope.name});
            };

            $rootScope.socket.on('people:personInfo', function (data) {
                $rootScope.user = data;
                $rootScope.apply();
            });

            $rootScope.socket.on('connect_error', function (data) {
                if ($rootScope.connectionStatus !== 'error') {
                    console.log('ERROR: A connection error occurred.');
                    $rootScope.connectionStatus = 'error';
                    $rootScope.apply();
                }
            });

            $rootScope.socket.on('reconnect', function (data) {
                console.log('INFO: Reconnected to application.');
                $rootScope.connectionStatus = 'reconnected';
                init();
            });
            
            $rootScope.clearConnectionStatus = function () {
                $rootScope.connectionStatus = '';
            };

            var init = function () {
                $rootScope.populateUserDetails();
                $rootScope.socket.emit('people:currentAttendeesRequest');
            };

            init();
        }]);