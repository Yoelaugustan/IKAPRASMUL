import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { governanceDocumentListSchema, type GovernanceDocument } from "@/types/governance";

// Fetches through the BFF route (`/api/governance-documents`), which forwards
// to the .NET backend, then validates the response shape at runtime with zod
// — this is admin-authored content served over the network, so (unlike the
// server-rendered content pages) we don't just trust the declared TS type.
async function fetchGovernanceDocuments(): Promise<GovernanceDocument[]> {
  const { data } = await axios.get("/api/governance-documents");
  return governanceDocumentListSchema.parse(data);
}

export function useGovernanceDocuments() {
  return useQuery({
    queryKey: ["governance-documents"],
    queryFn: fetchGovernanceDocuments,
  });
}
