using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Feedback.Infrastructure.Data.Configurations
{
    public class FeedbackConfiguration : IEntityTypeConfiguration<Core.Entities.Feedback>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.Feedback> builder)
        {
            // Configure primary key
            builder.HasKey(f => f.Id);

            // Configure foreign key for UserGiverId
            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(f => f.UserGiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure foreign key for UserReceivedId
            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(f => f.UserReceivedId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure foreign key for FeedbackSessionId
            builder.HasOne(f => f.FeedbackSession)
                .WithMany(fs => fs.Feedbacks)
                .HasForeignKey(f => f.FeedbackSessionId);
        }
    }
}