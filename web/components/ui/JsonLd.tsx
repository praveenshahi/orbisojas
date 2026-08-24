/**
 * Renders a schema graph. Server-rendered into the document so crawlers and
 * AI models see it without executing anything.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built by our own typed builders, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
