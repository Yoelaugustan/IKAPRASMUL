using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IkaPrasmul.Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddSigSpotlightIsSpotlight : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSpotlight",
                table: "SigSpotlights",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSpotlight",
                table: "SigSpotlights");
        }
    }
}
