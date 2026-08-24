# ORBISOJAS — Design System Document
## The Visual Architecture of the Descent
### Internal — Pre-Build Design Reference
### June 2026

---

> Design is not decoration applied to content.
> Design IS the content's first language.
> Before a single word is read, the design has already spoken.
> It has already said: "this is safe," or "this is deep," or "you've been here before."
> For Orbisojas, the design must say all three.

---

## PART ONE — DESIGN PHILOSOPHY

### 1.1 The Core Principle: Design as Descent

The Orbisojas framework is about going inward and downward — from the performing mind into the feeling body. The design must do the same thing to the viewer.

Every design decision answers one question: **does this take the viewer deeper, or does it keep them on the surface?**

- Flat layouts keep you on the surface. Depth pulls you in.
- Bright, even lighting keeps you on the surface. Chiaroscuro pulls you in.
- Text explaining something keeps you on the surface. Text naming what you already feel pulls you in.
- Decoration keeps you on the surface. Meaning pulls you in.

The design is not illustrating the framework. **The design IS the framework operating on the viewer's visual nervous system.** Before they read "the descent," they have already descended — through visual depth, through light pulling them inward, through spatial composition that creates the felt sense of going deeper.

### 1.2 The Inversion Applied to Design

Every wellness brand designs UP. Light backgrounds. Airy. Elevated. Aspirational. Bright whites and clean sans-serifs floating in space. This is the visual language of ascent.

Orbisojas designs DOWN.

- Light comes from below, not above. The warmth is underneath. The surface is cold.
- Depth increases as you scroll. Not depth as parallax trick — depth as spatial truth. The bottom of the page feels deeper than the top.
- The visual weight settles. Nothing floats. Everything has gravity.
- The ground is the warmest place. Not the sky.

**This is the visual inversion.** Every other brand in this space is designing a temple you look up at. Orbisojas designs a cave you look into. The temple impresses. The cave recognizes.

### 1.3 What the Design Must Feel Like

Not "look like." Feel like.

**The 2am phone realization.** The moment at 2am when you're lying in the dark and something clicks — not from thinking harder but from finally stopping. The screen is the only light. The world is quiet. And something true arrives, uninvited. That intimacy. That stillness. That clarity that only comes when the performance stops.

**The childhood drawing.** A child draws without self-consciousness. No grid system. No golden ratio. Just the direct transmission of inner reality onto paper. Pixel art and simple illustration carry this quality — unpolished, direct, true. The simplicity isn't a limitation. It's what remains after the performance is removed.

**The old book found in a trunk.** Something that existed before you and will exist after you. Not trendy. Not dated. Timeless because it never tried to be timely. The typography of wisdom, not marketing.

---

## PART TWO — THE SPATIAL LANGUAGE

### 2.1 Depth as Meaning

The page is not a flat surface. It is a space with depth — and that depth means something.

**Z-axis = consciousness layer.**

| Visual Depth | Consciousness Layer | Design Treatment |
|---|---|---|
| Foreground (closest to viewer) | The performing mind — Vijnanamaya | Sharp, cold, over-lit. Text that sounds smart but doesn't land. The surface world. |
| Mid-ground | The emotional layer — Manomaya | Softer. Slightly warmer. Starting to blur at the edges. The transition between knowing and feeling. |
| Background (deepest) | The felt sense — Pranamaya | Warm glow. Out of focus but FELT. The thing you can't quite see but know is there. The design equivalent of gut knowing. |
| The ground plane | The body / consciousness ground — Annamaya + Anandamaya | Solid. Warm. Unmoving. Everything settles onto this. Not a destination to reach — the plane everything rests on. |

**How this works in practice:**

- Foreground elements are sharp-edged, cold-colored, clearly defined. Think: the pixel cityscape, the screens, the achievement icons.
- As the viewer scrolls deeper, edges soften. Colors warm. Contrast becomes more about light/shadow than sharp lines.
- The deepest sections use radial light from below — like sitting at the bottom of a well and looking at warmth.
- The ground plane is always present at the very bottom — warm, amber, still.

### 2.2 Light as Emotion

