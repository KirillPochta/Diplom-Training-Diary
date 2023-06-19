using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Data.Roles;
using WebApplication1.Helpers;
using WebApplication1.Models;
using Newtonsoft.Json;
using System.Reflection;
using System.IO;
using WebApplication1.Data.NoteData;
using WebApplication1.Data.UsersBodyProporties;
using WebApplication1.Data.Trainings;
using WebApplication1.Data.Notifications;
using WebApplication1.Data.Music;

namespace WebApplication1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddDbContext<CoreDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), builder => 
                {
                    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                }));

            services.AddControllersWithViews()
                     .AddNewtonsoftJson(options =>
                     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                 );
            services.AddControllers();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<INotesRepository, NotesRepository>();
            services.AddScoped<IUsersBodyProportiesRepository, UsersBodyProportiesRepository>();
            services.AddScoped<ITagRepository, TagRepository>();
            services.AddScoped<ITrainingRepository, TrainingRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<IAudiotapeRepository, AudiotapeRepository>();
            services.AddScoped<IMusicRepository, MusicRepository>();
            services.AddScoped<JwtService>();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:8080" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
            );
            
            app.UseAuthorization();
                
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
