import { NextResponse } from "next/server";
import axios from "axios";
import { contactSchema } from "@/types/schemas";

// BFF: forwards the "Get in Touch" inquiry to the .NET backend (server-to-server,
// so no CORS and the backend URL stays off the client). The backend stores the
// inquiry and emails the admin (with the optional image attached).
const API_URL = process.env.API_URL ?? "http://localhost:5080";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  try {
    const res = await axios.post(`${API_URL}/api/contact`, parsed.data, {
      headers: { "Content-Type": "application/json" },
      // Forward whatever status the backend returns (e.g. 400/429).
      validateStatus: () => true,
      // The optional image is sent as a base64 data URL — lift axios's limits.
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the server. Please try again later." },
      { status: 502 },
    );
  }
}
