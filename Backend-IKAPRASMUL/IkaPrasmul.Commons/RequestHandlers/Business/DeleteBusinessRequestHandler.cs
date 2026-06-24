using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Business;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Business;

public class DeleteBusinessRequestHandler : IRequestHandler<DeleteBusinessRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteBusinessRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteBusinessRequest request, CancellationToken ct)
    {
        var entity = await _db.BusinessListings.FirstOrDefaultAsync(b => b.Slug == request.Slug, ct);
        if (entity is not null)
        {
            var logo = entity.Logo;
            var coverImage = entity.CoverImage;

            _db.BusinessListings.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(logo, ct);
            await _files.DeleteAsync(coverImage, ct);
        }
        return Unit.Value;
    }
}
