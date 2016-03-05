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
            postItemToUser: function (itemId, phoneNumber){
                var url = baseUrl+"/Item/"+itemId+"/User/"+phoneNumber;
                return $resource(url).save();
            }
        };
    }]);