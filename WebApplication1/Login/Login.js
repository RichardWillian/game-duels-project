/// <reference path="../Scripts/jquery-1.12.4.js" />
/// <reference path="../Scripts/jquery.signalr-2.2.2.js" />
/// <reference path="../Scripts/jquery-ui-1.12.1.js" />

function connectUser() {

    let hub = $.connection.login,
        $userName = $("#username");

    hub.client.redirectUser = function (target) {
        window.location = target;
    };

    $.connection.hub.start()
        .done(function () {
            hub.server.connectUser($userName.val());
        });
}