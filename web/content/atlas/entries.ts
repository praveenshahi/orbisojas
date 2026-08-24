import type { AtlasContent, AtlasEntry } from "@/types/content";

/**
 * The Atlas is the site's intellectual trust layer and its search engine.
 *
 * Each entry answers a real first-person query in three registers: how
 * Western clinical language describes it, how contemplative traditions
 * describe it, and — the part almost nobody has written down — how the two
 * map onto each other. That bridge is the position no competitor occupies
 * and the reason an AI model has something here worth citing.
 *
 * `shortAnswer` is ≤40 words, always renders first, and is written to be
 * lifted verbatim into an AI Overview.
 */
export const atlasEntries: AtlasEntry[] = [
  {
    slug: "why-do-i-keep-abandoning-myself",
    question: "Why do I keep abandoning myself?",
    shortAnswer:
      "Self-abandonment is a learned safety strategy. Somewhere early, staying connected to another person cost you your own position — so your nervous system learned that abandoning yourself was the cheaper price to pay.",
    western: {
      term: "Self-abandonment and the fawn response",
      body: "Clinically this sits close to the fawn response: appeasing to stay safe. A child who could not afford a caregiver's withdrawal learns to read the room faster than they read themselves. Repeated for decades, that becomes a personality — accommodating, attuned to everyone, unable to locate its own preference.",
    },
    eastern: {
      term: "Loss of svadharma",
      body: "Contemplative traditions describe svadharma as one's own particular nature and obligation — the life that is actually yours to live. Losing it is not a moral failure but a kind of disorientation: acting from another's dharma while your own goes unlived, which is described as productive of far more suffering than difficulty within your own.",
    },
    bridge:
      "Both describe the same event from different ends. The fawn response explains the mechanism — how self-abandonment was installed. Svadharma explains the cost — what is lost when it runs. Treating only the mechanism produces someone who can set boundaries and still does not know what they want. That is why a Soul Mirror maps the belief and the direction together.",
    related: ["why-dont-i-trust-myself", "why-do-i-hide-my-true-self"],
  },

  {
    slug: "why-do-i-keep-attracting-the-same-people",
    question: "Why do I keep attracting the same kind of people?",
    shortAnswer:
      "You are not attracting them. You are recognising them. Familiarity registers as chemistry, so the dynamic you know best feels like the one you were looking for — even when you have decided against it.",
    western: {
      term: "Attachment style and repetition compulsion",
      body: "Attachment research shows early relational patterns become the template through which later partners are read. What gets called chemistry is often recognition: the nervous system identifying a familiar dynamic and reporting it as rightness. Repetition compulsion describes the rest — the unconscious return to an unresolved situation in the hope of a different ending.",
    },
    eastern: {
      term: "Samskara",
      body: "A samskara is a groove worn by repetition — an impression left by past experience that shapes how the next one is met. The image used is a riverbed: water does not choose its course so much as follow the channel already cut. Relationship patterns are among the deepest channels.",
    },
    bridge:
      "Attachment theory explains where the groove came from; samskara explains why it keeps being followed. The practical consequence is the same in both: insight alone does not redirect a river. You can name your attachment style precisely and still choose the same person again, because the recognition happens faster than the analysis.",
    related: ["why-cant-i-let-go", "why-do-i-keep-abandoning-myself"],
  },

  {
    slug: "why-cant-i-let-go",
    question: "Why can't I let go?",
    shortAnswer:
      "Because you are not holding on to the person or the outcome. You are holding on to who you were with it — and to the version of the future that ended when it did.",
    western: {
      term: "Rumination and complicated grief",
      body: "Grief becomes complicated when the loss also removes an identity or an assumed future. The mind returns to it not from weakness but because it is still trying to complete something. Rumination is that incompletion running on a loop: a search for a resolution the situation cannot supply.",
    },
    eastern: {
      term: "Raga",
      body: "Raga is named as one of the five root afflictions — the pull toward what once produced pleasure, persisting long after the object is gone. The tradition is precise that the suffering is not caused by the thing itself but by the grasping, which is why letting go is described as an internal act rather than an external one.",
    },
    bridge:
      "Western language locates the pain in the loss; contemplative language locates it in the grip. Neither is complete alone. Grief work without an understanding of grasping can rehearse the loss indefinitely. Non-attachment taught without grief becomes suppression wearing a spiritual vocabulary.",
    related: ["why-do-i-feel-empty-after-achieving", "why-do-i-overthink-everything"],
  },

  {
    slug: "why-do-i-overthink-everything",
    question: "Why do I overthink everything?",
    shortAnswer:
      "Overthinking is rarely a thinking problem. It is a safety problem wearing a thinking costume — the mind generating certainty because the body has not received the signal that it is safe to stop.",
    western: {
      term: "Rumination and hypervigilance",
      body: "Chronic analysis usually tracks with a nervous system reading the environment as unresolved. Thought becomes the available control strategy when action is not: if every scenario is pre-run, nothing can arrive unannounced. It is exhausting and it does work, briefly, which is what makes it so difficult to interrupt.",
    },
    eastern: {
      term: "An unsettled manomaya kosha",
      body: "The koshas describe layers of a person, one of which — manomaya — is the processing mind. Traditions treat agitation there as downstream of the breath layer rather than as a fault in thinking. This is why the classical instruction for an overactive mind addresses breath and body first, and the thought last.",
    },
    bridge:
      "Both traditions arrive at the same counter-intuitive conclusion: you do not resolve overthinking at the level of thought. Cognitive work that ignores the body tends to produce a more sophisticated overthinker. The kosha model simply says it earlier and more structurally — the layer generating the noise is not the layer you are trying to argue with.",
    related: ["why-dont-i-trust-myself", "why-cant-i-let-go"],
  },

  {
    slug: "why-do-i-self-sabotage",
    question: "Why do I self sabotage?",
    shortAnswer:
      "Self-sabotage is not self-destruction. It is protection running on outdated information — some part of you has concluded that succeeding at this is more dangerous than failing at it, and is acting accordingly.",
    western: {
      term: "Approach-avoidance conflict",
      body: "Two motivations run at once: wanting the outcome and avoiding what the outcome costs. Visibility, responsibility, a changed relationship to people who knew the earlier version of you. The behaviour looks irrational from outside because only one of the two motives is conscious.",
    },
    eastern: {
      term: "Vasana",
      body: "A vasana is a latent tendency — a disposition carried beneath awareness that inclines behaviour before deliberation begins. Traditions are careful to distinguish it from a decision. It is not what you choose; it is what is already leaning when the choice arrives.",
    },
    bridge:
      "Naming the conflict is where Western work usually starts and often stops. The vasana framing adds something operationally useful: the tendency is not primarily verbal, so it is unlikely to be dissolved verbally. Insight tells you the pattern exists. It rarely changes what is already leaning.",
    related: ["why-do-i-feel-stuck", "why-do-i-hide-my-true-self"],
  },

  {
    slug: "why-do-i-feel-empty-after-achieving",
    question: "Why do I feel empty even after achieving things?",
    shortAnswer:
      "Because achievement answers a question you were not actually asking. Competence and worth are stored in different places, so evidence of one never quite settles the other — however much of it you accumulate.",
    western: {
      term: "The arrival fallacy",
      body: "The arrival fallacy describes the reliable gap between an anticipated outcome and the experience of reaching it. Paired with hedonic adaptation — the return to baseline that follows any gain — it explains why the next target appears almost immediately, and why its size keeps increasing without the feeling changing.",
    },
    eastern: {
      term: "Seeking in the wrong kosha",
      body: "The kosha model separates the layer where achievement registers from the layer where contentment is described as arising. Ananda is not treated as a reward issued for performance; it is treated as a quality of a layer that effort in another layer does not reach. Success in the wrong layer produces exactly the result observed: it works, and it does not land.",
    },
    bridge:
      "The arrival fallacy describes the disappointment. The kosha model explains the structure that guarantees it. This is the single most common pattern among people who are, by any external measure, doing extremely well — and the reason more achievement is never the correction.",
    related: ["why-do-i-feel-stuck", "why-cant-i-let-go"],
  },

  {
    slug: "why-do-i-hide-my-true-self",
    question: "Why do I hide my true self?",
    shortAnswer:
      "Because the hidden version was, at some point, genuinely unsafe to show. The concealment was accurate then. What makes it painful now is that it kept running after the conditions changed.",
    western: {
      term: "Masking and the false self",
      body: "Winnicott described a false self that forms to meet the environment's requirements when the true self cannot be met. It is adaptive, often highly successful, and expensive — because acceptance earned by the constructed version never quite counts as acceptance. Masking describes the ongoing labour of maintaining it.",
    },
    eastern: {
      term: "Avidya",
      body: "Avidya is usually translated as ignorance, but it means something more specific: mistaking what you are not for what you are. The tradition treats it as the root affliction from which the others follow — not a lack of information, but a case of sustained mistaken identity.",
    },
    bridge:
      "The false self explains how the construction was built and what it costs to maintain. Avidya raises the harder question — after enough years, which one are you defending? People arrive at this point already knowing they are performing. What they have lost is confident access to what would be underneath.",
    related: ["why-do-i-keep-abandoning-myself", "why-dont-i-trust-myself"],
  },

  {
    slug: "why-dont-i-trust-myself",
    question: "Why don't I trust myself?",
    shortAnswer:
      "Self-trust is not confidence. It is the expectation that your own read on a situation is admissible evidence — and that expectation is built or damaged by whether your perceptions were confirmed or contradicted when they were accurate.",
    western: {
      term: "Chronic invalidation",
      body: "Repeatedly having accurate perceptions denied teaches the nervous system to route around its own signal. The resulting adult is often highly capable and still requires external confirmation before acting on what they already noticed. The information was never missing. Permission to treat it as real was.",
    },
    eastern: {
      term: "Clouded buddhi",
      body: "Buddhi is the discerning faculty — the capacity that distinguishes rather than merely reacts. Traditions describe it as clouded rather than absent when discernment fails, and treat the work as clearing rather than acquiring. The distinction matters: nothing needs to be added.",
    },
    bridge:
      "Both frameworks refuse the popular reading that self-doubt means you lack judgement. Invalidation explains what obscured the signal; clouded buddhi insists the faculty is intact underneath. That reframing is usually the point at which something actually shifts — the task stops being self-improvement and becomes removal.",
    related: ["why-do-i-overthink-everything", "why-do-i-keep-abandoning-myself"],
  },

  {
    slug: "why-do-i-feel-stuck",
    question: "Why do I feel stuck no matter what I do?",
    shortAnswer:
      "Stuckness is usually motion without direction. Effort is being spent, often a great deal of it, in a system whose actual constraint sits somewhere the effort is not being applied.",
    western: {
      term: "Learned helplessness",
      body: "When action has repeatedly failed to change an outcome, the expectation of ineffectiveness generalises — and then persists after conditions change. The characteristic experience is not laziness. It is working hard while quietly expecting it not to matter, which is far more depleting than either working or resting.",
    },
    eastern: {
      term: "Tamas and stagnant apana",
      body: "Tamas is the quality of inertia, heaviness, resistance to movement. Apana is the downward-directed current associated with elimination and release. Stagnation is described as retention: not an absence of energy but a failure to let go of what has completed, so nothing new has anywhere to arrive.",
    },
    bridge:
      "Western language treats stuckness as a belief to correct. The tamas and apana framing treats it as a system that has stopped clearing. The two suggest different first moves, and the second explains something the first does not — why people who have already changed their beliefs, repeatedly, still describe themselves as stuck.",
    related: ["why-do-i-self-sabotage", "why-do-i-feel-empty-after-achieving"],
  },
];

