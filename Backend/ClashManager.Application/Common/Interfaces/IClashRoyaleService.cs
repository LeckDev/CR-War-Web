namespace ClashManager.Application.Common.Interfaces;

public interface IClashRoyaleService
{
    // On veut pouvoir récupérer la liste des membres d'un clan via son tag
    // On va utiliser un objet "simplifié" pour le retour pour l'instant
    Task<IEnumerable<ClashMemberDto>> GetClanMembersAsync(string clanTag);

    Task<ClashClanDto?> GetClanInfoAsync(string clanTag);
}

// Un petit DTO (Data Transfer Object) pour transporter les données de l'API vers notre App
public record ClashMemberDto(string Tag, string Name, string Role, int Trophies);

public record ClashClanDto(string Tag, string Name, int BadgeId);