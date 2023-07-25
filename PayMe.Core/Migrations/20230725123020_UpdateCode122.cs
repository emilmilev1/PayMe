using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PayMe.Core.Migrations
{
    public partial class UpdateCode122 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckAttendees_AspNetUsers_AppUserId",
                table: "CheckAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckAttendees_CheckPayments_CheckPaymentId",
                table: "CheckAttendees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckAttendees",
                table: "CheckAttendees");

            migrationBuilder.RenameTable(
                name: "CheckAttendees",
                newName: "CheckPaymentsUsers");

            migrationBuilder.RenameIndex(
                name: "IX_CheckAttendees_CheckPaymentId",
                table: "CheckPaymentsUsers",
                newName: "IX_CheckPaymentsUsers_CheckPaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckPaymentsUsers",
                table: "CheckPaymentsUsers",
                columns: new[] { "AppUserId", "CheckPaymentId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CheckPaymentsUsers_AspNetUsers_AppUserId",
                table: "CheckPaymentsUsers",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckPaymentsUsers_CheckPayments_CheckPaymentId",
                table: "CheckPaymentsUsers",
                column: "CheckPaymentId",
                principalTable: "CheckPayments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckPaymentsUsers_AspNetUsers_AppUserId",
                table: "CheckPaymentsUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckPaymentsUsers_CheckPayments_CheckPaymentId",
                table: "CheckPaymentsUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckPaymentsUsers",
                table: "CheckPaymentsUsers");

            migrationBuilder.RenameTable(
                name: "CheckPaymentsUsers",
                newName: "CheckAttendees");

            migrationBuilder.RenameIndex(
                name: "IX_CheckPaymentsUsers_CheckPaymentId",
                table: "CheckAttendees",
                newName: "IX_CheckAttendees_CheckPaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckAttendees",
                table: "CheckAttendees",
                columns: new[] { "AppUserId", "CheckPaymentId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CheckAttendees_AspNetUsers_AppUserId",
                table: "CheckAttendees",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckAttendees_CheckPayments_CheckPaymentId",
                table: "CheckAttendees",
                column: "CheckPaymentId",
                principalTable: "CheckPayments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
