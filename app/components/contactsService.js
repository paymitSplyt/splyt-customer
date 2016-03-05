"use strict";

angular
    .module("myApp")
    .factory("contactsService", ["$http", function contactsService($http) {

        return {
            getContacts: function () {
                return $http.get('contacts.json');
            }
        };
    }]);