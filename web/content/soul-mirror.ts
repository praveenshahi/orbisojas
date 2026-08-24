import type { SoulMirrorContent } from "@/types/content";

/**
 * Soul Mirror page copy, transcribed from `new site/soul mirror.jpeg`.
 * The comp is the specification; where this file and the comp disagree,
 * the comp wins.
 *
 * Every `answer` field is the ≤40-word sentence written to be lifted by AI
 * search (see docs/06_AEO_STRATEGY.md).
 */
export const soulMirror: SoulMirrorContent = {
  meta: {
    title: "Soul Mirror — Your inner architecture, revealed",
    description:
      "Soul Mirror is a personalised report that maps the architecture behind your repeating patterns — across mind, emotions, relationships, identity and purpose. Delivered to your inbox within 24 hours.",
  },

  hero: {
    eyebrow: "The Soul Mirror",
    headline: { before: "Meet yourself.", emphasis: "Beyond your own story." },
    answer:
      "A deep AI-assisted report that reveals the architecture behind your mind, emotions, relationships, purpose, and life patterns. Prepared from your birth details and your own answers, and delivered within 24 hours.",
    quote: "The mirror doesn't predict your future. It reveals your inner architecture.",
    cta: { label: "Get your Soul Mirror", href: "#request" },
    /** Sample arrives later; points at the reveals band until then. */
    secondaryCta: { label: "Explore a sample report", href: "#reveals" },
    imageAlt:
      "A woman seated at a stone terrace at dawn, looking out over a valley towards a crescent horizon.",
    disciplines: [
      { glyph: "sun", label: "Astrology", note: "Ancient wisdom" },
      { glyph: "spiral", label: "Psychology", note: "Modern science" },
      { glyph: "lotus", label: "Somatics", note: "Embodied truth" },
      { glyph: "orbit", label: "AI + Human", note: "Precision + insight" },
    ],
    proof: {
      text: "Trusted by seekers, creators, healers and leaders worldwide.",
      ratingValue: "4.9",
      ratingCount: 60,
      /** Photographs land later; monogram discs stand in. */
      avatars: [null, null, null, null],
    },
  },

  metrics: {
    lead: "For those ready to understand life deeply — not just manage it.",
    items: [
      { value: "5", label: "Kosha architecture" },
      { value: "9", label: "Vayu intelligence" },
      { value: "12+", label: "Life areas analysed" },
      { value: "32+", label: "Pages of insight" },
      { value: "100%", label: "Personalised & confidential" },
    ],
  },

  reveals: {
    eyebrow: "The Soul Mirror reveals",
    headline: { before: "The patterns behind", emphasis: "your patterns." },
    answer:
      "Your Soul Mirror maps six domains of your life, isolates the core loop you keep repeating, names the belief underneath it, shows where it lives in your body, and gives you practices built for that specific loop.",
    support: "Go beyond surface-level advice. See the invisible architecture shaping your life.",
    points: [
      "Understand your core wounds and survival patterns",
      "Discover your attachment style and relationship blueprint",
      "Decode career, purpose and financial energy flow",
      "Receive personalised practices for deep transformation",
    ],
    imageAlt:
      "Five Soul Mirror report pages fanned in depth — the dark cover at the centre, with the core architecture map, emotional blueprint and shadow pattern loop angled behind it.",
  },

  quoteBand: {
    quote: "Understanding creates safety. Safety creates trust. Trust creates transformation.",
    attribution: "Orbis Ojas",
  },

  process: {
    eyebrow: "A journey in 6 steps",
    headline: { before: "How it", emphasis: "works." },
    answer:
      "You share your birth details and answer three reflective questions. Your responses are analysed across multiple frameworks, refined by a human interpreter, and returned as a personalised report within 24 hours.",
    steps: [
      { glyph: "sun", title: "Share your details", note: "Birth data and a few reflective questions." },
      { glyph: "orbit", title: "AI + ancient analysis", note: "Deep multi-layered analysis begins." },
      { glyph: "document", title: "Human interpretation", note: "Our interpreters refine the insights." },
      { glyph: "book", title: "Receive your report", note: "A beautiful, personalised Soul Mirror." },
      { glyph: "lotus", title: "Integration session", note: "Optional 1:1 call to dive deeper." },
      { glyph: "flame", title: "Transform your life", note: "Apply, integrate, and evolve." },
    ],
  },

  faq: {
    headline: { before: "Questions people ask", emphasis: "before they begin." },
    items: [
      {
        question: "What exactly is a Soul Mirror?",
        answer:
          "A personalised report of 32+ pages that maps your inner architecture: your pattern map across six life domains, the core loop you repeat, the belief driving it, where it lives in your body, and practices designed for that loop.",
      },
      {
        question: "Is this astrology?",
        answer:
          "No. Your birth details are one input among several. The report does not predict events or describe your future. It describes the structure of your present patterns, drawing on contemplative traditions, psychology and somatics together.",
      },
      {
        question: "How long does it take?",
        answer:
          "Your Soul Mirror is delivered to your inbox within 24 hours of your request. The form itself takes about five minutes.",
      },
      {
        question: "What if I don't know my exact time of birth?",
        answer:
          "You can still request a Soul Mirror. Time of birth sharpens certain layers of the analysis, but the report is built from several inputs and remains substantive without it.",
      },
      {
        question: "What does it cost?",
        answer:
          "Pricing is shared directly. Submit the form and you will receive the details along with your next steps.",
      },
      {
        question: "Is my information private?",
        answer:
          "Yes. Your birth details and your answers are used only to prepare your Soul Mirror. They are never shared, sold, or used for anything else.",
      },
    ],
  },

  closing: {
    headline: { before: "This is not just a report.", emphasis: "It is a turning point." },
    support: "Are you ready to meet the real you?",
    cta: { label: "Get your Soul Mirror", href: "#request" },
    assurances: ["Secure", "Private", "Confidential"],
    imageAlt: "A lit ghee lamp beside old bound books on a dark table.",
  },

  request: {
    eyebrow: "Begin",
    headline: { before: "Share your details.", emphasis: "Meet yourself." },
    answer:
      "Share your birth details and answer three questions about the pattern that keeps repeating. Your Soul Mirror arrives within 24 hours.",
    assurance: "Private and confidential. Your details are used only to prepare your Soul Mirror.",
    submitLabel: "Request my Soul Mirror",
    successTitle: "Your request is in.",
    successBody:
      "Your Soul Mirror is being prepared. It will arrive in your inbox within 24 hours, along with everything you need to know about next steps.",
  },
};
