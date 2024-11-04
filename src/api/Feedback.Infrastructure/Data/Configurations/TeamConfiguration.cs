
    using Feedback.Core.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Feedback.Infrastructure.Data.Configurations
    {
        public class TeamConfiguration : IEntityTypeConfiguration<Team>
        {
            public void Configure(EntityTypeBuilder<Team> builder)
            {
                // Configure primary key
                builder.HasKey(t => t.Id);

                // Configure properties
                builder.Property(t => t.Name).IsRequired().HasMaxLength(100);

                // Configure many-to-many relationship with User
                builder.HasMany(t => t.Users)
                    .WithMany(u => u.Teams)
                    .UsingEntity(j => j.ToTable("TeamUser"));
            }
        }
    }