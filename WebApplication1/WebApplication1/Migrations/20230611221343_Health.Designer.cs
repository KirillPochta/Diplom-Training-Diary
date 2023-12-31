﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1.Data;

namespace WebApplication1.Migrations
{
    [DbContext(typeof(CoreDbContext))]
    [Migration("20230611221343_Health")]
    partial class Health
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication1.Models.Audiotape", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Duration")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Audiotapes");
                });

            modelBuilder.Entity("WebApplication1.Models.Music", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Cover")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MusicSrc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Singer")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Musics");
                });

            modelBuilder.Entity("WebApplication1.Models.Note", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Body")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EventDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPinned")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Priority")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("color")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notes");

                    b.HasData(
                        new
                        {
                            Id = new Guid("7545c85f-1238-43df-bdd4-2ca2f62003e2"),
                            Body = "Иногда мне сниться сыр, он такой вкусный",
                            IsPinned = false,
                            Name = "Сегодня мне снился сыр",
                            Priority = "LOW",
                            UserId = new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9")
                        },
                        new
                        {
                            Id = new Guid("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"),
                            Body = "Запись у невролога в пятницу",
                            IsPinned = false,
                            Name = "Надо бы сходить к врачу",
                            Priority = "HIGH",
                            UserId = new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9")
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("WebApplication1.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RoleName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RoleName = "Admin"
                        },
                        new
                        {
                            Id = 2,
                            RoleName = "User"
                        },
                        new
                        {
                            Id = 3,
                            RoleName = "Guest"
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("NameTag")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tags");

                    b.HasData(
                        new
                        {
                            Id = new Guid("0862a850-20d5-44d0-b3d9-876790c99b84"),
                            NameTag = "Сны"
                        },
                        new
                        {
                            Id = new Guid("7b36766c-5e19-44ab-93b0-f3f0d39997d4"),
                            NameTag = "Странность"
                        },
                        new
                        {
                            Id = new Guid("ecd8cdc5-db46-44ec-aadc-291946310cb4"),
                            NameTag = "Врач"
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.TagsNote", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("NoteId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TagId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("NoteId");

                    b.HasIndex("TagId");

                    b.ToTable("TagsNote");

                    b.HasData(
                        new
                        {
                            Id = new Guid("fac5222d-d268-4388-83cd-4cf5a35560fd"),
                            NoteId = new Guid("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"),
                            TagId = new Guid("0862a850-20d5-44d0-b3d9-876790c99b84")
                        },
                        new
                        {
                            Id = new Guid("ed80a509-f160-4d80-8b5a-1c30149236a3"),
                            NoteId = new Guid("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"),
                            TagId = new Guid("7b36766c-5e19-44ab-93b0-f3f0d39997d4")
                        },
                        new
                        {
                            Id = new Guid("8d0800b4-6ac9-4664-8dcc-45e4736d5dd1"),
                            NoteId = new Guid("7545c85f-1238-43df-bdd4-2ca2f62003e2"),
                            TagId = new Guid("ecd8cdc5-db46-44ec-aadc-291946310cb4")
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.Training", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("BodyPart")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GifURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Trainings");
                });

            modelBuilder.Entity("WebApplication1.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Birth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FavMusic")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Interests")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Joined")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9"),
                            Birth = new DateTime(2001, 6, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "pochta@gmail.com",
                            FirstName = "Kira",
                            Gender = "Male",
                            Interests = "I am fat guy :(",
                            Joined = new DateTime(2023, 6, 12, 1, 13, 41, 850, DateTimeKind.Local).AddTicks(2111),
                            LastName = "Kira",
                            Password = "$2a$12$oPwFcsM8GdQId4Dk1/0WSOaCFPegd0i6Z2mR.E6cG4Zn2OUUyMDpa",
                            RoleId = 2
                        },
                        new
                        {
                            Id = new Guid("da21c8d2-7cef-4c85-8108-a07bc4ad419d"),
                            Birth = new DateTime(2001, 6, 17, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "admin@gmail.com",
                            FirstName = "admin",
                            Gender = "Female",
                            Interests = "I love doing push ups",
                            Joined = new DateTime(2023, 6, 12, 1, 13, 41, 850, DateTimeKind.Local).AddTicks(7426),
                            LastName = "admin",
                            Password = "$2a$12$uCdrOY2Rmmh5xH6Pz/YNXOPsTMzAI9BiHw6aQro.K/d/YggAJ7B4e",
                            RoleId = 1
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.UserAudiotape", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AudiotapeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("AudiotapeId");

                    b.HasIndex("UserId");

                    b.ToTable("UserAudiotapes");
                });

            modelBuilder.Entity("WebApplication1.Models.UserBodyProporties", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Activity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BodyMassIndex")
                        .HasColumnType("int");

                    b.Property<int>("Chest")
                        .HasColumnType("int");

                    b.Property<int>("DailyBelok")
                        .HasColumnType("int");

                    b.Property<int>("DailyJir")
                        .HasColumnType("int");

                    b.Property<int>("DailyNormalCaloriesHarrisMenedict")
                        .HasColumnType("int");

                    b.Property<int>("DailyNormalCaloriesMiffanSanJeora")
                        .HasColumnType("int");

                    b.Property<int>("DailyYglevod")
                        .HasColumnType("int");

                    b.Property<string>("Goal")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<int>("Hips")
                        .HasColumnType("int");

                    b.Property<string>("UserFatness")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Waist")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("UsersBodyProporties");

                    b.HasData(
                        new
                        {
                            Id = new Guid("7f87a6de-0fa3-4958-8a31-074a2b4cb03c"),
                            Activity = "Тренировки 1-3 раза в неделю",
                            BodyMassIndex = 27,
                            Chest = 41,
                            DailyBelok = 0,
                            DailyJir = 0,
                            DailyNormalCaloriesHarrisMenedict = 0,
                            DailyNormalCaloriesMiffanSanJeora = 0,
                            DailyYglevod = 0,
                            Goal = "Похудение",
                            Height = 165,
                            Hips = 45,
                            UserFatness = "Предожирение",
                            UserId = new Guid("536bc8fe-d271-4ae4-ac7d-5241d83974d9"),
                            Waist = 50,
                            Weight = 74
                        },
                        new
                        {
                            Id = new Guid("0cbe525e-09de-4d95-8260-fb8e38d12322"),
                            Activity = "Тренировки 3-5 раза в неделю",
                            BodyMassIndex = 27,
                            Chest = 41,
                            DailyBelok = 0,
                            DailyJir = 0,
                            DailyNormalCaloriesHarrisMenedict = 0,
                            DailyNormalCaloriesMiffanSanJeora = 0,
                            DailyYglevod = 0,
                            Goal = "Набрать мышечную массу",
                            Height = 165,
                            Hips = 45,
                            UserFatness = "Предожирение",
                            UserId = new Guid("da21c8d2-7cef-4c85-8108-a07bc4ad419d"),
                            Waist = 50,
                            Weight = 74
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.UserTraining", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TrainingId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TrainingId");

                    b.HasIndex("UserId");

                    b.ToTable("UserTrainings");
                });

            modelBuilder.Entity("WebApplication1.Models.Note", b =>
                {
                    b.HasOne("WebApplication1.Models.User", "User")
                        .WithMany("Notes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApplication1.Models.Notification", b =>
                {
                    b.HasOne("WebApplication1.Models.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApplication1.Models.Tag", b =>
                {
                    b.HasOne("WebApplication1.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApplication1.Models.TagsNote", b =>
                {
                    b.HasOne("WebApplication1.Models.Note", "Note")
                        .WithMany("NoteTagsList")
                        .HasForeignKey("NoteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication1.Models.Tag", "Tag")
                        .WithMany("NoteTagsList")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Note");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("WebApplication1.Models.User", b =>
                {
                    b.HasOne("WebApplication1.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("WebApplication1.Models.UserAudiotape", b =>
                {
                    b.HasOne("WebApplication1.Models.Audiotape", "Audiotape")
                        .WithMany("UserAudiotapesList")
                        .HasForeignKey("AudiotapeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApplication1.Models.User", "User")
                        .WithMany("UserAudiotapesList")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Audiotape");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApplication1.Models.UserBodyProporties", b =>
                {
                    b.HasOne("WebApplication1.Models.User", "User")
                        .WithOne("UserBodyProporties")
                        .HasForeignKey("WebApplication1.Models.UserBodyProporties", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApplication1.Models.UserTraining", b =>
                {
                    b.HasOne("WebApplication1.Models.Training", "Training")
                        .WithMany("TrainingsList")
                        .HasForeignKey("TrainingId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApplication1.Models.User", "User")
                        .WithMany("TrainingsList")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Training");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApplication1.Models.Audiotape", b =>
                {
                    b.Navigation("UserAudiotapesList");
                });

            modelBuilder.Entity("WebApplication1.Models.Note", b =>
                {
                    b.Navigation("NoteTagsList");
                });

            modelBuilder.Entity("WebApplication1.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApplication1.Models.Tag", b =>
                {
                    b.Navigation("NoteTagsList");
                });

            modelBuilder.Entity("WebApplication1.Models.Training", b =>
                {
                    b.Navigation("TrainingsList");
                });

            modelBuilder.Entity("WebApplication1.Models.User", b =>
                {
                    b.Navigation("Notes");

                    b.Navigation("Notifications");

                    b.Navigation("TrainingsList");

                    b.Navigation("UserAudiotapesList");

                    b.Navigation("UserBodyProporties");
                });
#pragma warning restore 612, 618
        }
    }
}
