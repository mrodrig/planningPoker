'use strict';

angular.module('planning').controller('SizingController', function ($scope, $rootScope, $document) {

    $scope.users = [];
    $scope.currentSizeValue = null;
    $scope.averages = {regular: null, closest: -1};
    $scope.mode = null;
    $scope.cards = ['0', '1', '2', '3', '5', '8', '13', '?']; // 'c' => Clear (if presenter)
    
    var findUserIndx = function (user) {
        return _.indexOf($scope.users, _.findWhere($scope.users, user));
    };

    var resetStats = function () {
        $scope.averages.regular = null;
        $scope.averages.closest = -1;
        $scope.mode = null;
    };

    $rootScope.socket.on('notification:user:connect', function (user) {
        console.log('New user connected', user);
        $scope.users.push(user);
        $scope.apply();
    });

    $scope.clearSizes = function () {
        console.log('Clearing sizes via clearSizes()');
        $rootScope.socket.emit('notification:presenter:clearRequest');
    };

    $scope.computeStats = function () {
        resetStats();
        // Compute the average
        var sizeList = _.filter(_.pluck($scope.users, 'sizeValue'), (s) => {return !isNaN(parseInt(s, 10))}),
            numericSizePossibilities = _.filter($scope.cards, (c) => {return !isNaN(parseInt(c, 10))});

        var computeAverage = function () {
            return (_.reduce(sizeList, (memo, num) => { return memo + parseInt(num, 10) }, 0) / sizeList.length);
        };

        var computeMode = function () {
            return _.chain(sizeList).countBy().pairs().max(_.last).head().value();
        };

        var computeClosest = function () {
            _.each(numericSizePossibilities,
                    (possible) => {
                possible = parseInt(possible, 10);

                if (Math.abs($scope.averages.regular - possible) < Math.abs($scope.averages.regular - $scope.averages.closest)) {
                    $scope.averages.closest = possible;
                }
            });
        };

        // Don't do anything if there aren't any sizes to compute stats for
        if (sizeList.length < 1) { return ; }

        $scope.averages.regular = computeAverage();

        // Compute the mode
        $scope.mode = computeMode();

        // Compute the value closest to the possible sizes
        computeClosest();

        $scope.apply();
    };

    $scope.reportSizing = function (size) {
        console.log('Reporting size', size);
        $scope.currentSizeValue = size;
        $rootScope.socket.emit('notification:user:reportSize', {
            id: $rootScope.user.id,
            sizeValue: size
        });
    };

    $rootScope.socket.on('notification:user:clearSizes', function () {
        console.log('Received request to clear sizes.');
        _.each(_.keys($scope.users), function (id) {
            $scope.users[id].sizeValue = null;
        });
        resetStats();
        $scope.apply();
    });

    $rootScope.socket.on('people:alreadyAttendee', function () {
        console.log('WARN: You are already an attendee!');
        $scope.alreadyAttendee = true;
        $scope.apply();
    });

    $rootScope.socket.on('notification:user:sizeValue', function (data) {
        console.log('Received size value from user', data);
        var userIndx = findUserIndx({id: data.id});
        $scope.users[userIndx].sizeValue = data.sizeValue;
        $scope.computeStats();
        $scope.apply();
    });

    $rootScope.socket.on('people:currentAttendees', function (data) {
        console.log('Received current attendees list', data);
        $scope.users = data;
        $scope.computeStats();
        $scope.apply();
    });

    $rootScope.socket.on('notification:user:disconnect', function (data) {
        console.log('Attendee left.', data);
        delete $scope.users[findUserIndx(data)];
        $scope.users = _.filter($scope.users);
        $scope.computeStats();
        $scope.apply();
    });

    $document.bind('keypress', function(e) {
        var key = String.fromCharCode(e.which);
        if (_.contains($scope.cards, key)) {
            $scope.reportSizing(key);
        } else if (key === 'c' && !$rootScope.user) {
            // Presentation Mode --> Clear the size values
            $scope.clearSizes();
        }
    });

    /**
     * If not current in a digest cycle, apply the changes to the scope
     * @param cb {Function} callback function to be called after applying
     */
    $scope.apply = function (cb) {
        if (!$scope.$$phase) {
            $scope.$apply(function () {
                cb ? cb() : "";
            });
        }
    };
});