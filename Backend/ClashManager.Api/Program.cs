using ClashManager.Api.Middleware;
using ClashManager.Application.Clans.Commands.RegisterClan;
using ClashManager.Application.Common.Interfaces;
using ClashManager.Infrastructure.ExternalApi;
using ClashManager.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ==========================================================
// ZONE 1 : AJOUT DES SERVICES (La boîte à outils)
// ==========================================================
// C'est ici qu'on donne nos instructions, AVANT de construire l'app.
builder.Services.AddControllers();

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(RegisterClanCommand).Assembly));

// Notre fameux DbContext qui indique comment se connecter à PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

// On donne à .NET les outils pour lire nos Controllers et générer la doc Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<IClashRoyaleService, ClashRoyaleService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
// ==========================================================
// ZONE 2 : LA CONSTRUCTION (Ce que l'outil EF Core cherchait !)
// ==========================================================
// À partir de cette ligne, on ferme la boîte à outils. 
// On ne peut plus utiliser "builder".
var app = builder.Build();



// ==========================================================
// ZONE 3 : LE PIPELINE HTTP (Les règles de circulation)
// ==========================================================
//On active l'interface web de Swagger (uniquement en mode développement)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// On configure comment l'application gère les requêtes web.
app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthorization();
app.MapControllers();


// ==========================================================
// ZONE 4 : LE LANCEMENT
// ==========================================================
app.Run();