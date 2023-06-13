using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class Health : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Audiotapes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Audiotapes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trainings",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodyPart = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GifURL = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Interests = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Joined = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Birth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPinned = table.Column<bool>(type: "bit", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NotificationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameTag = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserAudiotapes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AudiotapeId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAudiotapes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAudiotapes_Audiotapes_AudiotapeId",
                        column: x => x.AudiotapeId,
                        principalTable: "Audiotapes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAudiotapes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersBodyProporties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    Chest = table.Column<int>(type: "int", nullable: false),
                    Waist = table.Column<int>(type: "int", nullable: false),
                    Hips = table.Column<int>(type: "int", nullable: false),
                    BodyMassIndex = table.Column<int>(type: "int", nullable: false),
                    UserFatness = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Activity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DailyBelok = table.Column<int>(type: "int", nullable: false),
                    DailyJir = table.Column<int>(type: "int", nullable: false),
                    DailyYglevod = table.Column<int>(type: "int", nullable: false),
                    DailyNormalCaloriesMiffanSanJeora = table.Column<int>(type: "int", nullable: false),
                    DailyNormalCaloriesHarrisMenedict = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersBodyProporties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersBodyProporties_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTrainings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTrainings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTrainings_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTrainings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TagsNote",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NoteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagsNote", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagsNote_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagsNote_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "RoleName" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "User" },
                    { 3, "Guest" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "NameTag", "UserId" },
                values: new object[,]
                {
                    { new Guid("0862a850-20d5-44d0-b3d9-876790c99b84"), "Сны", null },
                    { new Guid("7b36766c-5e19-44ab-93b0-f3f0d39997d4"), "Странность", null },
                    { new Guid("ecd8cdc5-db46-44ec-aadc-291946310cb4"), "Врач", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birth", "Country", "Email", "FirstName", "Gender", "Image", "Interests", "Joined", "LastName", "Password", "RoleId" },
                values: new object[] { new Guid("da21c8d2-7cef-4c85-8108-a07bc4ad419d"), new DateTime(2001, 6, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "admin@gmail.com", "admin", "Female", null, "I love doing push ups", new DateTime(2023, 5, 3, 23, 11, 4, 833, DateTimeKind.Local).AddTicks(6408), "admin", "$2a$12$uCdrOY2Rmmh5xH6Pz/YNXOPsTMzAI9BiHw6aQro.K/d/YggAJ7B4e", 1 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birth", "Country", "Email", "FirstName", "Gender", "Image", "Interests", "Joined", "LastName", "Password", "RoleId" },
                values: new object[] { new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9"), new DateTime(2001, 6, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "pochta@gmail.com", "Kira", "Male", null, "I am fat guy :(", new DateTime(2023, 5, 3, 23, 11, 4, 832, DateTimeKind.Local).AddTicks(6094), "Kira", "$2a$12$oPwFcsM8GdQId4Dk1/0WSOaCFPegd0i6Z2mR.E6cG4Zn2OUUyMDpa", 2 });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Body", "IsPinned", "Name", "Priority", "UserId", "color" },
                values: new object[,]
                {
                    { new Guid("7545c85f-1238-43df-bdd4-2ca2f62003e2"), "Иногда мне сниться сыр, он такой вкусный", false, "Сегодня мне снился сыр", "LOW", new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9"), null },
                    { new Guid("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"), "Запись у невролога в пятницу", false, "Надо бы сходить к врачу", "HIGH", new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9"), null }
                });

            migrationBuilder.InsertData(
                table: "UsersBodyProporties",
                columns: new[] { "Id", "Activity", "BodyMassIndex", "Chest", "DailyBelok", "DailyJir", "DailyNormalCaloriesHarrisMenedict", "DailyNormalCaloriesMiffanSanJeora", "DailyYglevod", "Goal", "Height", "Hips", "UserFatness", "UserId", "Waist", "Weight" },
                values: new object[,]
                {
                    { new Guid("6ee05800-20a7-45b3-ac44-d8c3f0c38db5"), "Тренировки 3-5 раза в неделю", 27, 41, 0, 0, 0, 0, 0, "Набрать мышечную массу", 165, 45, "Предожирение", new Guid("da21c8d2-7cef-4c85-8108-a07bc4ad419d"), 50, 74 },
                    { new Guid("3d7b2b4c-2703-4149-9ca9-36d37a4771b8"), "Тренировки 1-3 раза в неделю", 27, 41, 0, 0, 0, 0, 0, "Похудение", 165, 45, "Предожирение", new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9"), 50, 74 }
                });

            migrationBuilder.InsertData(
                table: "TagsNote",
                columns: new[] { "Id", "NoteId", "TagId" },
                values: new object[] { new Guid("61327996-5cbe-4ab1-9311-054f95d376cd"), new Guid("7545c85f-1238-43df-bdd4-2ca2f62003e2"), new Guid("ecd8cdc5-db46-44ec-aadc-291946310cb4") });

            migrationBuilder.InsertData(
                table: "TagsNote",
                columns: new[] { "Id", "NoteId", "TagId" },
                values: new object[] { new Guid("2a0513e8-e90c-4bd2-a903-106cc02bcfde"), new Guid("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"), new Guid("0862a850-20d5-44d0-b3d9-876790c99b84") });

            migrationBuilder.InsertData(
                table: "TagsNote",
                columns: new[] { "Id", "NoteId", "TagId" },
                values: new object[] { new Guid("76990253-29dc-4303-9ba8-e7c212081ffa"), new Guid("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"), new Guid("7b36766c-5e19-44ab-93b0-f3f0d39997d4") });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_UserId",
                table: "Notes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_UserId",
                table: "Tags",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TagsNote_NoteId",
                table: "TagsNote",
                column: "NoteId");

            migrationBuilder.CreateIndex(
                name: "IX_TagsNote_TagId",
                table: "TagsNote",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAudiotapes_AudiotapeId",
                table: "UserAudiotapes",
                column: "AudiotapeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAudiotapes_UserId",
                table: "UserAudiotapes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersBodyProporties_UserId",
                table: "UsersBodyProporties",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTrainings_TrainingId",
                table: "UserTrainings",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTrainings_UserId",
                table: "UserTrainings",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "TagsNote");

            migrationBuilder.DropTable(
                name: "UserAudiotapes");

            migrationBuilder.DropTable(
                name: "UsersBodyProporties");

            migrationBuilder.DropTable(
                name: "UserTrainings");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Audiotapes");

            migrationBuilder.DropTable(
                name: "Trainings");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
