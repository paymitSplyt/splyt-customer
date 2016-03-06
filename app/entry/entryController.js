'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/entry', {
            templateUrl: 'entry/entry.html',
            controller: 'EntryController'
        });
    }])

    .controller('EntryController', ["$scope", "$rootScope", "contactsService", "$location", function($scope, $rootScope, contactsService, $location) {
        //preset cartId
        $scope.cartId = 1;
        $scope.setMe = function(){
            for(var i=0; i<$rootScope.contacts.length; i++){
                if($rootScope.contacts[i].id == $scope.userId){
                    $rootScope.contacts[i].prename = "Me";
                    $rootScope.me=$rootScope.contacts[i];
                    break;
                }
            }
            $rootScope.activeContacts.push($rootScope.me);
            $rootScope.activeContact=$rootScope.me;
        }

        $scope.errorMessage = "";

        $scope.goToSplit = function(){
            $scope.setMe();
            $rootScope.userId = $scope.userId;
            $rootScope.cartId = $scope.cartId;
            if(!$scope.userId){
                $scope.errorMessage = "Please select a user!"
                return;
            }
            $location.path("/split");
        };
        $scope.loadContacts = function () {
            contactsService.getContacts().success(function(data){
                $rootScope.contacts = data.contacts;
            });

        };
        $rootScope.activeContacts = new Array();
        $rootScope.activeContact = null;
        $scope.loadContacts();
    }]);