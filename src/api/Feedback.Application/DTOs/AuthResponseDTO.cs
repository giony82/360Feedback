using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Feedback.Application.DTOs
{
    public class AuthResponseDTO
    {
        public string Token { get; set; }
        public UserDto User { get; set; }
    }
}
