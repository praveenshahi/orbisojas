/**
 * The single swap point between the site and whatever receives requests.
 *
 * Today: Web3Forms (no backend, no database, delivers straight to the inbox).
 * Tomorrow: Typeform, a CRM, or a route handler — change `submitRequest`
 * and nothing else in the codebase needs to know.
 */

export interface RequestPayload {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  pattern: string;
  firstNoticed: string;
  alreadyTried: string;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

const ENDPOINT = "https://api.web3forms.com/submit";

export async function submitRequest(data: FormData): Promise<SubmitResult> {
  const accessKey = process.env["NEXT_PUBLIC_WEB3FORMS_KEY"];

  if (!accessKey) {
    return {
      ok: false,
      error: "The request form isn't connected yet. Please email us directly.",
    };
  }

  data.append("access_key", accessKey);
  data.append("subject", "New Soul Mirror request");
  data.append("from_name", "Orbis Ojas");

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      return { ok: false, error: "Something went wrong sending your request. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}
