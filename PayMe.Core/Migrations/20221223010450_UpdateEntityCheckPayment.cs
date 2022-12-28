using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PayMe.Core.Migrations
{
    public partial class UpdateEntityCheckPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ZipCode",
                table: "CheckPayments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "CheckPayments");
        }
    }
}
