using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.GovernanceDocument;
using IkaPrasmul.Entities;
using GovernanceDocumentEntity = IkaPrasmul.Entities.Models.GovernanceDocument;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.GovernanceDocument;

public class UpsertGovernanceDocumentRequestHandler : IRequestHandler<UpsertGovernanceDocumentRequest, JsonElement>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public UpsertGovernanceDocumentRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<JsonElement> Handle(UpsertGovernanceDocumentRequest request, CancellationToken ct)
    {
        GovernanceDocumentEntity? entity = null;
        if (!string.IsNullOrWhiteSpace(request.OriginalId) && Guid.TryParse(request.OriginalId, out var originalId))
        {
            entity = await _db.GovernanceDocuments.FirstOrDefaultAsync(d => d.Id == originalId, ct);
        }
        bool isUpdate = entity is not null;

        var oldPdfUrl = entity?.PdfUrl;
        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new GovernanceDocumentEntity
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
            };
            if (request.SortOrder.HasValue)
            {
                await MakeRoomAsync(request.SortOrder.Value, entity.Id, ct);
                entity.SortOrder = request.SortOrder.Value;
            }
            else
            {
                entity.SortOrder = (await _db.GovernanceDocuments.MaxAsync(d => (int?)d.SortOrder, ct) ?? -1) + 1;
            }
            _db.GovernanceDocuments.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
            if (request.SortOrder.HasValue && request.SortOrder.Value != entity.SortOrder)
            {
                await MakeRoomAsync(request.SortOrder.Value, entity.Id, ct);
                entity.SortOrder = request.SortOrder.Value;
            }
        }

        entity.Title = request.Title.Trim();
        entity.Description = request.Description.Trim();
        entity.PdfUrl = request.PdfUrl;

        await _db.SaveChangesAsync(ct);

        if (isUpdate && oldPdfUrl != entity.PdfUrl)
            await _files.DeleteAsync(oldPdfUrl, ct);

        return ContentJson.GovernanceDocument(entity);
    }

    // Keeps SortOrder unique instead of rejecting the save or allowing a
    // duplicate: anything already sitting at or after the requested position
    // shifts down by one to make room for it.
    private async Task MakeRoomAsync(int targetOrder, Guid excludeId, CancellationToken ct)
    {
        var displaced = await _db.GovernanceDocuments
            .Where(d => d.Id != excludeId && d.SortOrder >= targetOrder)
            .ToListAsync(ct);
        foreach (var d in displaced) d.SortOrder += 1;
    }
}
