using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IkaPrasmul.Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddGovernanceDocumentRequiresRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "RequiresRequest",
                table: "GovernanceDocuments",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequiresRequest",
                table: "GovernanceDocuments");
        }
    }
}
