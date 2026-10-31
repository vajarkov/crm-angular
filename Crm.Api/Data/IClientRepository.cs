using Crm.Api.Models;

namespace Crm.Api.Data;

public interface IClientRepository
{
    Task<IEnumerable<Client>> GetAllAsync();
    Task<Client?> GetByIdAsync(int id);
    Task<Client> CreateAsync(string name, string? phone);
    Task<bool> UpdateAsync(int id, string name, string? phone);
    Task<bool> DeleteAsync(int id);
}