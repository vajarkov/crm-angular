using Crm.Api.Models;
using Dapper;
using Npgsql;

namespace Crm.Api.Data;

public class ClientRepository : IClientRepository
{
    private readonly NpgsqlDataSource _dataSource;

    public ClientRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    public async Task<IEnumerable<Client>> GetAllAsync()
    {
        await using var connection =
            await _dataSource.OpenConnectionAsync();

        const string sql = """
            SELECT id, name, phone
            FROM clients
            ORDER BY id;
            """;

        return await connection.QueryAsync<Client>(sql);
    }

    public async Task<Client?> GetByIdAsync(int id)
    {
        await using var connection =
            await _dataSource.OpenConnectionAsync();

        const string sql = """
            SELECT id, name, phone
            FROM clients
            WHERE id = @Id;
            """;

        return await connection.QuerySingleOrDefaultAsync<Client>(
            sql,
            new { Id = id });
    }

    public async Task<Client> CreateAsync(
        string name,
        string? phone)
    {
        await using var connection =
            await _dataSource.OpenConnectionAsync();

        const string sql = """
            INSERT INTO clients (name, phone)
            VALUES (@Name, @Phone)
            RETURNING id, name, phone;
            """;

        return await connection.QuerySingleAsync<Client>(
            sql,
            new { Name = name, Phone = phone });
    }

    public async Task<bool> UpdateAsync(
        int id,
        string name,
        string? phone)
    {
        await using var connection =
            await _dataSource.OpenConnectionAsync();

        const string sql = """
            UPDATE clients
            SET name = @Name,
                phone = @Phone
            WHERE id = @Id;
            """;

        var affectedRows = await connection.ExecuteAsync(
            sql,
            new
            {
                Id = id,
                Name = name,
                Phone = phone
            });

        return affectedRows > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        await using var connection =
            await _dataSource.OpenConnectionAsync();

        const string sql = """
            DELETE FROM clients
            WHERE id = @Id;
            """;

        var affectedRows = await connection.ExecuteAsync(
            sql,
            new { Id = id });

        return affectedRows > 0;
    }
}