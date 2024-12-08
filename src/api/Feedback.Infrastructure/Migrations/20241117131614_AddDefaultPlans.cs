using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Feedback.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultPlans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SubscriptionPlans",
                columns: new[] { "Name", "Price", "MaxUsers", "MaxProjects", "Features" },
                values: new object[] {
                    "Free",
                    0m,
                    10,
                    1,
                    "[]"
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}