Light direction is the most powerful unconscious design tool. It determines where the viewer's psyche places "safety" and "source."

**The Orbisojas light model:**

```
                    ╭──── COLD AMBIENT (the surface world) ────╮
                    │     dim, blue-grey, even, flat            │
                    │     no shadows = no depth = no feeling    │
                    ╰──────────────────────────────────────────╯
                                      │
                                   descent
                                      │
                                      ▼
                    ╭──── WARM RADIAL (from below) ────────────╮
                    │     the deeper you go, the warmer it gets │
                    │     light source = the ground itself      │
                    │     shadows fall UPWARD (the inversion)   │
                    ╰──────────────────────────────────────────╯
```

**Light-from-below effects:**
- Radial gradients with center-bottom origin
- Box-shadows with negative Y values (shadow cast upward)
- Elements lit from underneath: `background: radial-gradient(ellipse at 50% 100%, warm, transparent)`
- The inner child figure in Scene 05 GLOWS — it is the light source in the cave
- The Mirror pool at the bottom is pure light — the destination is luminous

**The shadow vocabulary:**
- Surface world: No shadows. Flat. This IS the wound — the inability to perceive depth.
- Transition: Soft shadows appear. Things start having dimension. "Something is underneath."
- Deep sections: Strong chiaroscuro. Light from below casts dramatic upward shadows. The architecture of the wound becomes visible because there is finally enough contrast to see structure.
- The ground: Soft, ambient warmth. Shadow dissolves into acceptance. No harsh edges. Arrived.

### 2.3 The Breathing Grid

Nothing in consciousness is rigid. The grid system must reflect this.

**No hard grid.** Instead: a breathing grid that contracts and expands.

- Surface sections: Tight grid. Rigid. Controlled. Pixel-perfect alignment. This IS the performing mind — everything in its place.
- Mid-descent: Grid loosens. Elements have more space. Asymmetry enters. Things are slightly off-center. The control is relaxing.
- Deep sections: No grid. Organic placement. Elements exist where they feel right, not where a column system dictates. The body doesn't operate on a 12-column grid.
- The ground: Centered. Simple. One thing in the middle of vast space. Stillness.

**This grid shift happens naturally through the scroll.** The viewer doesn't notice it consciously. But their nervous system registers: "things are getting less controlled. Something is softening."

---

## PART THREE — THE VISUAL VOCABULARY

### 3.1 The Pixel Art System

Pixel art is not a style choice. It is a consciousness choice.

**Why pixel art for Orbisojas:**
1. **It is the language of the generation that grew up in screens.** 8-bit, 16-bit — this is childhood. And Orbisojas works with the inner child. The visual form IS the subject.
2. **Pixels are honest.** A pixel is either on or off. There is no anti-aliasing, no smoothing, no gradient pretending to be continuous. It is discrete. It is what it is. This is the quality Orbisojas asks for — stop performing smoothness. Be what you are.
3. **Simplicity carries weight.** A simple pixel figure with 30 pixels can carry more emotional truth than a photorealistic render. Because the viewer's mind fills in the rest — and what they fill in is themselves. The simpler the character, the more the viewer projects themselves into it.
4. **It remembers.** Pixel art triggers pre-verbal memory. The feeling of playing a game at age 6, before the performance started. Before the wound was sophisticated enough to have strategy. The aesthetic itself is a Pranamaya activation.

**The pixel art rules:**

- **Character:** 8-14px tall. No face detail — just a silhouette with enough features to read as human. The viewer IS the character. Too much detail breaks the projection.
- **Inner child:** Same character, 60% size. Warmer color. Same posture but softer. Unmistakably "younger version of the same being."
- **Environment:** More detailed than the character. The world is vivid and full — buildings, trees, caves, water, roots. The character is simple within a rich world. This is the design metaphor: the performing self is simple (just a role), but the world of inner experience is vast and detailed.
- **Palette per scene:** Each scene gets a limited palette (8-12 colors). This constraint is essential. It forces clarity and prevents visual noise. Consciousness doesn't need 16 million colors. It needs the right five.
- **No outline on character.** The character exists through color contrast with the environment, not through a black border. Outlines are boundaries. The character's boundaries are dissolving through the journey.

