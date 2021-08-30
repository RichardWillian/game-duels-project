/// <reference path="../Scripts/jquery-1.12.4.js" />
/// <reference path="../Scripts/jquery.signalr-2.2.2.js" />
/// <reference path="../Scripts/jquery-ui-1.12.1.js" />

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function connectUser() {

    let hub = $.connection.login,
        $userName = $("#username");

    hub.client.redirectUser = function (userId, target) {

        setCookie('userId', userId, 1);

        window.location = target;
    };

    $.connection.hub.start()
        .done(function () {
            hub.server.connectUser($userName.val());
        });
}