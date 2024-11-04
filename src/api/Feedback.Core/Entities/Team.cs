using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Feedback.Core.Entities
{
    public class Team
    {
        public int Id
        {
            get; set;
        }
        public string Name
        {
            get; set;
        }

        // Navigation property to associate team with multiple users
        public ICollection<User> Users
        {
            get; set;
        }

        // Navigation property to associate team with a project
        public int ProjectId
        {
            get; set;
        }
        public Project Project
        {
            get; set;
        }
    }
}
