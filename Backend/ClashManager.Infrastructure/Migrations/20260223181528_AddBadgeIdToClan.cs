using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClashManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBadgeIdToClan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BadgeId",
                table: "Clans",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BadgeId",
                table: "Clans");
        }
    }
}
