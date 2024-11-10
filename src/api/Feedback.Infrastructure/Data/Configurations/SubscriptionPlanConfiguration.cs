using Feedback.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Feedback.Infrastructure.Data.Configurations
{
    public class SubscriptionPlanConfiguration : IEntityTypeConfiguration<SubscriptionPlan>
    {
        public void Configure(EntityTypeBuilder<SubscriptionPlan> builder)
        {
            builder.HasKey(sp => sp.Id);

            builder.Property(sp => sp.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(sp => sp.MaxUsers)
                .IsRequired();

            builder.Property(sp => sp.MaxProjects)
                .IsRequired();

            builder.Property(sp => sp.Features)
                .HasMaxLength(1000);

            builder.Property(sp => sp.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}