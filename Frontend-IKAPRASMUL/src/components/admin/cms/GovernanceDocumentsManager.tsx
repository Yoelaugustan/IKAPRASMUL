"use client";

import type { GovernanceDocument } from "@/types/governance";
import { ResourcePage } from "./ResourcePage";
import { governanceDocumentsConfig } from "./configs/governanceDocuments";
import { useLang } from "@/components/shared/LanguageProvider";

export function GovernanceDocumentsManager({ items }: { items: GovernanceDocument[] }) {
  const { t } = useLang();
  return <ResourcePage config={governanceDocumentsConfig(t.admin)} initialItems={items} />;
}
