'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pay', {
            templateUrl: 'pay/pay.html',
            controller: 'PayController'
        });
    }])

    .controller('PayController', ["$scope", "$rootScope", "contactsService", "cartService", "$location", function($scope, $rootScope, contactsService, cartService, $location) {
        $scope.togglePaySelection=false

        $scope.loadCart = function () {
            $scope.cart = cartService.getCart($scope.cartId);
        };
        $scope.loadCart();

        $scope.totalMe = "403";
        $scope.toPayFor = Array();
        $scope.toPayFor.push($rootScope.me);
        $scope.addToPayFor = function(contact){
            $scope.toPayFor.push(contact);
        }
        $scope.goToSplit = function(){
            $location.path("/split");
        };
    }]);