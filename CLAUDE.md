# AJ Auto Services — Project Context

## Project
Website for **A&J Auto Services** — a local auto repair and custom build shop.

## Files
```
/Users/hammadchaudhry/Documents/aj auto/
├── CLAUDE.md                  ← this file
├── website/
│   ├── index.html             ← single-page website
│   ├── styles.css             ← all styles
│   └── logo.png               ← original logo (copied from ~/Downloads/image.png)
└── template_preview/          ← extracted reference from Business Agency Website (Community).zip
```

## Color Palette (matches logo)
| Variable     | Hex       | Usage                          |
|--------------|-----------|--------------------------------|
| `--black`    | `#181818` | Backgrounds, navbar, footer    |
| `--black-mid`| `#222222` | Cards on dark sections         |
| `--black-lt` | `#2e2e2e` | Borders on dark sections       |
| `--red`      | `#b01818` | Primary accent, CTAs           |
| `--red-lt`   | `#d42020` | Hover states, highlights       |
| `--white`    | `#ffffff` | Text on dark, light backgrounds|
| `--off-white`| `#f7f7f5` | Alternating light sections     |
| `--gray`     | `#888888` | Body text, subtitles           |
| `--gray-lt`  | `#e0e0e0` | Borders on light sections      |

## Logo
- File: `website/logo.png`
- Design: Black background, off-white tire icon + "A&J" text, dark red "AUTO SERVICES"
- Used as `<img src="logo.png">` in navbar and footer (height: 52px)

## Website Sections (top to bottom)
1. **Navbar** — fixed, black bg, logo left, nav links + "Get a Quote" btn right
2. **Hero** — dark gradient, headline, CTA buttons, animated car SVG, floating badges, star rating
3. **Brands** — dark bar: Toyota, Honda, Ford, BMW, Mercedes, Chevrolet
4. **Services** (#services) — 6 cards on off-white:
   - Engine Repair, Auto Diagnostics, Oil & Fluid Service
   - Tire & Brake Service, Exhaust & Catback Systems, Performance Tuning, Engine Swaps & Installs
   - *(AC & Heating was removed per user request)*
5. **About** (#about) — workshop SVG graphic, 4 stat cards, feature list
6. **Selected Works** (#works) — dark section, 2-col grid (1 large + 3 small cards)
7. **Testimonials** (#testimonials) — 3 cards, center one featured (dark bg)
8. **Contact** (#contact) — info + form (name, phone, email, vehicle, service dropdown, message)
9. **Footer** — dark, logo, social links, 3 link columns, copyright

## Business Info (placeholder — update when real info provided)
- Phone: (555) 123-4567
- Email: info@ajauto.com
- Address: 123 Main Street, Auto District
- Hours: Mon–Sat: 8am–6pm
- Founded: 2025

## Design Source
Template: `Business Agency Website (Community).zip` (Figma community freebie)
Recreated as pure HTML/CSS — no frameworks, no build tools.

## User Preferences
- No reddish/orange — palette is black + red (matching logo)
- AC & Heating removed from services
- Services focus: repairs, diagnostics, performance/custom builds (exhausts, tuners, engine swaps)
