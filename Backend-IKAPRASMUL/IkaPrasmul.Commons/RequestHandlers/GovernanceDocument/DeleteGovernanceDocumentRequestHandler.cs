using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.GovernanceDocument;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.GovernanceDocument;

public class DeleteGovernanceDocumentRequestHandler : IRequestHandler<DeleteGovernanceDocumentRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteGovernanceDocumentRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteGovernanceDocumentRequest request, CancellationToken ct)
    {
        if (Guid.TryParse(request.Id, out var id))
        {
            var entity = await _db.GovernanceDocuments.FirstOrDefaultAsync(d => d.Id == id, ct);
            if (entity is not null)
            {
                var pdfUrl = entity.PdfUrl;

                _db.GovernanceDocuments.Remove(entity);
                await _db.SaveChangesAsync(ct);

                await _files.DeleteAsync(pdfUrl, ct);
            }
        }
        return Unit.Value;
    }
}
