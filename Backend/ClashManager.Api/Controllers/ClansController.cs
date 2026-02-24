using ClashManager.Application.Clans.Commands.RegisterClan; // À adapter selon le dossier où tu as mis ta commande
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ClashManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")] // L'URL sera automatiquement /api/clans
public class ClansController : ControllerBase
{
    private readonly ISender _mediator;

    // On injecte uniquement MediatR (la télécommande)
    public ClansController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterClan([FromBody] RegisterClanCommand command)
    {
        // Le contrôleur ne fait aucune logique. Il passe juste le message.
        var clanId = await _mediator.Send(command);

        // Si tout s'est bien passé, on renvoie un code 200 (Ok) avec l'ID généré
        return Ok(new { ClanId = clanId });
    }
}