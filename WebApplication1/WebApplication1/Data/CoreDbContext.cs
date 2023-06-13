using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data.UsersBodyProporties;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class CoreDbContext : DbContext
    {
        public CoreDbContext(DbContextOptions<CoreDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Note> Notes { set; get; }
        public DbSet<User> Users { set; get; }
        public DbSet<Role> Roles { set; get; }
        public DbSet<Tag> Tags { set; get; }
        public DbSet<TagsNote> TagsNote { set; get; }
        public DbSet<UserBodyProporties> UsersBodyProporties { set; get; }
        public DbSet<Training> Trainings { set; get; }
        public DbSet<UserTraining> UserTrainings { set; get; }
        public DbSet<AudioTape> Audiotapes { set; get; }
        public DbSet<UserAudiotape> UserAudiotapes { set; get; }
        public DbSet<Notification> Notifications { set; get; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Note>(entity => { entity.HasKey(note => note.Id); });
            builder.Entity<Tag>(entity => { entity.HasKey(tagNote => tagNote.Id); });
            builder.Entity<User>(entity => { entity.HasKey(e => e.Id); });
            builder.Entity<TagsNote>(entity => { entity.HasKey(e => e.Id); });
            builder.Entity<UserBodyProporties>(entity => { entity.HasKey(e => e.Id); });
            builder.Entity<AudioTape>(entity => { entity.HasKey(e => e.Id); });
            builder.Entity<UserAudiotape>(entity => { entity.HasKey(e => e.Id); });
            builder.Entity<Training>(entity => { entity.HasKey(e => e.Id); });
            builder.Entity<UserTraining>(entity => { entity.HasKey(e => e.Id); });


            builder.Entity<Role>()
                .HasMany(i => i.Users)
                .WithOne(i => i.Role).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>()
               .HasMany(i => i.Notifications)
               .WithOne(i => i.User)
               .HasForeignKey(i => i.UserId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>()
                .HasMany(i => i.Notes)
                .WithOne(i => i.User)
                .HasForeignKey(i => i.UserId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>()
                .HasOne(i => i.UserBodyProporties)
                .WithOne(i => i.User).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserAudiotape>()
                .HasOne(i => i.User)
                .WithMany(i => i.UserAudiotapesList).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserAudiotape>()
                .HasOne(i => i.Audiotape)
                .WithMany(i => i.UserAudiotapesList).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<TagsNote>()
                .HasOne(i => i.Note)
                .WithMany(i => i.NoteTagsList)
                .HasForeignKey(i => i.NoteId).OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<TagsNote>()
                .HasOne(i => i.Tag)
                .WithMany(i => i.NoteTagsList)
                .HasForeignKey(i => i.TagId).OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<UserTraining>()
                .HasOne(i => i.Training)
                .WithMany(i => i.TrainingsList).OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<UserTraining>()
                .HasOne(i => i.User)
                .WithMany(i => i.TrainingsList).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData( 
                new Role() { Id = 1, RoleName = "Admin" }, 
                new Role() { Id = 2, RoleName = "User"},
                new Role() { Id = 3, RoleName = "Guest" });

            builder.Entity<User>()
                .HasData(
                    new User() { 
                        Id= Guid.Parse("536bc8fe-d271-4ae4-ac7d-5241d83974d9"),
                        RoleId = 2,
                        Email = "pochta@gmail.com",
                        FirstName ="Kira",
                        LastName ="Kira",
                        Notes = null,
                        Password = "$2a$12$oPwFcsM8GdQId4Dk1/0WSOaCFPegd0i6Z2mR.E6cG4Zn2OUUyMDpa", //a
                        Gender = "Male",
                        Interests = "I am fat guy :(",
                        Joined = DateTime.Now,
                        Birth = new DateTime(2001,6,20)
                    },
                    new User() {
                        Id = Guid.Parse("da21c8d2-7cef-4c85-8108-a07bc4ad419d"),
                        RoleId = 1,
                        Email = "admin@gmail.com",
                        FirstName = "admin",
                        LastName = "admin",
                        Notes = null,
                        Password = "$2a$12$uCdrOY2Rmmh5xH6Pz/YNXOPsTMzAI9BiHw6aQro.K/d/YggAJ7B4e", //a2 
                        Gender = "Female",
                        Interests = "I love doing push ups",
                        Joined = DateTime.Now,
                        Birth = new DateTime(2001, 6, 17)


                    }
                );
            builder.Entity<Note>()
                .HasData(
                    new Note() {
                        Id = Guid.Parse("7545c85f-1238-43df-bdd4-2ca2f62003e2"),
                        Name = "Сегодня мне снился сыр",
                        Body = "Иногда мне сниться сыр, он такой вкусный",
                        Priority = "LOW",
                        UserId = Guid.Parse("536bc8fe-d271-4ae4-ac7d-5241d83974d9"), // Owner - Kira
                        NoteTagsList = null,
                        IsPinned = false,
                        User = null
                    },
                    new Note()
                    {
                        Id = Guid.Parse("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"),
                        Name = "Надо бы сходить к врачу",
                        Body = "Запись у невролога в пятницу",
                        Priority = "HIGH",
                        UserId = Guid.Parse("536bc8fe-d271-4ae4-ac7d-5241d83974d9"), // Owner - Kira
                        NoteTagsList = null,
                        IsPinned = false,
                        User = null
                    });
            builder.Entity<Tag>()
                .HasData(
                    new Tag()
                    {
                        Id = Guid.Parse("0862a850-20d5-44d0-b3d9-876790c99b84"),
                        NameTag = "Сны",
                        NoteTagsList = null,
                    },
                    new Tag()
                    {
                        Id = Guid.Parse("7b36766c-5e19-44ab-93b0-f3f0d39997d4"),
                        NameTag = "Странность",
                        NoteTagsList = null,
                    },
                    new Tag()
                    {
                        Id = Guid.Parse("ecd8cdc5-db46-44ec-aadc-291946310cb4"),
                        NameTag = "Врач",
                        NoteTagsList = null,
                    });
            builder.Entity<UserBodyProporties>()
                .HasData(
                new UserBodyProporties()
                {
                    Id = Guid.NewGuid(),
                    UserId = Guid.Parse("536bc8fe-d271-4ae4-ac7d-5241d83974d9"),
                    Weight = 74,
                    Waist = 50,
                    Chest = 41,
                    Height = 165,
                    Hips = 45,
                    BodyMassIndex = 27,
                    UserFatness = "Предожирение",
                    Goal = "Похудение",
                    Activity = "Тренировки 1-3 раза в неделю"
                },
                new UserBodyProporties()
                {
                    Id = Guid.NewGuid(),
                    UserId = Guid.Parse("da21c8d2-7cef-4c85-8108-a07bc4ad419d"),
                    Weight = 74,
                    Waist = 50,
                    Chest = 41,
                    Height = 165,
                    Hips = 45,
                    BodyMassIndex = 27,
                    UserFatness = "Предожирение",
                    Goal = "Набрать мышечную массу",
                    Activity = "Тренировки 3-5 раза в неделю"
                });
            builder.Entity<TagsNote>()
                .HasData(
                new TagsNote() {
                    Id = Guid.NewGuid(),
                    NoteId = Guid.Parse("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"),
                    TagId = Guid.Parse("0862a850-20d5-44d0-b3d9-876790c99b84")

                },
                new TagsNote()
                {
                    Id = Guid.NewGuid(),
                    NoteId = Guid.Parse("5b6f9eb1-eb1a-42fd-a10c-c5182fcfbd1b"),
                    TagId = Guid.Parse("7b36766c-5e19-44ab-93b0-f3f0d39997d4")

                },
                new TagsNote()
                {
                    Id = Guid.NewGuid(),
                    NoteId = Guid.Parse("7545c85f-1238-43df-bdd4-2ca2f62003e2"),
                    TagId = Guid.Parse("ecd8cdc5-db46-44ec-aadc-291946310cb4")

                });
            
        }
    }
}