### 3.2 Light and Shadow in Pixel Art — The 3D Effect

Pixel art becomes volumetric when light and shadow are applied with intention.

**Technique: Sub-pixel shading within pixel constraints**

Instead of flat pixel blocks, each scene uses 3-4 shades of each base color:
- Highlight (light-facing pixels — facing DOWN in our inverted model)
- Base color
- Shadow (away from light — facing UP)
- Deep shadow (fully occluded)

This creates the sense that the pixel world has VOLUME — it's not a flat sprite sheet. It's a space you could walk into.

**Technique: Atmospheric perspective in pixel art**

- Near elements: Full saturation, full contrast, sharp pixel edges
- Mid elements: Slightly desaturated, slightly lower contrast
- Far elements: Nearly monochromatic, very low contrast, blending with the background gradient

This makes the black gradient canvas feel like a SPACE with depth, not a flat background with sprites on it.

**Technique: Volumetric light with dithering**

Where light meets shadow, instead of a hard edge, use dithering — alternating light and dark pixels in a checkerboard pattern. This creates a visual "softness" within the pixel grid. It's the pixel equivalent of the transition between understanding and feeling — neither fully one thing nor the other. The liminal space.

**Technique: Glow as radial gradient behind pixel sprites**

The pixel art sits ON TOP of smooth radial gradients. The pixel world is crisp and discrete. The light world beneath it is smooth and continuous. Two visual languages coexisting:
- Pixel = the constructed self (discrete, defined, boundaried)
- Gradient = consciousness (continuous, unbounded, flowing)

As the descent deepens, the gradients become more prominent and the pixel structures become simpler. By the ground: mostly gradient. The pixel figure now exists within light, not on top of it.

### 3.3 Typography as Architecture

Text is not content placed on the design. Text IS architecture within the design.

**The type system:**

| Layer | Font Character | Role | Treatment |
|---|---|---|---|
| **Display / Emotional** | Serif with genuine character — weight, history, presence. Not decorative. Not startup-geometric. A face that has lived. | The lines that name the wound. The questions. The truth statements. | Large. Given extreme space. Appears word-by-word or line-by-line. Never all at once. Each word must be felt before the next arrives. |
| **Body / Naming** | Clean monospace or humanist sans. Functional. Clear. Direct. | Scene labels. Short descriptions. The "naming" text. | Small. DM Mono weight. Placed as part of the scene, not floating above it. Often positioned at the edge or bottom — the text version of a whisper. |
| **Pixel / System** | Pixel font. 8-bit or custom bitmap. | Numbers. Labels. One-word prompts. Interface elements. | The nostalgia carrier. Used sparingly — for scene numbers, for the word "SCROLL" as instruction, for the descent meter. Never for emotional content. |

**Text integration rules:**

1. **Text lives IN the scene, not ON it.** The words are part of the pixel landscape. They occupy the same depth plane as the visual elements. No floating text boxes.

2. **One idea per screen.** Maximum two lines. If you need more words, you need fewer ideas. The visual tells the story. The text names what the visual already showed.

3. **Text enters slowly.** Word-by-word for emotional lines (0.08-0.12s per word). Fade-in for naming text. Never instant. The pace of text appearance IS the breathing rhythm.

4. **Text exits before the next scene.** Text doesn't persist across scenes. Each line arrives, lands, and dissolves. Like a thought you had at 2am that was true but couldn't be held. The user can scroll back to find it — but it doesn't follow them forward. The journey is forward.

5. **Vertical text as structure.** Scene labels or layer names can run vertically along the edge — like the spine of a book. This connects to "Inherited Architecture" literally: the text AS architecture, as structural element, not just readable content.

### 3.4 Color as Temperature

The color system is not a palette — it is a temperature map of the descent.

**The Temperature Arc:**

```
SURFACE (cold)                                    GROUND (warm)
  │                                                     │
  ▼                                                     ▼
  #0a0a14 ─── #0e0e18 ─── #0a0814 ─── #0a0804 ─── #1a1208
  blue-black   slate       deep blue    warm black   dark amber
  
  Accent:      Accent:     Accent:      Accent:      Accent:
  #3a3a5a      #3a5a7a     #5a3a3a      #c45e2a      #e8834a
  cold grey    steel blue   muted wine   flame        ember
```

