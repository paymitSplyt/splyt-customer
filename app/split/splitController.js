'use strict';

angular.module('myApp')



    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/split', {
            templateUrl: 'split/split.html',
            controller: 'SplitController'
        });
    }])

    .controller('SplitController', ["$scope", "$rootScope", "$location", "$http", "cartService", function ($scope, $rootScope, $location, $http, cartService) {
        $scope.loadCart = function () {
            if($rootScope.activeContact){
                $scope.cart = cartService.getCart($scope.cartId, $rootScope.activeContact.number.substr(1));
            } else {
                $scope.cart = cartService.getCart($scope.cartId);
            }
        };
        $scope.loadCart();
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
            cartService.postItemToUser(item.id, $rootScope.activeContact.number.substr(1)).$promise.then(function(){
                $scope.loadCart();
            });
        }


    }]);