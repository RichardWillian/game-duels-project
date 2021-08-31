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
                    <button onclick="showOptions('${user.Id}')">
                        Desafiar
                    </button>
                </div>`;
    }

    function createChallengerNotification(challenger, userName, options) {

        let opt = JSON.parse(options);

        return `<div class="notification">
        <div class="profile">
            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a8ccd69bd6cc884f728949673c6829cf' alt=''>
        </div>
        <div class="message">
            E aí, ${userName}, bora um x1 no Free Fire ?
        </div>
        <div class="user">
            ${challenger.Name}
        </div>
        <button id="decision-yes" onclick="acceptChallenge('${challenger.Id}')">
            Sim
        </button>
        <button id="decision-no" onclick="refuseChallenge('${challenger.Id}')">
            Não
        </button>
        <div id="options">
            <p>Gun: ${opt.gun}</p><br>
            <p>Map: ${opt.map}</p><br>
            <p>Value: ${opt.value}</p>
        </div>
    </div>`;
    }

    function createRefusedNotification(challengedName) {

        return `<div class="notification">
        <div class="profile">
            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a8ccd69bd6cc884f728949673c6829cf' alt=''>
        </div>
        <div class="message">
            Tô suave, Irmão !
        </div>
        <div class="user">
            ${challengedName}
        </div>
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
        toChallenge: function (challenger, userName, options) {
            let $notification = createChallengerNotification(challenger, userName, options);
            let $body = $('body');

            $body.append($notification);
        },
        refuseChallenge: function (challengedName) {
            let $refusedNotification = createRefusedNotification(challengedName);
            let $body = $('body');

            $body.append($refusedNotification);
        },
        acceptChallenge: function (target) {
            window.location = target;
        }
    });

    $.connection.hub.start().done(function () {
        hub.server.createCard(getCookie('userId'));
    });
});

function showOptions(userId) {
    removeNotification();
    let options = `<div id="challengerOptions">
                        <div>
                            <label for="guns">Choose a gun:</label>
                            <select name="guns" id="guns">
                                <option value="Pistol">Pistol</option>
                                <option value="Assault Rifle">Assault Rifle</option>
                                <option value="Sniper">Sniper</option>
                            </select>
                        </div>
                        <br>
                        <div>
                            <label for="maps">Choose a map:</label>
                            <select name="maps" id="maps">
                                <option value="Map1">Map 1</option>
                                <option value="Map2">Map 2</option>
                                <option value="Map3">Map 3</option>
                            </select>
                        </div>
                        <br>
                        <button onclick="toChallenge('${userId}')">
                            Enviar Desafio
                        </button>
                    </div>`;

    $('.options').append(options);
}

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

    let options = {
        gun: $("#guns option:selected").text(),
        map: $("#maps option:selected").text(),
        value: 50
    }

    removeNotification();
    hub.server.toChallenge(getCookie('userId'), userId, JSON.stringify(options));
}

function refuseChallenge(challengerId) {
    removeNotification();
    hub.server.refuseChallenge(challengerId, getCookie('userId'));
}

function acceptChallenge(challengerId) {
    hub.server.acceptChallenge(challengerId, getCookie('userId'));
}

function removeNotification() {
    $('#challengerOptions').remove()
    $(".notification").remove();
}