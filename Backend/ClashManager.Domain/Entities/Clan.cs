namespace ClashManager.Domain.Entities
{

public class Clan
{
    public Guid Id { get; set; }
    public string Tag { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
        public int BadgeId { get; set; }

        // Tes deux paramètres de gestion
        public int WarningThreshold { get; set; }
    public int PromotionThreshold { get; set; }

    // Le lien avec l'utilisateur (on peut utiliser un string pour l'ID Identity)
    public string UserId { get; set; } = string.Empty;
}
}