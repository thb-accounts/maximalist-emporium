
## Strategy

Keep Shopify as source of truth — no products deleted or unpublished server-side. All curation happens **frontend-only** via an allowlist defined in `src/lib/curation.ts`. Shopify sync stays intact; you can flip products on/off later by editing one file (or eventually swap to real Shopify collections).

## 1. Catalog curation (frontend hide)

Build `src/lib/curation.ts` with:
- **HIDDEN_PRODUCT_IDS** — explicit deny-list of B2B-coded SKUs
- **B2C_CATEGORIES** — the new 8-category map (replaces the 20-category `CATEGORIES` array in `shopify.ts`)
- **filterB2C(products)** — applied in every `fetchProducts` consumer

### Hidden (B2B / industrial — removed from storefront)
Workwear/Safety: Corporate Polo, Apron, Safety Vest
Corporate Gifting: Domino Set, Dior Perfume, Executive Gift Set, Crystal Award
Business Cards (entire product)
Packaging: Gift Set Magnet Flap, Magnetic Gift Box (×2), Mini Jewellery Box, Kraft Paper Bags
Tradeshow: Hanging Backdrop Banner
Office bulk: Pin Button Badge, Stress Balls, Twisted Plastic Pen, Car Sun Shade, Office Gift Set
Industrial Tech: SwissStyle Pocket Knife, Table Handbag Hook, Portable Hand Fan
Home bulk: Bathrobes, Bath Towel, Sports Cooling Towel, Muslin Bags, Non-Woven Giveaway Bag, Polyester Drawstring Bag
Duplicates/empty placeholders: bare "T Shirt", "Tank Top", "V-Neck Short-Sleeve" etc. (vendor=GL17CH templates with no real description)

This trims ~30 SKUs, leaving ~55 curated B2C products.

### Kept & remapped to 6 shoppable categories
- **Apparel** — Tshirts & Polos + Hoodies & Jackets + Crop Tops + Jerseys (consumer-friendly ones)
- **Drinkware** — all Bottles & Mugs
- **Bags** — Tote, Backpack, Travel Body Bag, Two-Tone Tote, Recycled Tote
- **Gifts** — Notebook, Premium Pen Set, Gift Card, LDD-vendor specialty items
- **Tech** — Magnetic Powerbank, VoltView Powerbank, iPhone Card Holder
- **Pet Merch** — (none currently — section hidden until product exists, or shown as "Coming Soon" tile)

Plus two dynamic collections:
- **Bestsellers** — first 8 from the curated apparel+drinkware mix (deterministic, no flicker)
- **New Arrivals** — last 8 added (by ID descending)

## 2. Homepage rebuild (`src/routes/index.tsx`)

New section order:
1. **Hero** — "Custom merch that refuses to be boring." + subheadline + two CTAs (Shop Now → `/categories`, Create Your Own → `/contact`). Bright maximalist visual using existing logo + product collage.
2. **Bestsellers (6–8 products)** — uses `useSuspenseQuery` with a stable preloaded queryKey so it never shows "Loading…" flicker after first paint; skeleton only on cold load.
3. **Shop by Category** — 6 visible category tiles (max 8) with emoji + photo background.
4. **How It Works** — 3 steps: Pick · Customize · We print & ship.
5. **Trust strip** — Ships across UAE · Secure checkout · Made to order · Fast production · Quality printing (icon row).
6. **Social Proof** — empty review/testimonial cards + Instagram grid placeholder ("Tag us @lumianddeedee"). No fake reviews per policy.
7. **Manifesto** — kept but slimmed to one tight block, moved below social proof so shopping comes first.

## 3. Navigation simplification

`Header.tsx` nav becomes: Shop · Bestsellers · How It Works · Contact
Mobile: add hamburger sheet (currently nav is hidden under `lg:`).
Add **sticky mobile bottom CTA bar** (Shop / Cart) on small screens.

`/categories` page rebuilt to show only the 6 curated B2C categories with hero imagery, not the 20-emoji wall.

## 4. PDP upgrades (`src/routes/product.$handle.tsx`)

- Larger gallery (sticky on desktop, swipeable on mobile)
- Strong sticky CTA on mobile
- "Production ETA: 5–7 days" + "Ships across UAE in 2–3 days" badges
- "Customization instructions" textarea (persisted to cart line attributes via Shopify cart attributes — non-breaking)
- FAQ accordion (shipping, returns, customization, bulk)
- Trust badges row

## 5. Copy tone pass

- Soften "Minimalism is cowardice" manifesto → "Boring is the only thing we don't make."
- Replace any aggressive copy with cheeky/friendly
- Keep cat references — they're brand DNA

## 6. Perf / UX fixes

- Bestsellers + categories use `queryClient.ensureQueryData` in loader → no skeleton flash on subsequent visits
- Replace `Loading…` strings with proper skeleton components matching final layout (no layout shift)
- Add `loading="lazy"` + explicit width/height on product images
- Consistent spacing scale (already mostly there via Tailwind)

## Files touched

**New**
- `src/lib/curation.ts` — hidden IDs, B2C category map, filter helpers
- `src/components/HowItWorks.tsx`
- `src/components/TrustStrip.tsx`
- `src/components/SocialProof.tsx`
- `src/components/MobileStickyBar.tsx`
- `src/components/MobileNav.tsx`
- `src/components/ProductFAQ.tsx`

**Edited**
- `src/routes/index.tsx` — full rebuild
- `src/routes/categories.tsx` — 6 curated only
- `src/routes/category.$slug.tsx` — use new map
- `src/routes/product.$handle.tsx` — gallery + ETA + FAQ + sticky CTA
- `src/components/Header.tsx` — slimmed nav + mobile drawer
- `src/components/ProductCard.tsx` — lazy img, no layout shift
- `src/lib/shopify.ts` — optional re-export from curation
- `src/components/Footer.tsx` — link only to live categories

## What I will NOT do without explicit go-ahead
- Delete or unpublish products in Shopify
- Change any product prices
- Modify product titles/descriptions in Shopify
- Add fake reviews/ratings (policy)

## Open questions (defaults shown — say if you want different)
1. **Hidden products** — frontend-only hide (default), or also unpublish in Shopify?
2. **Pet Merch** — no SKUs exist; show "Coming soon" tile or hide the category entirely?
3. **Manifesto** — keep slimmed version (default) or cut completely?

Reply "go" to ship the whole thing with the defaults, or tell me what to change.
