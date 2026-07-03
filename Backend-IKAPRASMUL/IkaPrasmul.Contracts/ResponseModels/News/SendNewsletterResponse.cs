namespace IkaPrasmul.Contracts.ResponseModels.News;

public class SendNewsletterResponse
{
    public int SentCount { get; set; }
    public int SubscriberCount { get; set; }
    public string Message { get; set; } = string.Empty;
}
