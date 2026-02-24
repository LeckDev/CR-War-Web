using System;
using System.Collections.Generic;
using System.Text;
using ClashManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClashManager.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Clan> Clans { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
