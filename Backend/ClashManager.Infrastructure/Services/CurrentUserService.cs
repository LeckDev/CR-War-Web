using System.Security.Claims;
using ClashManager.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace ClashManager.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    public bool IsAuthenticated => UserId != null;
}