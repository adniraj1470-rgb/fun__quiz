// ═══════════════════════════════════════════════
//  FunQuiz Icon Generator — Pure JavaScript Canvas
//  Run this in browser console OR Node.js (with canvas pkg)
//  It generates both 192x192 and 512x512 PNG icons
// ═══════════════════════════════════════════════

function generateFunQuizIcon(size) {
  const canvas = document.createElement('canvas');
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const s = size;

  // ── 1. Rounded rectangle background ──
  const radius = s / 5;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(s - radius, 0);
  ctx.quadraticCurveTo(s, 0, s, radius);
  ctx.lineTo(s, s - radius);
  ctx.quadraticCurveTo(s, s, s - radius, s);
  ctx.lineTo(radius, s);
  ctx.quadraticCurveTo(0, s, 0, s - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fillStyle = '#1a1a2e';
  ctx.fill();

  // ── 2. Gradient circle (orange → violet) ──
  const cx = s / 2, cy = s / 2;
  const grad = ctx.createRadialGradient(cx, cy * 0.85, 0, cx, cy, s * 0.42);
  grad.addColorStop(0,   '#FFD700');
  grad.addColorStop(0.4, '#FF6B35');
  grad.addColorStop(1,   '#6C63FF');
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.40, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // ── 3. Inner glow ring ──
  const glow = ctx.createRadialGradient(cx, cy, s * 0.28, cx, cy, s * 0.44);
  glow.addColorStop(0,   'rgba(255,255,255,0)');
  glow.addColorStop(0.7, 'rgba(255,255,255,0.08)');
  glow.addColorStop(1,   'rgba(255,255,255,0.22)');
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.44, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // ── 4. Lightning bolt ⚡ (polygon) ──
  ctx.beginPath();
  ctx.moveTo(s * 0.56, s * 0.07);   // top-right
  ctx.lineTo(s * 0.27, s * 0.53);   // mid-left
  ctx.lineTo(s * 0.47, s * 0.53);   // mid-center
  ctx.lineTo(s * 0.41, s * 0.93);   // bottom
  ctx.lineTo(s * 0.73, s * 0.44);   // mid-right
  ctx.lineTo(s * 0.52, s * 0.44);   // mid-center-top
  ctx.closePath();

  // White fill with slight shadow
  ctx.shadowColor   = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur    = s * 0.04;
  ctx.shadowOffsetX = s * 0.01;
  ctx.shadowOffsetY = s * 0.02;
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Subtle bolt outline
  ctx.strokeStyle = 'rgba(255,220,100,0.6)';
  ctx.lineWidth   = s * 0.018;
  ctx.lineJoin    = 'round';
  ctx.stroke();

  return canvas;
}

// ── Auto-generate & inject into manifest link ──
function injectPWAIcons() {
  const sizes = [192, 512];
  sizes.forEach(size => {
    const canvas = generateFunQuizIcon(size);
    const dataURL = canvas.toDataURL('image/png');

    // Save as downloadable link (optional)
    const a = document.createElement('a');
    a.href     = dataURL;
    a.download = `icon-${size}.png`;
    // a.click(); // uncomment to auto-download

    // Use as apple-touch-icon
    if (size === 192) {
      let link = document.querySelector("link[rel='apple-touch-icon']");
      if (!link) { link = document.createElement('link'); link.rel = 'apple-touch-icon'; document.head.appendChild(link); }
      link.href = dataURL;
    }

    console.log(`✅ Icon ${size}x${size} generated`);
  });
}

// Run on load
injectPWAIcons();
