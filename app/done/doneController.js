'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/done', {
            templateUrl: 'done/done.html',
            controller: 'DoneController'
        })
    }])

    .controller('DoneController', ["$scope", "$rootScope", "contactsService", "cartService", "$location", function($scope, $rootScope, contactsService, cartService, $location) {

        $scope.goToEntry = function(){
            $location.path("/entry");
        };
    }]);