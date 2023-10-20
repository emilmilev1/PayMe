using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PayMe.Core.Migrations
{
    public partial class UpdateUsersRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckPaymentsUsers",
                table: "CheckPaymentsUsers");

            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "CheckPaymentsUsers");

            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "CheckPayments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckPaymentsUsers",
                table: "CheckPaymentsUsers",
                columns: new[] { "AppUserId", "CheckPaymentId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckPaymentsUsers",
                table: "CheckPaymentsUsers");

            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "CheckPaymentsUsers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "CheckPayments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckPaymentsUsers",
                table: "CheckPaymentsUsers",
                columns: new[] { "AppUserId", "CheckPaymentId", "RoleName" });
        }
    }
}
