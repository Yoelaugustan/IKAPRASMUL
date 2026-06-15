import { NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";

// BFF: forwards a newsletter signup to the .NET backend, which stores it
// (de-duped). Consent is enforced client-side; here we just validate the email
// and an optional source tag.
const API_URL = process.env.API_URL ?? "http://localhost:5080";

const bodySchema = z.object({
  email: z.email("Enter a valid email address.").max(254),
  source: z.string().max(40).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const res = await axios.post(`${API_URL}/api/newsletter/subscribe`, parsed.data, {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true,
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the server. Please try again later." },
      { status: 502 },
    );
  }
}
