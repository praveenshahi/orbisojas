/* ============================================================
   ORBISOJAS — Pixel Art Scene Renderer
   Draws low-res pixel art on canvas, scaled up with pixelated rendering
   ============================================================ */

const Scenes = {

  PX: 4, // each "pixel" is 4x4 real pixels for clarity

  init() {
    this.drawBoy();
    this.drawSystem();
    this.drawTruth();
    this.drawJourney();
    window.addEventListener('resize', () => {
      this.drawBoy();
      this.drawSystem();
      this.drawTruth();
      this.drawJourney();
    });
  },

  setup(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
  },

  // Utility: draw a filled pixel-art rectangle
  rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  },

  // Utility: draw a single "pixel" block
  px(ctx, x, y, color, size) {
    const s = size || this.PX;
    ctx.fillStyle = color;
    ctx.fillRect(x * s, y * s, s, s);
  },

  /* ----------------------------------------------------------
     Scene 01: THE BOY — Room at 2am, city through window
  ---------------------------------------------------------- */
  drawBoy() {
    const ctx = this.setup('canvas-boy');
    if (!ctx) return;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    // Sky gradient (deep night)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, '#060818');
    skyGrad.addColorStop(0.4, '#0a0e24');
    skyGrad.addColorStop(1, '#0e1230');
    this.rect(ctx, 0, 0, W, H, '#060818');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    // Stars
    for (let i = 0; i < 60; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H * 0.5;
      const brightness = Math.random() * 0.4 + 0.1;
      ctx.fillStyle = `rgba(200, 200, 255, ${brightness})`;
      ctx.fillRect(sx, sy, 2, 2);
    }

    // City skyline (right half)
    const cityStart = W * 0.45;
    const cityColors = ['#0e1228', '#121838', '#0c1020', '#141a3a', '#101630'];
    const buildings = [
      { x: 0.45, w: 0.06, h: 0.35 },
      { x: 0.50, w: 0.04, h: 0.45 },
      { x: 0.53, w: 0.07, h: 0.30 },
      { x: 0.59, w: 0.03, h: 0.50 },
      { x: 0.61, w: 0.06, h: 0.38 },
      { x: 0.66, w: 0.04, h: 0.55 },
      { x: 0.69, w: 0.08, h: 0.32 },
      { x: 0.76, w: 0.03, h: 0.42 },
      { x: 0.78, w: 0.06, h: 0.48 },
      { x: 0.83, w: 0.05, h: 0.35 },
      { x: 0.87, w: 0.04, h: 0.52 },
      { x: 0.90, w: 0.07, h: 0.40 },
    ];

    buildings.forEach((b, i) => {
      const bx = b.x * W;
      const bw = b.w * W;
      const bh = b.h * H;
      const by = H * 0.75 - bh;
      this.rect(ctx, bx, by, bw, bh, cityColors[i % cityColors.length]);

      // Windows
      for (let wy = by + 8; wy < by + bh - 8; wy += 12) {
        for (let wx = bx + 4; wx < bx + bw - 4; wx += 10) {
          if (Math.random() > 0.4) {
            const windowColor = Math.random() > 0.7 ? '#2a3a6a' : '#1a2244';
            ctx.fillStyle = windowColor;
            ctx.fillRect(wx, wy, 4, 6);
          }
        }
      }
    });

    // Ground plane
    this.rect(ctx, 0, H * 0.75, W, H * 0.25, '#0a0c1e');

    // Room interior glow (right side) — warm ambient
    const roomGlow = ctx.createRadialGradient(W * 0.72, H * 0.55, 20, W * 0.72, H * 0.55, W * 0.3);
    roomGlow.addColorStop(0, 'rgba(60, 40, 20, 0.25)');
    roomGlow.addColorStop(0.5, 'rgba(40, 25, 10, 0.15)');
    roomGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = roomGlow;
    ctx.fillRect(W * 0.4, H * 0.1, W * 0.6, H * 0.8);

    // Desk lamp glow
    const lampGlow = ctx.createRadialGradient(W * 0.82, H * 0.42, 5, W * 0.82, H * 0.42, 80);
    lampGlow.addColorStop(0, 'rgba(192, 138, 44, 0.3)');
    lampGlow.addColorStop(0.5, 'rgba(192, 138, 44, 0.08)');
    lampGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = lampGlow;
    ctx.fillRect(W * 0.6, H * 0.2, W * 0.4, H * 0.5);

    // Laptop screen glow
    const screenGlow = ctx.createRadialGradient(W * 0.68, H * 0.52, 5, W * 0.68, H * 0.52, 60);
    screenGlow.addColorStop(0, 'rgba(100, 140, 220, 0.2)');
    screenGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = screenGlow;
    ctx.fillRect(W * 0.55, H * 0.35, W * 0.3, H * 0.3);

    // Desk surface
    this.rect(ctx, W * 0.52, H * 0.58, W * 0.42, 4, '#1a1e3a');

    // Laptop (simple pixel shape)
    ctx.fillStyle = '#1a2040';
    ctx.fillRect(W * 0.62, H * 0.44, 50, 35); // screen
    ctx.fillStyle = '#2a3060';
    ctx.fillRect(W * 0.63, H * 0.45, 48, 33); // screen inner
    ctx.fillStyle = '#1a1e38';
    ctx.fillRect(W * 0.60, H * 0.58, 56, 4); // base

    // Heart on laptop screen
    ctx.fillStyle = '#c44858';
    const hx = W * 0.67 + 18;
    const hy = H * 0.45 + 14;
    ctx.fillRect(hx - 4, hy, 4, 4);
    ctx.fillRect(hx + 4, hy, 4, 4);
    ctx.fillRect(hx - 8, hy + 4, 4, 4);
    ctx.fillRect(hx + 8, hy + 4, 4, 4);
    ctx.fillRect(hx - 8, hy + 8, 20, 4);
    ctx.fillRect(hx - 4, hy + 12, 12, 4);
    ctx.fillRect(hx, hy + 16, 4, 4);

    // Boy silhouette (sitting at desk, back to viewer)
    const bx = W * 0.65;
    const by = H * 0.40;
    ctx.fillStyle = '#1a1a2a';
    // Head
    ctx.fillRect(bx, by, 12, 12);
    // Hair
    ctx.fillStyle = '#2a2040';
    ctx.fillRect(bx - 2, by - 2, 16, 6);
    ctx.fillRect(bx - 2, by, 4, 10);
    ctx.fillRect(bx + 10, by, 4, 8);
    // Body
    ctx.fillStyle = '#1e2244';
    ctx.fillRect(bx - 4, by + 12, 20, 24);
    // Arms on desk
    ctx.fillStyle = '#d4c4a0';
    ctx.fillRect(bx - 8, by + 22, 8, 4);
    ctx.fillRect(bx + 12, by + 22, 8, 4);

    // Desk lamp
    ctx.fillStyle = '#3a3a4a';
    ctx.fillRect(W * 0.82, H * 0.42, 4, 20); // pole
    ctx.fillStyle = '#c08a2c';
    ctx.fillRect(W * 0.78, H * 0.40, 12, 4); // shade
    ctx.fillStyle = '#e8c44a';
    ctx.fillRect(W * 0.80, H * 0.44, 8, 2); // bulb
  },

  /* ----------------------------------------------------------
     Scene 02: THE SYSTEM — Crowd, figure standing apart
  ---------------------------------------------------------- */
  drawSystem() {
    const ctx = this.setup('canvas-system');
    if (!ctx) return;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    // Dark gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#08081a');
    grad.addColorStop(0.6, '#0c0e22');
    grad.addColorStop(1, '#0a0c1e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Grid lines (the system)
    ctx.strokeStyle = 'rgba(30, 40, 80, 0.3)';
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // Crowd silhouettes (right side, background)
    const crowdY = H * 0.55;
    for (let i = 0; i < 30; i++) {
      const cx = W * 0.4 + Math.random() * W * 0.55;
      const cy = crowdY + Math.random() * H * 0.2;
      const ch = 20 + Math.random() * 15;
      const shade = Math.floor(Math.random() * 20 + 10);
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade + 15})`;
      // Head
      ctx.fillRect(cx, cy - ch, 6, 6);
      // Body
      ctx.fillRect(cx - 1, cy - ch + 6, 8, ch - 6);
    }

    // Main figure (stands apart, slightly left of center crowd)
    const fx = W * 0.52;
    const fy = H * 0.50;
    // Glow behind figure
    const figGlow = ctx.createRadialGradient(fx + 6, fy - 10, 5, fx + 6, fy - 10, 50);
    figGlow.addColorStop(0, 'rgba(192, 138, 44, 0.08)');
    figGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = figGlow;
    ctx.fillRect(fx - 50, fy - 60, 120, 100);

    // Figure
    ctx.fillStyle = '#d4c4a0';
    ctx.fillRect(fx, fy - 28, 12, 10); // head
    ctx.fillStyle = '#1e2244';
    ctx.fillRect(fx - 2, fy - 18, 16, 22); // body
    ctx.fillStyle = '#141832';
    ctx.fillRect(fx, fy + 4, 6, 14); // left leg
    ctx.fillRect(fx + 6, fy + 4, 6, 14); // right leg

    // Notification particles floating
    for (let i = 0; i < 15; i++) {
      const nx = W * 0.35 + Math.random() * W * 0.5;
      const ny = Math.random() * H * 0.5;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '196,72,88' : '100,120,200'}, ${Math.random() * 0.2 + 0.05})`;
      ctx.fillRect(nx, ny, 3, 3);
    }
  },

  /* ----------------------------------------------------------
     Scene 03: THE TRUTH — Sunset with figure, emotional weight
  ---------------------------------------------------------- */
  drawTruth() {
    const ctx = this.setup('canvas-truth');
    if (!ctx) return;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    // Sunset sky gradient (right half)
    const skyGrad = ctx.createLinearGradient(W * 0.5, 0, W * 0.5, H);
    skyGrad.addColorStop(0, '#0a0c1e');
    skyGrad.addColorStop(0.3, '#1a1040');
    skyGrad.addColorStop(0.5, '#3a2050');
    skyGrad.addColorStop(0.65, '#7a3a40');
    skyGrad.addColorStop(0.8, '#c08a2c');
    skyGrad.addColorStop(1, '#1a1208');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    // Left side darker overlay (for text readability)
    const leftDark = ctx.createLinearGradient(0, 0, W * 0.55, 0);
    leftDark.addColorStop(0, 'rgba(11, 12, 30, 0.95)');
    leftDark.addColorStop(0.6, 'rgba(11, 12, 30, 0.85)');
    leftDark.addColorStop(1, 'rgba(11, 12, 30, 0.3)');
    ctx.fillStyle = leftDark;
    ctx.fillRect(0, 0, W * 0.6, H);

    // Mountains/hills
    ctx.fillStyle = '#1a1030';
    ctx.beginPath();
    ctx.moveTo(W * 0.3, H * 0.7);
    ctx.lineTo(W * 0.5, H * 0.45);
    ctx.lineTo(W * 0.65, H * 0.55);
    ctx.lineTo(W * 0.8, H * 0.40);
    ctx.lineTo(W, H * 0.5);
    ctx.lineTo(W, H);
    ctx.lineTo(W * 0.3, H);
    ctx.fill();

    ctx.fillStyle = '#121028';
    ctx.beginPath();
    ctx.moveTo(W * 0.4, H * 0.75);
    ctx.lineTo(W * 0.6, H * 0.55);
    ctx.lineTo(W * 0.75, H * 0.60);
    ctx.lineTo(W * 0.9, H * 0.50);
    ctx.lineTo(W, H * 0.55);
    ctx.lineTo(W, H);
    ctx.lineTo(W * 0.4, H);
    ctx.fill();

    // Ground
    this.rect(ctx, 0, H * 0.78, W, H * 0.22, '#0c0a18');

    // Figure looking at sunset (center-right)
    const fx = W * 0.62;
    const fy = H * 0.62;
    // Silhouette
    ctx.fillStyle = '#0a0812';
    ctx.fillRect(fx, fy, 10, 10); // head
    ctx.fillRect(fx - 2, fy + 10, 14, 20); // body
    ctx.fillRect(fx, fy + 30, 5, 14); // left leg
    ctx.fillRect(fx + 5, fy + 30, 5, 14); // right leg
    // Hair silhouette
    ctx.fillRect(fx - 2, fy - 4, 14, 6);
    ctx.fillRect(fx + 8, fy - 2, 6, 8);

    // Sun glow on horizon
    const sunGlow = ctx.createRadialGradient(W * 0.75, H * 0.65, 10, W * 0.75, H * 0.65, 120);
    sunGlow.addColorStop(0, 'rgba(232, 180, 80, 0.15)');
    sunGlow.addColorStop(0.5, 'rgba(196, 100, 50, 0.05)');
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(W * 0.5, H * 0.3, W * 0.5, H * 0.5);
  },

  /* ----------------------------------------------------------
     Scene 04: THE JOURNEY — Landscape path, dawn gradient
  ---------------------------------------------------------- */
  drawJourney() {
    const ctx = this.setup('canvas-journey');
    if (!ctx) return;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    // Dawn sky gradient (left dark, right bright)
    const skyGrad = ctx.createLinearGradient(0, 0, W, 0);
    skyGrad.addColorStop(0, '#0a0c1e');
    skyGrad.addColorStop(0.3, '#1a1040');
    skyGrad.addColorStop(0.5, '#2a2050');
    skyGrad.addColorStop(0.7, '#5a3050');
    skyGrad.addColorStop(0.85, '#8a4a40');
    skyGrad.addColorStop(1, '#c08a2c');

    const vertGrad = ctx.createLinearGradient(0, 0, 0, H);
    vertGrad.addColorStop(0, '#0a0c1e');
    vertGrad.addColorStop(0.5, '#141832');
    vertGrad.addColorStop(1, '#0a0c1e');

    ctx.fillStyle = vertGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.6);
    ctx.globalAlpha = 1;

    // Stars (left side only, darker)
    for (let i = 0; i < 30; i++) {
      const sx = Math.random() * W * 0.4;
      const sy = Math.random() * H * 0.4;
      ctx.fillStyle = `rgba(200, 200, 255, ${Math.random() * 0.3 + 0.05})`;
      ctx.fillRect(sx, sy, 2, 2);
    }

    // Mountains background
    ctx.fillStyle = '#1a1030';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.55);
    ctx.lineTo(W * 0.15, H * 0.35);
    ctx.lineTo(W * 0.3, H * 0.45);
    ctx.lineTo(W * 0.45, H * 0.30);
    ctx.lineTo(W * 0.6, H * 0.40);
    ctx.lineTo(W * 0.75, H * 0.32);
    ctx.lineTo(W * 0.9, H * 0.38);
    ctx.lineTo(W, H * 0.42);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Foreground hills
    ctx.fillStyle = '#121028';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.65);
    ctx.lineTo(W * 0.2, H * 0.55);
    ctx.lineTo(W * 0.4, H * 0.60);
    ctx.lineTo(W * 0.6, H * 0.52);
    ctx.lineTo(W * 0.8, H * 0.58);
    ctx.lineTo(W, H * 0.54);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();

    // Ground
    this.rect(ctx, 0, H * 0.68, W, H * 0.32, '#0c0a18');

    // Path line (warm)
    ctx.strokeStyle = 'rgba(192, 138, 44, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.05, H * 0.72);
    ctx.lineTo(W * 0.95, H * 0.72);
    ctx.stroke();

    // Trees silhouettes
    const treePositions = [0.1, 0.25, 0.42, 0.58, 0.72, 0.88];
    treePositions.forEach(tx => {
      const treex = tx * W;
      const treey = H * 0.55 + Math.random() * H * 0.08;
      ctx.fillStyle = '#0e0c1a';
      // Trunk
      ctx.fillRect(treex, treey, 4, 16);
      // Canopy
      ctx.fillRect(treex - 6, treey - 8, 16, 10);
      ctx.fillRect(treex - 4, treey - 14, 12, 8);
      ctx.fillRect(treex - 2, treey - 18, 8, 6);
    });

    // Beacon glow (far right — the sovereign destination)
    const beaconGlow = ctx.createRadialGradient(W * 0.92, H * 0.45, 5, W * 0.92, H * 0.45, 80);
    beaconGlow.addColorStop(0, 'rgba(196, 72, 88, 0.25)');
    beaconGlow.addColorStop(0.5, 'rgba(196, 72, 88, 0.05)');
    beaconGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = beaconGlow;
    ctx.fillRect(W * 0.7, H * 0.2, W * 0.3, H * 0.5);

    // Top dark overlay for text readability
    const topDark = ctx.createLinearGradient(0, 0, 0, H * 0.4);
    topDark.addColorStop(0, 'rgba(11, 12, 30, 0.9)');
    topDark.addColorStop(1, 'transparent');
    ctx.fillStyle = topDark;
    ctx.fillRect(0, 0, W * 0.4, H * 0.5);
  }
};
