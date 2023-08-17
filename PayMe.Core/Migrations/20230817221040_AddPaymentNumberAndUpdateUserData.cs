using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PayMe.Core.Migrations
{
    public partial class AddPaymentNumberAndUpdateUserData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckPayments_AspNetUsers_AppUserId",
                table: "CheckPayments");

            migrationBuilder.DropIndex(
                name: "IX_CheckPayments_AppUserId",
                table: "CheckPayments");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "CheckPayments");

            migrationBuilder.AddColumn<int>(
                name: "PaymentNumber",
                table: "CheckPayments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentNumber",
                table: "CheckPayments");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "CheckPayments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CheckPayments_AppUserId",
                table: "CheckPayments",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckPayments_AspNetUsers_AppUserId",
                table: "CheckPayments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
