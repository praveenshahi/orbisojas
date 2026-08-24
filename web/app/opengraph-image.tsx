import { ImageResponse } from "next/og";

export const alt = "Orbis Ojas — See the pattern behind your repeating questions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so the share card can never drift from the brand.
 * Kept to system serif rather than fetching a font binary — the card is
 * mostly ground and mark, and the weight isn't worth the build cost.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          background:
            "radial-gradient(60% 55% at 22% 30%, #241c12 0%, #0a0908 62%, #0a0908 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#c79a4e",
            textTransform: "uppercase",
          }}
        >
          Orbis Ojas
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 74,
            lineHeight: 1.08,
            color: "#f7f2e8",
            fontFamily: "Georgia, serif",
            maxWidth: 900,
          }}
        >
          You&apos;ve been asking the right questions.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontSize: 74,
            lineHeight: 1.08,
            color: "#e8c88a",
            fontFamily: "Georgia, serif",
          }}
        >
          Finally, see the pattern.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 42,
            fontSize: 26,
            color: "#cabfae",
            maxWidth: 820,
          }}
        >
          Soul Mirror reveals the inner architecture behind your repeating patterns.
        </div>
      </div>
    ),
    size,
  );
}
