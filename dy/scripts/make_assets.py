import os

os.makedirs('media', exist_ok=True)

# Generate media/logo.svg
logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 130" width="540" height="130">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="25%" stop-color="#FFD54F" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="75%" stop-color="#AA7C11" />
      <stop offset="100%" stop-color="#8C6207" />
    </linearGradient>
    <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BF953F" />
      <stop offset="25%" stop-color="#FCF6BA" />
      <stop offset="50%" stop-color="#B38728" />
      <stop offset="75%" stop-color="#FBF5B7" />
      <stop offset="100%" stop-color="#AA771C" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Crown & Monogram Emblem -->
  <g transform="translate(18, 14)">
    <!-- Ornate Outer Shield -->
    <path d="M50 0 C75 0 95 18 95 44 C95 75 50 102 50 102 C50 102 5 75 5 44 C5 18 25 0 50 0 Z" fill="#1B0A08" stroke="url(#goldGrad)" stroke-width="2.5"/>
    <path d="M50 6 C71 6 89 21 89 44 C89 71 50 94 50 94 C50 94 11 71 11 44 C11 21 29 6 50 6 Z" fill="none" stroke="url(#crownGrad)" stroke-width="1" stroke-dasharray="3,2"/>
    
    <!-- Royal Crown -->
    <path d="M32 30 L38 42 L50 26 L62 42 L68 30 L74 46 L26 46 Z" fill="url(#crownGrad)" filter="url(#glow)"/>
    <circle cx="32" cy="28" r="2.5" fill="#FFF9C4"/>
    <circle cx="50" cy="24" r="3.5" fill="#FFF9C4"/>
    <circle cx="68" cy="28" r="2.5" fill="#FFF9C4"/>

    <!-- Diamond Accent -->
    <polygon points="50,50 55,57 50,64 45,57" fill="#FFFFFF" opacity="0.9"/>
    
    <!-- Intertwined Monogram RJ -->
    <text x="50" y="79" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="22" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1">RJ</text>
  </g>

  <!-- Brand Typography -->
  <g transform="translate(136, 22)">
    <!-- Hindi Subtitle -->
    <text x="2" y="20" font-family="'Yatra One', 'Noto Serif Devanagari', Georgia, serif" font-size="14" font-weight="600" fill="#E6C665" letter-spacing="3">राजा ज्वेलर्स • जबलपुर</text>
    
    <!-- Main Brand Name -->
    <text x="0" y="58" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="34" font-weight="800" fill="url(#goldGrad)" letter-spacing="4">RAJA JEWELLERS</text>
    
    <!-- Tagline & Established -->
    <text x="2" y="79" font-family="'Montserrat', -apple-system, sans-serif" font-size="10.5" font-weight="600" fill="#F3E5AB" letter-spacing="3">PURITY • HERITAGE • TRUST</text>
    <text x="2" y="96" font-family="'Montserrat', -apple-system, sans-serif" font-size="9" font-weight="500" fill="#BAAF9E" letter-spacing="1.5">ESTD. 2008 • GWARIGHAT, JABALPUR</text>
  </g>
</svg>"""

with open('media/logo.svg', 'w', encoding='utf-8') as f:
    f.write(logo_svg)

# BIS Hallmark Official Style SVG
bis_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120">
  <defs>
    <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFDF73" />
      <stop offset="100%" stop-color="#B58A2B" />
    </linearGradient>
  </defs>
  <rect width="240" height="120" rx="12" fill="#221008" stroke="url(#gGold)" stroke-width="2"/>
  <!-- BIS Triangular Logo Symbol -->
  <g transform="translate(20, 20)">
    <polygon points="38,8 70,68 6,68" fill="none" stroke="url(#gGold)" stroke-width="4" stroke-linejoin="round"/>
    <polygon points="38,28 56,62 20,62" fill="url(#gGold)"/>
    <circle cx="38" cy="48" r="4" fill="#221008"/>
    <text x="38" y="80" font-family="'Montserrat', sans-serif" font-size="8.5" font-weight="700" fill="#FFF8E1" text-anchor="middle">BIS CERTIFIED</text>
  </g>
  <g transform="translate(108, 26)">
    <text x="0" y="20" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" fill="#FFE082" letter-spacing="1">100% HALLMARKED</text>
    <text x="0" y="44" font-family="'Playfair Display', serif" font-size="22" font-weight="800" fill="#FFFFFF">916 <tspan font-size="13" font-weight="normal" fill="#D4AF37">| 22KT</tspan></text>
    <text x="0" y="65" font-family="'Montserrat', sans-serif" font-size="9" fill="#B0A89C">HUID GOVT. VERIFIED</text>
  </g>
</svg>"""

with open('media/bis-hallmark.svg', 'w', encoding='utf-8') as f:
    f.write(bis_svg)

# Favicon SVG
fav_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFDF73" />
      <stop offset="100%" stop-color="#A67C1E" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#2A0808" stroke="url(#fg)" stroke-width="2.5"/>
  <path d="M20 22 L24 30 L32 18 L40 30 L44 22 L48 34 L16 34 Z" fill="url(#fg)"/>
  <circle cx="32" cy="17" r="2.5" fill="#FFF9C4"/>
  <text x="32" y="52" font-family="'Cinzel', Georgia, serif" font-size="18" font-weight="900" fill="url(#fg)" text-anchor="middle">RJ</text>
</svg>"""

with open('media/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(fav_svg)

# Certified Seal SVG
seal_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="sGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FCE082" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#8E6308" />
    </linearGradient>
  </defs>
  <circle cx="80" cy="80" r="74" fill="#200B0A" stroke="url(#sGold)" stroke-width="4"/>
  <circle cx="80" cy="80" r="66" fill="none" stroke="url(#sGold)" stroke-width="1.5" stroke-dasharray="4,3"/>
  <path d="M80 32 L87 46 L102 46 L90 56 L94 70 L80 61 L66 70 L70 56 L58 46 L73 46 Z" fill="url(#sGold)"/>
  <text x="80" y="92" font-family="'Montserrat', sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">100% GENUINE</text>
  <text x="80" y="108" font-family="'Montserrat', sans-serif" font-size="9" font-weight="600" fill="#E5C158" text-anchor="middle" letter-spacing="2">NATURAL GEMS</text>
  <text x="80" y="122" font-family="'Montserrat', sans-serif" font-size="8" fill="#BFA181" text-anchor="middle">LAB TESTED CERTIFIED</text>
</svg>"""

with open('media/certified-seal.svg', 'w', encoding='utf-8') as f:
    f.write(seal_svg)

print("SVG assets created successfully!")
