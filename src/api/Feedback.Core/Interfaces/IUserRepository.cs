namespace Feedback.Core.Interfaces;

public interface IUserRepository
{
    Task<User> GetOrCreateUserAsync(string email, string name, string picture);
    Task<IEnumerable<User>> GetAllUsers();
    Task<User?> GetUserById(int id);
}