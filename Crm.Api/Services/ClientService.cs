using Crm.Api.Data;
using Crm.Api.Models;

namespace Crm.Api.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _repository;

    public ClientService(IClientRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<Client>> GetAllAsync()
    {
        return _repository.GetAllAsync();
    }

    public Task<Client?> GetByIdAsync(int id)
    {
        return _repository.GetByIdAsync(id);
    }

    public Task<Client> CreateAsync(CreateClientRequest request)
    {
        return _repository.CreateAsync(
            request.Name.Trim(),
            request.Phone?.Trim());
    }

    public Task<bool> UpdateAsync(
        int id,
        UpdateClientRequest request)
    {
        return _repository.UpdateAsync(
            id,
            request.Name.Trim(),
            request.Phone?.Trim());
    }

    public Task<bool> DeleteAsync(int id)
    {
        return _repository.DeleteAsync(id);
    }
}