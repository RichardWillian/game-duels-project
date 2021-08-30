using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Threading.Tasks;
using System.Web;
using WebApplication1.Repository;

namespace WebApplication1.Login
{
    [HubName("login")]
    public class LoginHub : Hub
    {
        private DataBase DB { get; set; }
        private static string CurrentUserId { get; set; }
        public LoginHub()
        {
            DB = DataBase.GetInstance();
        }

        public void ConnectUser(string userName)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                HubId = Context.ConnectionId,
                Name = userName
            };

            DB.AddUser(user);

            Clients.Caller.redirectUser(user.Id, "https://localhost:44339/Lobby/index.html");
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
    }
}