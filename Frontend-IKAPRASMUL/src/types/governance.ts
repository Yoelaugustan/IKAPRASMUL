import { z } from "zod";

// Runtime shape check for the public governance-documents API response — this
// is admin-authored dynamic content served over the network, unlike the
// server-rendered content pages which trust the backend's shape at the type
// level only.
export const governanceDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  pdfUrl: z.string(),
  requiresRequest: z.boolean(),
  sortOrder: z.number(),
});

export const governanceDocumentListSchema = z.array(governanceDocumentSchema);

export type GovernanceDocument = z.infer<typeof governanceDocumentSchema>;
