namespace IkaPrasmul.Commons.Constants;

/// <summary>
/// Known "Get in Touch" subjects. Kept as constants (not a hard enum) because the
/// front-end sends display strings; validation is lenient for now and can be
/// tightened to this allow-list once the form values are locked.
/// </summary>
public static class InquirySubject
{
    public const string GeneralInquiry = "General Inquiry";
    public const string CreateSig = "Create a SIG";
    public const string ListYourBusiness = "List Your Business";
    public const string SubmitYourStory = "Submit Your Story";
    public const string Membership = "Membership";
    public const string Partnership = "Partnership";

    public static readonly IReadOnlyList<string> All =
    [
        GeneralInquiry,
        CreateSig,
        ListYourBusiness,
        SubmitYourStory,
        Membership,
        Partnership,
    ];
}