**Scene-by-scene palette:**

| Scene | Background | Primary | Accent | Light Source |
|---|---|---|---|---|
| 01 Surface | #0a0a14 blue-black | #3a3a5a cold grey | #4a4a7a screen blue | Screens glow (cold, multiple, scattered) |
| 02 Crack | #0a0a14 → #0a0804 transition | #c45e2a flame | #e8834a ember | Crack itself (first warm light, from below) |
| 03 Mind Maze | #0e0e18 dark slate | #2a2a44 maze walls | #3a3a5a thought text | None — this layer has no light source. That IS the design point. |
| 04 Water | #0a0814 deep blue | #1a3040 water | #3a5a7a steel blue | Diffused. Light comes from everywhere and nowhere. The dissolving of fixed sources. |
| 05 Cave | #0a0804 warm black | #1a120a cave rock | #c45e2a warm glow | The inner child. The child IS the light source. |
| 06 Body | #0a0804 → #1a1208 | #2a1a0a earth | #c45e2a roots | Warmth from below. The ground radiates. |
| 07 Ground | #1a1208 dark amber | #c45e2a flame | #e8834a ember | Ambient. Warm. Everywhere. Like being inside warmth itself. |
| 08 Mirror | #0a0804 → light center | #e8834a ember | #f0e8d8 parch light | The mirror pool. Pure concentrated light. The warmest point on the entire page. |

**The color rule:** At no point does the palette go backwards. Once warm color enters (Scene 02), it never fully leaves. The warmth accumulates. This is the visual version of "you can't unsee it once you've seen it."

### 3.5 Motion as Breath

Animation is not decoration. It is the page breathing.

**The motion vocabulary:**

| Motion Type | What It Means | Where Used |
|---|---|---|
| **Fade from deep** | Emergence. Something coming into awareness from a layer below. | Text reveals. Character appearances. Warm light growing. |
| **Settle** | Gravity. Landing. The body's relationship with the earth. | Elements that arrive and gently overshoot then settle into place. Like a breath that reaches the bottom of the exhale. |
| **Dissolve** | Letting go. The control releasing. One state becoming another. | Scene transitions. The maze dissolving into water. The pixel world softening. |
| **Slow pulse** | Life. Vitality. The Pranamaya field becoming active. | The inner child's glow. The cave warmth. The ground light. Very slow (4-6 second cycle). Not a heartbeat — a breath. |
| **Parallax drift** | Layers of consciousness at different speeds. Depth perception. | Background layers moving slower than foreground. Creates the sense of space BEHIND the screen. |

**What never happens:**
- Bounce. Nothing bounces. Bouncing is playful in a way that undermines the depth.
- Spin. Nothing rotates. Rotation is decorative.
- Slide from side. Nothing enters from left or right. Everything enters from depth — from opacity 0 to 1, from translateY/translateZ, from blur to sharp.
- Loop. Nothing loops except the breath pulse. Everything else happens once, with intention, and stays.

**GSAP ScrollTrigger architecture:**

Each scene is a `pin: true` section. The scene pins while the content within it animates according to scroll progress. The user's scroll IS the animation timeline. They control the pace. Fast scroll = fast descent. Slow scroll = contemplative descent. The user's own tempo is honored — not forced into a fixed animation speed.

```
ScrollTrigger.create({
  trigger: ".scene-cave",
  pin: true,
  scrub: true,         // ties animation to scroll position
  start: "top top",
  end: "+=150%",       // scene lasts 1.5x viewport height of scrolling
});
```

The `scrub: true` is essential — it makes the animation directly tied to scroll position. Not triggered by scroll. Controlled by scroll. The user is the animator.

---

## PART FOUR — THE JOURNEY ARCHITECTURE

### 4.1 The Page as a Single Continuous Space

The page is not 8 sections. It is one continuous space — a vertical shaft from surface to ground. The scenes are regions within this space, not separate containers.

