using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class DeleteSigGroupRequestHandler : IRequestHandler<DeleteSigGroupRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteSigGroupRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteSigGroupRequest request, CancellationToken ct)
    {
        var entity = await _db.SigGroups.FirstOrDefaultAsync(g => g.Key == request.Key, ct);
        if (entity is not null)
        {
            var imageUrl = entity.ImageUrl;

            _db.SigGroups.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(imageUrl, ct);
        }
        return Unit.Value;
    }
}
