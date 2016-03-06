'use strict';

angular.module('myApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/split', {
            templateUrl: 'split/split.html',
            controller: 'SplitController'
        });
    }])

    .controller('SplitController', ["$scope", "$route", "$rootScope", "$location", "$http", "notificationService", "cartService", function ($scope, $route, $rootScope, $location, $http, notificationService, cartService) {
        notificationService.receiveNotification(function () {
            $scope.loadCart();
            $scope.loadActiveUsers();
        });

        $scope.loadActiveUsers = function(){
            var activePhoneNumbers = Array();
            for(var j=0;j<$rootScope.activeContacts.length;j++){
                activePhoneNumbers.push($rootScope.activeContacts[j].number)
            }
            console.log(activePhoneNumbers);

            cartService.getUsers($scope.cartId).$promise.then(function(data){
                for(var i=0;i<data.length;i++){
                    if($.inArray(data[i],activePhoneNumbers)<0){
                        for(var k=0;k<$rootScope.contacts.length;k++){
                            if($rootScope.contacts[k].number===data[i]){
                                $rootScope.activeContacts.push($rootScope.contacts[k]);
                                console.log("added "+$rootScope.contacts[k].number);
                            }
                        }
                    }
                }
            });
        }

        $scope.loadCart = function () {
            if($rootScope.activeContact){
                $scope.cart = cartService.getCart($scope.cartId, $rootScope.activeContact.number);
            } else {
                $scope.cart = cartService.getCart($scope.cartId);
            }
        };
        $scope.loadCart();
        $scope.loadActiveUsers();
        $scope.goToContacts = function(){
            $location.path("/contacts");
        };
        $scope.setActiveContact = function(contact){
            $rootScope.activeContact = contact;
            $scope.loadCart();
        }
        $scope.goToPay = function(){
            $location.path("/pay");
        }
        $scope.addToActiveContact = function(item){
            //only works if someone is set as activeContact
            if ($rootScope.activeContact == null) return;
            //add item to activeContact
            console.log("adding "+item.description+" to "+$rootScope.activeContact.prename);
            if(item.userAmount == 0){
                cartService.postItemToUser(item.id, $rootScope.activeContact.number).$promise.then(function(){
                    $scope.loadCart();
                });
            } else {
                cartService.putItemToUser(item.id, $rootScope.activeContact.number, item.userAmount+1).$promise.then(function(){
                    $scope.loadCart();
                });
            }

        }


    }]);