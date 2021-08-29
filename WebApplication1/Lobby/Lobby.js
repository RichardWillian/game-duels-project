/// <reference path="../Scripts/jquery-1.12.4.js" />
/// <reference path="../Scripts/jquery.signalr-2.2.2.js" />
/// <reference path="../Scripts/jquery-ui-1.12.1.js" />

$(function () {

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function generateRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createCard(user) {
        return `<div class="card" id="${user.Id}">
                    <p id="${user.Id}">
                        Id: ${user.Id}<br>
                        Name: ${user.Name}
                    </p>
                </div>`;
    }

    let hub = $.connection.lobby,
        $cardContainer = $(".card-container");

    $.extend(hub.client, {
        createCard: function (user) {

            if (user.HubId === $.connection.hub.id)
                return;

            let $card = $(`#${user.Id}`);

            if ($card.innerWidth())
                return;

            let card = createCard(user);

            $cardContainer.append(card);

            $card.css({
                background: generateRandomColor()
            });
        }
    });

    $.connection.hub.start().done(function () {
        hub.server.createCard(getCookie('userId'));
    });
});