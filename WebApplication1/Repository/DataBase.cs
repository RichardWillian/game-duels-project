using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Repository
{
    public class DataBase
    {
        private static DataBase _instance;
        private List<User> ConnectedUsers { get; set; }

        public DataBase()
        {
            ConnectedUsers = new List<User>();
        }

        public void AddUser(User user)
        {
            ConnectedUsers.Add(user);
        }

        public User GetConnectedUser(string id) => ConnectedUsers.SingleOrDefault(x => x.Id.ToString() == id);

        public List<User> GetConnectedUsers() => ConnectedUsers;

        public int GetNumberConnectedUsers() => ConnectedUsers.Count;

        public bool CheckUserIsConnected(string hubId) => ConnectedUsers.Any(x => x.HubId == hubId);

        public static DataBase GetInstance()
        {
            if (_instance == null)
                _instance = new DataBase();

            return _instance;
        }

        internal void UpdateHubId(string userId, string connectionId)
        {
            ConnectedUsers.Single(x => x.Id.ToString() == userId).HubId = connectionId;
        }

        internal void UpdateUser(User user)
        {
            var index = ConnectedUsers.FindIndex(x => x.Id == user.Id);

            ConnectedUsers[index] = user;
        }
    }
}