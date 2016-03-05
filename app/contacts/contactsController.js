'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController'
        });
    }])

    .controller('ContactsController', ["$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {
        $scope.addContact = function(contact){
            //if activeContact is empty, add me first
            if($rootScope.activeContacts.length == 0){
                $rootScope.activeContacts.push($rootScope.me);
            }
            //store contact in activeContact
            $rootScope.activeContacts.push(contact);
            //set last added contact as activeContact
            $rootScope.activeContact = contact;
            //reload split view
            $location.path("/split");
        };

        $scope.isNotActive = function(contact){
            //check if <contact> was already added to activeContacts
            for(var i=0; i < $rootScope.activeContacts.length; i++){
                if ($rootScope.activeContacts[i] === contact) return false;
            }
            return true;
        }
        $scope.goToSplit = function(){
            $location.path("/split");
        };
    }]);