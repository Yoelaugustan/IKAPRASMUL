namespace IkaPrasmul.Contracts.ResponseModels;

/// <summary>Envelope returned by all paginated public list endpoints.</summary>
public record PagedResult<T>(
    IReadOnlyList<T> Items,
    int Total,
    int Page,
    int PageSize)
{
    public int TotalPages => PageSize > 0 ? (int)Math.Ceiling((double)Total / PageSize) : 0;
}
