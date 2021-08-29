/// <reference path="../Scripts/jquery-1.12.4.js" />
/// <reference path="../Scripts/jquery.signalr-2.2.2.js" />
/// <reference path="../Scripts/jquery-ui-1.12.1.js" />

$(function () {
    var hub = $.connection.moveShape,
        $shape = $("#shape");

    $.extend(hub.client, {
        shapeMoved: function (cid, x, y) {
            if (cid !== $.connection.hub.id) {
                $shape.css({ left: x, top: y });
            }
        }
    });

    $.connection.hub.start().done(function () {
        $shape.draggable({
            drag: function () {
                hub.server.moveShape(this.offsetLeft, this.offsetTop || 0);
            }
        })
    });
});