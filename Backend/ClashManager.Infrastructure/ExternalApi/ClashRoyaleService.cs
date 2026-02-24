using System.Net.Http.Headers;
using System.Net.Http.Json;
using ClashManager.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;

namespace ClashManager.Infrastructure.ExternalApi;

public class ClashRoyaleService : IClashRoyaleService
{
    private readonly HttpClient _httpClient;

    public ClashRoyaleService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;

        // On configure l'adresse de base de l'API Supercell
        _httpClient.BaseAddress = new Uri("https://proxy.royaleapi.dev/v1/");

        // On récupère la clé API depuis ton appsettings.json
        var apiKey = configuration["ClashRoyale:ApiKey"];
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    }

    public async Task<IEnumerable<ClashMemberDto>> GetClanMembersAsync(string clanTag)
    {
        // On encode le tag (le # devient %23 dans une URL)
        var encodedTag = Uri.EscapeDataString(clanTag);

        // On fait l'appel vers l'endpoint officiel
        var response = await _httpClient.GetFromJsonAsync<ClashApiResponse>($"clans/{encodedTag}/members");

        // On transforme les données brutes de Supercell en notre format propre (ClashMemberDto)
        return response?.Items.Select(m => new ClashMemberDto(m.Tag, m.Name, m.Role, m.Trophies))
               ?? Enumerable.Empty<ClashMemberDto>();
    }

    public async Task<ClashClanDto?> GetClanInfoAsync(string clanTag)
    {
        try
        {
            var encodedTag = Uri.EscapeDataString(clanTag);
            // On appelle l'endpoint de base du clan : /clans/{tag}
            var response = await _httpClient.GetFromJsonAsync<ClashClanDto>($"clans/{encodedTag}");
            return response;
        }
        catch (HttpRequestException ex)
        {
            // Affiche l'erreur réelle dans le terminal pour comprendre (403 ? 404 ? 500 ?)
            Console.WriteLine($"Erreur API : {ex.StatusCode} - {ex.Message}");
            // Si le tag n'existe pas, l'API renvoie une erreur 404
            return null;
        }
    }
}

// Classes internes pour "mapper" le JSON complexe de Supercell
// On les met ici car elles ne servent qu'à traduire le JSON de cette API précise
internal record ClashApiResponse(IEnumerable<ClashApiMember> Items);
internal record ClashApiMember(string Tag, string Name, string Role, int Trophies);