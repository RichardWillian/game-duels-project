using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
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

        public void InviteOpponent(string opponentId)
        {
            if (DB.CheckUserIsConnected(opponentId))
            {

            }

            var opponent = Clients.User(opponentId);

            if(opponent != null)
            {
                opponent.inviteOpponent(Context.ConnectionId, opponentId);
            }
        }
    }
}