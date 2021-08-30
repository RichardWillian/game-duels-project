/// <reference path="../Scripts/jquery-1.12.4.js" />
/// <reference path="../Scripts/jquery.signalr-2.2.2.js" />
/// <reference path="../Scripts/jquery-ui-1.12.1.js" />

let hub = null;
$(function () {

    function generateRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createCard(user) {
        return `<div class="card">
                    <p id="${user.Id}">
                        Id: ${user.Id}<br>
                        Name: ${user.Name}
                    </p>
                    <br>
                    <button onclick="toChallenge('${user.Id}')">
                        Desafiar
                    </button>
                </div>`;
    }

    function createNotification(challengerName, userName) {
        return `<div class="notification">
        <div class="profile">
            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a8ccd69bd6cc884f728949673c6829cf' alt=''>
        </div>
        <div class="message">
            E aí, ${userName}, bora um x1 no Free Fire ?
        </div>
        <div class="user">
            ${challengerName}
        </div>
        <button id="decision-yes">
            Sim
        </button>
        <button id="decision-no">
            Não
        </button>
    </div>`;
    }

    hub = $.connection.lobby,
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
        },
        toChallenge: function (challengerName, userName) {
            let $notification = createNotification(challengerName, userName);
            let $body = $('body');

            $body.append($notification);
        }
    });

    $.connection.hub.start().done(function () {
        hub.server.createCard(getCookie('userId'));
    });
});

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


function toChallenge(userId) {
    hub.server.toChallenge(getCookie('userId'), userId);
}