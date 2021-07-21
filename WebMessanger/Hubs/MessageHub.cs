using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebMessanger.Hubs
{
    public class MessageHub : Hub
    {
        public Task SendMessage(string username, string message, string color)
        {
            return Clients.Others.SendAsync("ReceiveMessage", username, message, color);
        }
    }
}
