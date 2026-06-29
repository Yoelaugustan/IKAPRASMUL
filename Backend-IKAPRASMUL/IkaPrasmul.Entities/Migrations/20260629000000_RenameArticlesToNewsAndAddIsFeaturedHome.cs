using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IkaPrasmul.Entities.Migrations
{
    /// <inheritdoc />
    public partial class RenameArticlesToNewsAndAddIsFeaturedHome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Articles",
                newName: "News");

            migrationBuilder.RenameIndex(
                name: "IX_Articles_Slug",
                newName: "IX_News_Slug",
                table: "News");

            migrationBuilder.Sql(
                "ALTER TABLE \"News\" RENAME CONSTRAINT \"PK_Articles\" TO \"PK_News\"");

            migrationBuilder.AddColumn<bool>(
                name: "IsFeaturedHome",
                table: "News",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeaturedHome",
                table: "News");

            migrationBuilder.Sql(
                "ALTER TABLE \"News\" RENAME CONSTRAINT \"PK_News\" TO \"PK_Articles\"");

            migrationBuilder.RenameIndex(
                name: "IX_News_Slug",
                newName: "IX_Articles_Slug",
                table: "News");

            migrationBuilder.RenameTable(
                name: "News",
                newName: "Articles");
        }
    }
}
