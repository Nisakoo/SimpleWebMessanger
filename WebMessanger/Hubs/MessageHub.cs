using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebMessanger.Hubs
{
    public class MessageHub : Hub
    {
        public Task SendMessage(string username, string message)
        {
            return Clients.Others.SendAsync("ReceiveMessage", username, message);
        }
    }
}
