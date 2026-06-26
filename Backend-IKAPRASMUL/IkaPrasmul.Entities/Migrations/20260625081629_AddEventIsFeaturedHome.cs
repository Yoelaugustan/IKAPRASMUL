using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IkaPrasmul.Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddEventIsFeaturedHome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFeaturedHome",
                table: "Events",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeaturedHome",
                table: "Events");
        }
    }
}
