using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class DeleteSigSpotlightRequestHandler : IRequestHandler<DeleteSigSpotlightRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteSigSpotlightRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteSigSpotlightRequest request, CancellationToken ct)
    {
        var entity = await _db.SigSpotlights.FirstOrDefaultAsync(s => s.Key == request.Key, ct);
        if (entity is not null)
        {
            var imageUrl = entity.ImageUrl;

            _db.SigSpotlights.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(imageUrl, ct);
        }
        return Unit.Value;
    }
}
