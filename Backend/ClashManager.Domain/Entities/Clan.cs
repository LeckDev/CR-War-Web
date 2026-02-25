namespace ClashManager.Domain.Entities
{

public class Clan
{
    public Guid Id { get; set; }
    public string Tag { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int BadgeId { get; set; }
    public int WarningThreshold { get; set; }
    public int PromotionThreshold { get; set; }
    public string UserId { get; set; } = string.Empty;
}
}