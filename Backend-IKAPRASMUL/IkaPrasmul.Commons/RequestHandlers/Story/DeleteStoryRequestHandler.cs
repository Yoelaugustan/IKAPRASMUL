using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Story;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Story;

public class DeleteStoryRequestHandler : IRequestHandler<DeleteStoryRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteStoryRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteStoryRequest request, CancellationToken ct)
    {
        var entity = await _db.Stories.FirstOrDefaultAsync(s => s.Slug == request.Slug, ct);
        if (entity is not null)
        {
            var coverImage = entity.CoverImage;

            _db.Stories.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(coverImage, ct);
        }
        return Unit.Value;
    }
}
