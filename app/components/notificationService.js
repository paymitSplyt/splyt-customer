(function ($) {
    "use strict";

    var receiveNotificationHandler;

    // Declare a proxy to reference the hub.
    var notification = $.connection.notificationHub;
    notification.client.notify = function () {
        if (typeof receiveNotificationHandler === "function") {
            receiveNotificationHandler();
        }
    };

    // Start the connection.receiveNotificationHandler
    $.connection.hub.url = "http://172.16.10.133:8080/signalr";
    $.connection.hub.start();

    function notificationService() {
        return {
            receiveNotification: function (handler) {
                receiveNotificationHandler = handler;
            },
            notify: function () {
                // Call the Send method on the hub.
                notification.server.notify();
            },
            restartConnection: function () {
                $.connection.hub.stop();
                $.connection.hub.start();
            }
        };
    }

    angular
        .module("myApp")
        .factory("notificationService", notificationService);
})(jQuery);