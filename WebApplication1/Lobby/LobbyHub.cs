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
    }
}