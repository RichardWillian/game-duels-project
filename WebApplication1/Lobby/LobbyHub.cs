using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Repository;

namespace WebApplication1.Lobby
{
    [HubName("lobby")]
    public class LobbyHub : Hub
    {
        private DataBase DB { get; set; }
        public LobbyHub()
        {
            DB = DataBase.GetInstance();
        }

        public override Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, "Lobby");

            return base.OnConnected();
        }

        public void CreateCard(string userId)
        {
            DB.UpdateHubId(userId, Context.ConnectionId);

            foreach (var user in DB.GetConnectedUsers())
            {
                Clients.Group("Lobby").createCard(user);
            }
        }

        public void ToChallenge(string challengerId, string userId, string options)
        {
            var user = DB.GetConnectedUser(userId);

            if (user == null)
                return;

            var challenger = DB.GetConnectedUser(challengerId);

            if (challenger == null)
                return;

            Clients.Client(user.HubId).toChallenge(challenger, user.Name, options);
        }

        public void RefuseChallenge(string challengerId, string userId)
        {
            var user = DB.GetConnectedUser(userId);

            if (user == null)
                return;

            var challenger = DB.GetConnectedUser(challengerId);

            if (challenger == null)
                return;

            Clients.Client(challenger.HubId).refuseChallenge(user.Name);
        }

        public void AcceptChallenge(string challengerId, string userId)
        {
            var user = DB.GetConnectedUser(userId);

            if (user == null)
                return;

            var challenger = DB.GetConnectedUser(challengerId);

            if (challenger == null)
                return;

            var groupName = $"{user.Id}|{challenger.Id}";
            DB.AddRoom(user.Id, groupName);
            DB.AddRoom(challenger.Id, groupName);

            var target = "https://localhost:44339/Challenge/index.html";
            Clients.Client(user.HubId).redirectUser(target);
            Clients.Client(challenger.HubId).redirectUser(target);
        }
    }
}