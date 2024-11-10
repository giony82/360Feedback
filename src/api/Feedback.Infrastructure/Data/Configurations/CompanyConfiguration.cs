using Feedback.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Feedback.Infrastructure.Data.Configurations
{
    internal class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.HasOne(c => c.SubscriptionPlan)
                .WithMany()
                .HasForeignKey(c => c.SubscriptionPlanId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(c => c.Projects)
                .WithOne(p => p.Company)
                .HasForeignKey(p => p.CompanyId);
        }
    }
}
