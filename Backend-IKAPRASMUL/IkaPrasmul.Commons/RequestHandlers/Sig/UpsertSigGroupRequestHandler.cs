using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class UpsertSigGroupRequestHandler : IRequestHandler<UpsertSigGroupRequest, JsonElement>
{
    private readonly ApplicationDbContext _db;

    public UpsertSigGroupRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<JsonElement> Handle(UpsertSigGroupRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalId) ? request.OriginalId! : request.Id;
        var entity = await _db.SigGroups.FirstOrDefaultAsync(g => g.Key == lookup, ct);
        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new SigGroup
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                SortOrder = (await _db.SigGroups.MaxAsync(g => (int?)g.SortOrder, ct) ?? -1) + 1,
            };
            _db.SigGroups.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
        }

        var desiredKey = SlugService.Slugify(
            !string.IsNullOrWhiteSpace(request.Id) ? request.Id : request.Name);
        entity.Key = await EnsureUniqueKeyAsync(desiredKey, entity.Id, ct);

        entity.Name = request.Name.Trim();
        entity.ImageUrl = request.Image;
        entity.Icon = request.Icon;

        await _db.SaveChangesAsync(ct);
        return ContentJson.SigGroup(entity);
    }

    private async Task<string> EnsureUniqueKeyAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseKey = string.IsNullOrEmpty(desired) ? $"sig-{currentId:N}"[..10] : desired;
        var key = baseKey;
        var n = 2;
        while (await _db.SigGroups.AnyAsync(g => g.Key == key && g.Id != currentId, ct))
        {
            key = $"{baseKey}-{n++}";
        }
        return key;
    }
}
