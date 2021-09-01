using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication1.Repository;

namespace WebApplication1.Challenge
{
    [HubName("challenge")]
    public class ChallengeHub : Hub
    {
        public DataBase DB { get; set; }
        public ChallengeHub()
        {
            DB = DataBase.GetInstance();
        }

        public override Task OnConnected()
        {
            var userId = HttpContext.Current.Request.Cookies.Get("userId").Value;

            var user = DB.GetConnectedUser(userId);

            DB.UpdateHubId(userId, Context.ConnectionId);

            var usersId = user.Rooms.First().Name.Split('|');

            Groups.Add(Context.ConnectionId, user.Rooms.First().Name);

            var user1 = DB.GetConnectedUser(usersId[0]);
            var user2 = DB.GetConnectedUser(usersId[1]);

            var usersName = new List<string>() { user1.Name, user2.Name };

            Clients.Caller.createTitle(usersName);

            return base.OnConnected();
        }
    }
}