'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pay', {
            templateUrl: 'pay/pay.html',
            controller: 'PayController'
        })
    }])

    .controller('PayController', ["$scope", "$rootScope", "contactsService", "cartService", "$location", function($scope, $rootScope, contactsService, cartService, $location) {
        $scope.togglePaySelection=false;

        $scope.loadCart = function () {
            $scope.cart = cartService.getCart($scope.cartId);
        };
        $scope.loadCart();
        $scope.totalBalance = 0;

        $scope.loadBalance = function(){
            for(var i=0;i<$rootScope.activeContacts.length;i++){
                var contact = $rootScope.activeContacts[i];
                $scope.getBalance(contact);
            }
        }

        $scope.getBalance = function(contact){
            cartService.getUserBalance($scope.cartId, contact.number).$promise.then(function(data){
                contact.balance = data.balance;
                if(contact===$rootScope.me) $scope.totalBalance += data.balance;
            });
        }

        $scope.loadBalance();
        $scope.toPayFor = Array();
        $scope.toPayFor.push($rootScope.me);

        $scope.toogleToPayFor = function(contact){
            if(contact===$rootScope.me) return;
            if($.inArray(contact, $scope.toPayFor)>=0){
                $scope.toPayFor.splice($.inArray(contact,$scope.toPayFor),1);
                $scope.totalBalance -= contact.balance;
            } else {
                $scope.toPayFor.push(contact);
                $scope.totalBalance += contact.balance;
            }
        };
        $scope.goToSplit = function(){
            $location.path("/split");
        };

        $scope.doPay = function(){
            var contactsToPayFor = Array();
            for(var i=0; i<$scope.toPayFor.length;i++){
                contactsToPayFor.push($scope.toPayFor[i].number);
            }
            console.log("issue payment request for the following users "+contactsToPayFor)
            cartService.postPay($scope.cartId, contactsToPayFor);
            $location.path("/done");
        }
    }]);