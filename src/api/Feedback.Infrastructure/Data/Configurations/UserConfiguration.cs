using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Feedback.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // Configure primary key
        builder.HasKey(u => u.Id);

        // Configure properties
        builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
        builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
        builder.Property(u => u.Picture).HasMaxLength(255);

        // Configure many-to-many relationship with Team
        builder.HasMany(u => u.Teams)
            .WithMany(t => t.Users)
            .UsingEntity(j => j.ToTable("TeamUser"));
    }
}