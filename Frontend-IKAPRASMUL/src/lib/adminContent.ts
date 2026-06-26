import "server-only";

import { redirect } from "next/navigation";
import type {
  AlumniEvent,
  Article,
  Business,
  SigGroup,
  SigSpotlight,
  Story,
} from "@/types";
import { ROUTES } from "@/constants/routes";
import { adminFetch } from "@/lib/adminFetch";

// Server-only reads of the admin content lists (include drafts), used by the
// admin section pages. Falls back to an empty list if the API is unreachable so
// the CMS shell still renders.
async function adminList<T>(path: string): Promise<T[]> {
  let res: Response;
  try {
    res = await adminFetch(`/api/admin/${path}`);
  } catch {
    // Network error — render the empty shell rather than bouncing to login.
    return [];
  }

  // A 401 means adminFetch couldn't refresh the session either — it's expired,
  // so send the admin to sign-in. (redirect() must stay outside the try/catch
  // above so its control-flow signal isn't swallowed.)
  if (res.status === 401) {
    redirect(ROUTES.login);
  }

  if (!res.ok) return [];
  return (await res.json()) as T[];
}

export const getAdminSigGroups = () => adminList<SigGroup>("sig/groups");
export const getAdminSigSpotlights = () => adminList<SigSpotlight>("sig/spotlight");
export const getAdminStories = () => adminList<Story>("stories");
export const getAdminBusinesses = () => adminList<Business>("business");
export const getAdminArticles = () => adminList<Article>("news");
export const getAdminEvents = () => adminList<AlumniEvent>("events");
