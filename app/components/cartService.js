"use strict";

angular
    .module("myApp")
    .factory("cartService",["$resource", function cartService($resource) {
        var baseUrl = "http://172.16.10.133:8080/Cart/";
        return {
            getCart: function (cartId, phoneNumber) {
                var url = baseUrl+cartId;
                if (phoneNumber) url += "/User/"+phoneNumber;
                return $resource(url).get();
            },
            getUsers: function (cartId) {
                var url = baseUrl + cartId + "/Users";
                return $resource(url).query();
            },
            getUserBalance: function (cartId, phoneNumber) {
                var url = baseUrl + cartId + "/balance/" + phoneNumber;
                return $resource(url).get();
            },
            postItemToUser: function (itemId, phoneNumber){
                var url = baseUrl+"Item/"+itemId+"/User/"+phoneNumber;
                return $resource(url).save();
            },
            putItemToUser: function (itemId, phoneNumber, amount){
                var url = baseUrl+"Item/"+itemId+"/User/"+phoneNumber+"/amount/"+amount;
                return $resource(url, {}, {put:{method:"put"}}).put();
            },
            postPay: function (cartId, contactsToPayFor){
                var url = baseUrl + cartId + "/pay";
                return $resource(url).save(contactsToPayFor);
            }
        };
    }]);