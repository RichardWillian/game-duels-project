/// <reference path="../Scripts/jquery-1.12.4.js" />
/// <reference path="../Scripts/jquery.signalr-2.2.2.js" />
/// <reference path="../Scripts/jquery-ui-1.12.1.js" />

$(function () {

    hub = $.connection.challenge,
        $versus = $("#versus");

    $.extend(hub.client, {

        createTitle: function (userNames) {
            var userName1 = userNames[0];
            var userName2 = userNames[1];

            $versus.append(`${userName1} x ${userName2}`);
        }
    });

    $.connection.hub.start().done();
});