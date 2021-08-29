using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Repository
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Room> Rooms { get; set; }
        public string HubId { get; set; }
    }
}