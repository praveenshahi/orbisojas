import type { HomeContent } from "@/types/content";

/**
 * All homepage copy. Nothing here is decorative — each block declares the
 * search query it is written to answer (see lib/seo/keywords.ts), and each
 * `answer` field is the ≤40-word sentence engines are expected to lift.
 */
export const home: HomeContent = {
  hero: {
    eyebrow: "This isn't another test",
    headline: {
      before: "You've been asking the right questions.",
      emphasis: "Finally, see the pattern",
      after: "behind them.",
    },
    lead: "Soul Mirror reveals the inner architecture behind your repeating patterns — across relationships, emotions, purpose and identity.",
    promptLabel: "What have you been trying to understand?",
    promptHint: "Not sure? Explore the questions others ask",
    cta: { label: "Begin your Soul Mirror", href: "/soul-mirror#request" },
  },

  /**
   * These are verbatim first-person search queries, not invented copy.
   * The visual constellation and the Tier-1 keyword map are the same object.
   */
  questions: [
    { id: "abandon", text: "Why do I keep abandoning myself?", slug: "why-do-i-keep-abandoning-myself", primary: true },
    { id: "attract", text: "Why do I keep attracting the same kind of people?", slug: "why-do-i-keep-attracting-the-same-people" },
    { id: "letgo", text: "Why can't I let go?", slug: "why-cant-i-let-go" },
    { id: "overthink", text: "Why do I overthink everything?", slug: "why-do-i-overthink-everything" },
    { id: "sabotage", text: "Why do I self sabotage?", slug: "why-do-i-self-sabotage" },
    { id: "empty", text: "Why do I feel empty even after achieving things?", slug: "why-do-i-feel-empty-after-achieving" },
    { id: "hide", text: "Why do I hide my true self?", slug: "why-do-i-hide-my-true-self" },
    { id: "trust", text: "Why don't I trust myself?", slug: "why-dont-i-trust-myself" },
    { id: "stuck", text: "Why do I feel stuck no matter what I do?", slug: "why-do-i-feel-stuck" },
  ],

  domains: {
    heading: {
      before: "Most questions aren't separate.",
      emphasis: "They're connected.",
    },
    answer:
      "Repeating patterns across relationships, body, identity, mind and purpose are rarely separate problems. They are one structure, seen from seven angles.",
    support: "Different situations. Same feelings. Same endings. There's a pattern beneath.",
    /* The canonical seven, shared with the Atlas. One taxonomy sitewide,
       so a visitor moving between the pages sees the same map of themselves.
       Source of truth: content/atlas/domains.ts */
    items: [
      { icon: "sun", label: "Masculine Energy", note: "Direction, boundaries, action" },
      { icon: "lotus", label: "Feminine Energy", note: "Flow, receptivity, creation" },
      { icon: "mandala", label: "Relationships", note: "Attachment, love, connection" },
      { icon: "flame", label: "Body & Nervous System", note: "Sensations, regulation, embodiment" },
      { icon: "orbit", label: "Purpose & Dharma", note: "Calling, alignment, contribution" },
      { icon: "spiral", label: "Identity & Self", note: "Who I am, story, integration" },
      { icon: "book", label: "Mind & Cognition", note: "Thoughts, beliefs, meaning" },
    ],
    link: { label: "See how it works", href: "/soul-mirror" },
  },

  artifact: {
    eyebrow: "Your personal mirror",
    heading: { before: "See what's inside your", emphasis: "Soul Mirror" },
    answer:
      "A Soul Mirror is a personalised 32+ page report that maps your inner architecture: your pattern map, the core loop you repeat, its root belief, where it lives in your body, and the practices that break it.",
    points: [
      "32+ page personalised report",
      "Maps your inner loops and their root causes",
      "Actionable practices, not generic advice",
      "Your map. Your pace. Your transformation.",
    ],
    cta: { label: "Preview a Soul Mirror report", href: "/soul-mirror" },
    imageAlt:
      "An open Soul Mirror report on a dark table, showing a personal pattern map across mind, identity, emotions, body, relationships and purpose, beside a diagram of the core loop.",
  },

  /**
   * Real clients, real words. `avatar: null` renders a gold monogram disc —
   * a deliberate treatment, not a broken image — until the photographs land.
   */
  testimonials: {
    heading: { before: "Real people.", emphasis: "Real shifts." },
    support: "Stories from those who saw their patterns for the first time.",
    items: [
      {
        quote:
          "I came here thinking my problem was relationships. Turns out I had been abandoning myself long before anyone else could.",
        name: "Ananya",
        age: 27,
        role: "Soul Mirror client",
        avatar: null,
      },
      {
        quote:
          "It connected so many dots — childhood, my fears, my choices. I finally feel like I have a map, not just motivation.",
        name: "Rohan",
        age: 29,
        role: "Soul Mirror client",
        avatar: null,
      },
      {
        quote:
          "The insights were practical, not overwhelming. The practices changed how I respond, not just how I think.",
        name: "Meera",
        age: 24,
        role: "Soul Mirror client",
        avatar: null,
      },
    ],
  },

  trust: {
    items: [
      { icon: "lock", label: "Private & confidential", note: "Your data is never shared or sold." },
      { icon: "layers", label: "Built on depth", note: "Integrating psychology, somatics, contemplative traditions and jyotish." },
      { icon: "pen", label: "Human refined", note: "Every mirror is interpreted by a person, not generated and sent." },
    ],
    close: {
      heading: { before: "Stop collecting answers.", emphasis: "See the pattern." },
      cta: { label: "Begin your Soul Mirror", href: "/soul-mirror#request" },
    },
  },
};
