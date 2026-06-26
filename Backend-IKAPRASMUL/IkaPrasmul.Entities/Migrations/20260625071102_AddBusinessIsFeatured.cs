using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IkaPrasmul.Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddBusinessIsFeatured : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "BusinessListings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "BusinessListings");
        }
    }
}