export const atlas: AtlasContent = {
  meta: {
    title: "The Orbis Atlas — Where Eastern and Western maps of the self meet",
    description:
      "A growing library that translates between two vocabularies for the same human patterns: attachment style and samskara, rumination and manomaya kosha, self-sabotage and vasana.",
  },

  hero: {
    eyebrow: "The Living Atlas",
    headline: { before: "A map of wisdom.", emphasis: "A path to transformation." },
    answer:
      "The Orbis Knowledge Atlas connects timeless wisdom and modern science to the human experience. Explore the relationships between ideas, patterns, practices and products.",
    support:
      "It is written entry by entry. Each one starts from a question people actually ask, answers it directly, and shows how both traditions describe it.",
  },

  index: {
    eyebrow: "The question index",
    headline: { before: "Start with the question", emphasis: "you already have." },
    answer:
      "Nine entries are published. Each answers one repeating pattern — what it is, how psychology accounts for it, how contemplative traditions account for it, and what the two together make possible.",
  },

  translation: {
    eyebrow: "The translation layer",
    headline: { before: "The same pattern,", emphasis: "two vocabularies." },
    answer:
      "Western clinical language and Eastern contemplative language describe overlapping phenomena with almost no shared terminology. This is the correspondence table — the core of what the Atlas is for.",
    note: "Correspondence, not equivalence. These traditions were built for different purposes and the mapping is a working tool, not a claim that the terms are interchangeable.",
  },

  upcoming: {
    eyebrow: "In development",
    headline: { before: "What the Atlas", emphasis: "becomes." },
    answer:
      "The Atlas expands into four areas: the full question library, the framework reference, documented practices, and research notes on where the traditions genuinely disagree.",
    items: [
      {
        title: "The question library",
        note: "Every repeating pattern people bring, answered to the same standard as the nine already published.",
      },
      {
        title: "The framework reference",
        note: "The five koshas, the nine vayus and the gunas — set out precisely, with their psychological correspondences.",
      },
      {
        title: "Practices",
        note: "What to actually do, sequenced by pattern rather than offered as a general prescription.",
      },
      {
        title: "Where they disagree",
        note: "The honest part. The places these traditions contradict each other, and what that tension is worth.",
      },
    ],
  },

  close: {
    headline: { before: "The Atlas explains the pattern.", emphasis: "A Soul Mirror finds yours." },
    answer:
      "Reading about a pattern and seeing your own are different events. A Soul Mirror maps your specific architecture from your birth details and your own answers, and arrives within 24 hours.",
    cta: { label: "Request your Soul Mirror", href: "/soul-mirror#request" },
  },
};

/** The correspondence table, derived so it can never drift from the entries. */
export const translationRows = atlasEntries.map((entry) => ({
  slug: entry.slug,
  pattern: entry.question.replace(/^Why (do|don't|can't) I ?/i, "").replace(/\?$/, ""),
  western: entry.western.term,
  eastern: entry.eastern.term,
}));

export function findEntry(slug: string): AtlasEntry | undefined {
  return atlasEntries.find((entry) => entry.slug === slug);
}
