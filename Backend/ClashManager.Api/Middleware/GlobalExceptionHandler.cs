using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace ClashManager.Api.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) => _logger = logger;

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Une erreur est survenue : {Message}", exception.Message);

        // On prépare une réponse standardisée (ProblemDetails)
        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status400BadRequest, // On transforme l'exception en erreur 400
            Title = "Erreur métier",
            Detail = exception.Message // C'est ici que ton message "Tu as déjà..." arrive
        };

        httpContext.Response.StatusCode = problemDetails.Status.Value;

        await httpContext.Response
            .WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}