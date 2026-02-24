namespace ClashManager.Application.Clans.Commands.RegisterClan;

// Fichier : RegisterClanCommand.cs

using ClashManager.Application.Common.Interfaces;
using ClashManager.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

public record RegisterClanCommand(
    string Tag,
    int WarningThreshold,
    int PromotionThreshold,
    string UserId) : IRequest<Guid>;

// Fichier : RegisterClanCommandHandler.cs
public class RegisterClanCommandHandler : IRequestHandler<RegisterClanCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IClashRoyaleService _clashService;

    public RegisterClanCommandHandler(IApplicationDbContext context, IClashRoyaleService clashService)
    {
        _context = context;
        _clashService = clashService;
    }

    public async Task<Guid> Handle(RegisterClanCommand request, CancellationToken cancellationToken)
    {
        var existing = await _context.Clans
            .FirstOrDefaultAsync(c => c.UserId == request.UserId, cancellationToken);

        if (existing != null)
            throw new Exception("Tu as déjà enregistré un clan sur ton profil.");

        // On interroge l'API pour récupérer le nom officiel
        var clanInfo = await _clashService.GetClanInfoAsync(request.Tag);

        if (clanInfo == null)
            throw new Exception("Ce Tag de clan n'existe pas sur Clash Royale.");

        var clan = new Clan
        {
            Id = Guid.NewGuid(),
            Tag = request.Tag,
            Name = clanInfo.Name,
            BadgeId = clanInfo.BadgeId,
            WarningThreshold = request.WarningThreshold,
            PromotionThreshold = request.PromotionThreshold,
            UserId = request.UserId
        };

        _context.Clans.Add(clan);
        await _context.SaveChangesAsync(cancellationToken);

        return clan.Id;
    }
}