**The visual continuity:**
- The background gradient is continuous from top (#0a0a14) to bottom (#1a1208). No hard breaks.
- The pixel character is present throughout — their position changes but they are never absent. The viewer always knows where their avatar is.
- Each scene transition is a dissolve or drift, not a cut. The maze doesn't end and the water begins — the maze walls dissolve into waves. The water doesn't end and the cave begins — the water drains downward and rock walls emerge.
- The descent meter (optional — a thin vertical line on the edge showing progress) is always visible. It shows how deep you are. Not "how far through the page" — how deep into the layers.

### 4.2 Scene-by-Scene Design Specification

**SCENE 01 — THE SURFACE**

*The world you built. Cold. Achieved. Empty.*

```
VIEWPORT LAYOUT:
╔══════════════════════════════════════════╗
║                                          ║
║   [pixel screens floating, glowing cold] ║
║                                          ║
║            city skyline silhouette        ║
║   ████ ██ ████████ ██ ████ ██████        ║
║   ████ ██ ████████ ██ ████ ██████        ║
║   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ║
║                 ■ ← character walks      ║
║   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔      ║
║                                          ║
║   "You built everything they said        ║
║    would make you whole."                ║
║                                          ║
╚══════════════════════════════════════════╝
```

- Character walks slowly from left to right as scroll progresses
- Screens float above — emails, notifications, achievements
- City skyline: pixel buildings with lit windows. Detailed. The world is richly rendered.
- Character is SMALL in this scene. Dwarfed by the city. By the screens. By the achievement architecture.
- Text appears at bottom. Serif. Large. Slow word-by-word.
- Color: entirely cold. Blue-black, slate, grey. No warm tones whatsoever.
- Light: screens provide the only light. Cold. Scattered. Multiple sources = fractured attention.

**Scroll behavior:** Character walks. Screens drift. At the end of the scroll range, the character stops. Looks down. Pause.

---

**SCENE 02 — THE CRACK**

*Something breaks. The first warm light.*

```
VIEWPORT LAYOUT:
╔══════════════════════════════════════════╗
║         (city dissolving upward)         ║
║                                          ║
║                                          ║
║              ░ character ░               ║
║              ▓▓▓▓▓▓▓▓▓▓▓▓               ║
║              ║   crack    ║              ║
║              ║  ═══╗      ║              ║
║              ║     ╚══╗   ║              ║
║              ║   warm  ║  ║              ║
║              ║   light ║  ║              ║
║              ▼   from  ▼  ▼              ║
║                 below                    ║
║                                          ║
║      "Why doesn't it feel like enough?"  ║
║                                          ║
╚══════════════════════════════════════════╝
```

- The ground beneath the character cracks
- WARM light bleeds up through the crack — first warm color on the entire page
- The crack uses dithering at its edges — warm pixels mixing with cold
- Character stands at the edge, then tips forward, falls
- The falling animation: character rotates slowly, arms outstretched. Not panicked. Surrendering.
- City skyline above gets smaller as the character descends
- Text: "Why doesn't it feel like enough?" — the question that starts the descent
- The crack light uses radial gradient from below the pixel layer — smooth gradient BEHIND sharp pixel edges
- This scene is the PIVOT. Everything before was cold. Everything after is the journey into warmth.

---

**SCENE 03 — THE MIND MAZE**

*The place you've been stuck. Dark. No light source.*

```
VIEWPORT LAYOUT:
╔══════════════════════════════════════════╗
║ ┌─────┐     ┌────────────┐     ┌─────┐ ║
║ │ why │     │ understand │     │ fix │ ║
║ └──┐  └─────┘    ┌───────┘  ┌──┘     │ ║
║    │              │          │         │ ║
║ ┌──┘   ■ char    └──────┐   └─────┐   │ ║
║ │                        │         │   │ ║
║ └────┐   ┌──────────┐   └──┐      │   │ ║
║      │   │ read more│      │      │   │ ║
║ ┌────┘   └──────────┘      └──────┘   │ ║
║ │                                      │ ║
║ └──────────────────────────────────────┘ ║
║                                          ║
║  "You can explain every pattern.         ║
║   You can't stop a single one."          ║
║                                          ║
╚══════════════════════════════════════════╝
```

- A maze built from pixel blocks. Inside the walls: words. "why" "understand" "analyse" "fix it" "read more" "think harder" — the vocabulary of Vijnanamaya stuck on repeat.
- **CRUCIAL: This scene has NO light source.** The maze is visible only through low-contrast differentiation. This is design-as-meaning: the intellectual layer has no warmth, no light of its own. It's all structure, no illumination.
- Character navigates the maze — moving through it as the user scrolls. Dead ends. Turns. But always progressing downward.
- The maze walls are sharp pixel blocks. Rigid. Controlled. The tightest grid on the entire page.
- Books rendered as tiny pixel sprites on shelves within the maze. Therapy couches. Self-help posters. All rendered with care — this world is not dismissed. It's just insufficient.
- At the bottom of the maze: the floor gives way. The walls dissolve into the next scene.

---

**SCENE 04 — THE WATER**

*Where thinking stops. The emotional body.*

```
VIEWPORT LAYOUT:
╔══════════════════════════════════════════╗
║     (maze fragments dissolving)          ║
║ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ║
║ ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ ║
║ ~~~~~~~~   ■ character   ~~~~~~~~~~~~~~~ ║
║ ≈≈≈≈≈≈≈≈≈≈ sinking ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ ║
║ ~~~~~~~~~ gently ~~~~~~~~~~~~~~~~~~~~~~~║
║ ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ ║
║ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ║
║                                          ║
║  "You don't think your way through       ║
║   this layer. You feel it."              ║
║                                          ║
╚══════════════════════════════════════════╝
```

- Maze walls dissolve into pixel water. The rigid structure becomes fluid.
- Character sinks through water. Not drowning — being held. The body position is relaxed.
- Pixel rain falls. Each raindrop is 1x4 pixels. Sparse. Gentle.
- Water uses dithering between two blue tones — the surface is neither fully one color nor another. The liminal space between thinking and feeling.
- Light: diffused. No single source. This is the transition layer — the old light (screens) is gone, the new light (inner child) hasn't been found yet. The viewer is between sources. Between identities.
- The water darkens as you scroll deeper. At the bottom: the water drains into rock. Cave ceiling appears.
- Text placement: text FLOATS in the water. Same drift as the water elements. Part of the scene, not above it.

---

**SCENE 05 — THE CAVE**

*The deepest point. Where the wound lives. Where the inner child waits.*

```
VIEWPORT LAYOUT:
╔══════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓▓▓     cave walls      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║ ▓▓                                  ▓▓▓ ║
║ ▓                                    ▓▓ ║
║ ▓       ■ character                   ▓ ║
║ ▓        approaching                  ▓ ║
║ ▓                                     ▓ ║
║ ▓            ☼ inner child ☼          ▓ ║
║ ▓▓       (glowing, warm, small)      ▓▓ ║
║ ▓▓▓    ╔═══════════════════╗       ▓▓▓▓ ║
║ ▓▓▓▓▓▓ ║  radial warmth   ║ ▓▓▓▓▓▓▓▓▓▓ ║
║ ▓▓▓▓▓▓ ╚═══════════════════╝ ▓▓▓▓▓▓▓▓▓▓ ║
║                                          ║
║  "Before your first word,                ║
║   your body already knew."               ║
║                                          ║
╚══════════════════════════════════════════╝
```

- **THE EMOTIONAL CORE OF THE ENTIRE PAGE.**
- Cave walls rendered in detailed pixel art. Stalactites. Texture. Geological layers visible in the rock — literal "inherited architecture" in the stone.
- The cave narrows as the character descends. Intimacy.
- At the center: the inner child. Smaller pixel figure. Sitting. Glowing with warm light.
- **The inner child is the ONLY light source in this scene.** Everything is lit by this tiny figure. The message: the warmth you've been looking for was inside you — was inside the wound — the entire time.
- As the character approaches the child: the glow expands. Warmth spreads outward.
- Dithering at the light boundary — warm pixels mixing with cave darkness. The wound meeting the witness.
- Text arrives very slowly here. Each word given twice the time of other scenes. This is not information. It is recognition.

---

**SCENE 06 — THE BODY**

*The merging. Adult and child become one.*

- The two figures overlap. The child's warm glow fills the adult figure pixel by pixel.
- Roots grow downward from the merged figure. Pixel roots — detailed, branching, reaching into earth.
- The environment shifts from cave rock to earth/soil. Warmer. Richer. Browns and ambers.
- The body silhouette (the merged figure) now has warm light inside it. Visible through the pixel figure.
- "Your body was never the problem. It was always the answer."
- The grid is fully dissolved here. Elements placed organically. Nothing is aligned. Everything is settled.

---

**SCENE 07 — THE GROUND**

*Stillness. Warmth. Arrival.*

- Vast warm space. Amber-dark gradient. Minimal elements.
- The merged character stands centered. Glowing softly. Roots visible below.
- The sky above (all the layers they descended through) is visible as a faint column of gradually cooling colors stretching upward — the entire journey visible in retrospect.
- Very few pixels. Mostly gradient. The pixel world has almost fully dissolved into continuous light.
- "Not something you achieve. Something you remember."
- Maximum whitespace. Maximum breath. Maximum stillness.

---

**SCENE 08 — THE MIRROR**

*The invitation.*

- The character looks down at a pool of light. Their reflection is visible — same figure, but brighter. Clearer.
- The pool is a horizontal ellipse of warm light. Dithered edges.
- Above the pool: "The Mirror sees what you've been carrying — and tells you whose it actually is."
- Below: a single button. "Enter the Mirror →" — rendered as a warm rectangle with pixel-font text. The only interactive element on the entire page.
- Below the button, very small: "Three questions. Twenty minutes. Free."
- **The entire page has led to this single button.** Everything was designed to make this moment feel like an arrival, not a sell.

---

## PART FIVE — RESPONSIVE PHILOSOPHY

### 5.1 Mobile IS the Primary Canvas

90% of the target audience encounters this on a phone. The phone in the dark at 2am. The design is built for this.

- Portrait orientation. The vertical descent is native to mobile scroll.
- Thumb-friendly: the only interactive element (the Mirror button) is placed at natural thumb reach.
- The pixel art scales beautifully to mobile — pixel art IS low-resolution. It looks native on a phone screen.
- Text sizes are generous on mobile. Fewer words per line = more weight per word.
- The scroll journey is actually BETTER on mobile — the intimate screen, the dark room, the single-hand scroll. The design embraces this.

### 5.2 Desktop as Expanded Canvas

On desktop, the same journey plays with more horizontal space:
- The pixel environments are wider. More background detail visible.
- The character is still centered but the world around them is richer.
- Text can afford slightly more breathing room.
- The descent meter (thin vertical line showing depth) is more visible on desktop.

### 5.3 Performance as Respect

The page must load instantly and scroll at 60fps. This is non-negotiable.

- Pixel art via CSS (box-shadow, gradients) = zero image requests
- GSAP + ScrollTrigger from CDN = one JS file
- Google Fonts: two weights max
- No video. No WebGL. No heavy assets.
- Total page weight target: under 200KB

Speed is not a technical requirement. It is a design value. A slow-loading page about consciousness is a contradiction. The medium must embody the message.

---

## PART SIX — WHAT THIS IS NOT

- Not a portfolio piece showing off animation skills
- Not a "creative" landing page that prioritizes cleverness over truth
- Not a wellness brand with pixel decorations
- Not an art project that forgets the goal (Mirror entry)
- Not a wall of text with pretty backgrounds

**This is a single continuous space that takes a person from "I feel something I can't name" to "I'm ready to look at it." In 15-25 seconds of scrolling. Through a visual language that speaks to the part of them that existed before words — the inner child, the pixel generation, the 2am revelation.**

The design is the first Mirror. Before the diagnostic. Before the questions. The page itself reflects something back.

---

*Orbisojas Design System — June 2026*
*Pre-Build Reference — Internal Use*
*To be updated as the build reveals what the theory cannot yet specify.*
