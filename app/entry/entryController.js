'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/entry', {
            templateUrl: 'entry/entry.html',
            controller: 'EntryController'
        });
    }])

    .controller('EntryController', ["$scope", "$rootScope", "contactsService", "$location", function($scope, $rootScope, contactsService, $location) {
        //initialize and populate inpus
        $scope.userId = 41799876543;
        $scope.cartId = 1;
        $scope.goToSplit = function(){
            $rootScope.userId = $scope.userId;
            $rootScope.cartId = $scope.cartId;
            $location.path("/split");
        };
        $scope.loadContacts = function () {
            contactsService.getContacts().success(function(data){
                $rootScope.contacts = data.contacts;
            });

        };
        $rootScope.activeContacts = new Array();
        $rootScope.activeContact = null;
        $rootScope.me={"id": "999", "prename": "Me", "name": "", "number":"+41799876543", "picture":"pictures/pic1.jpg"};
        $scope.loadContacts();
    }]);