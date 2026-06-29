using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Returns distinct YYYY-MM-DD strings for published events in a given month.</summary>
public class GetEventDatesRequest : IRequest<List<string>>
{
    /// <summary>Month to query, formatted as YYYY-MM (e.g. "2026-06").</summary>
    public string Month { get; init; } = string.Empty;
}
