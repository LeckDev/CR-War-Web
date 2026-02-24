using System;
using System.Collections.Generic;
using System.Text;
using ClashManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using ClashManager.Application.Common.Interfaces;

namespace ClashManager.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext , IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Clan> Clans {  get; set; }       
    }
}
