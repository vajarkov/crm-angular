using System.ComponentModel.DataAnnotations;

namespace Crm.Api.Models;

public record UpdateClientRequest(
    [Required]
    [StringLength(200, MinimumLength = 1)]
    string Name,

    [StringLength(30)]
    string? Phone);