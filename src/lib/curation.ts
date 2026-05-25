import type { ShopifyProduct } from "./shopify";

/**
 * Frontend-only B2C curation layer.
 * Shopify remains source of truth — products listed here are simply
 * hidden from the storefront. Nothing is unpublished or deleted.
 */

// Numeric Shopify product IDs to hide from the storefront.
// These are B2B / industrial / workwear / packaging items that don't fit LDD's B2C positioning,
// plus bare placeholder template products with empty descriptions.
export const HIDDEN_PRODUCT_IDS = new Set<string>([
  // Workwear / safety
  "7650422980721", // Corporate Polo
  "7650425307249", // Apron
  "7650425274481", // Safety Vest
  // Corporate gifting
  "7650423439473", // Custom Branded Domino Game Set
  "7650423472241", // Dior J'Adore Inspired Perfume
  "7650426650737", // Executive Gift Set
  "7650426683505", // Crystal & Marble Award
  // Business cards
  "7650426945649",
  // Packaging
  "7650426224753", // Gift Set Magnet Flap
  "7650426388593", // Magnetic Gift Box
  "7650426290289", // Magnetic Gift Boxes
  "7650426323057", // Mini Jewellery Box
  "7650426257521", // Printed Kraft Paper Bags
  // Tradeshow
  "7650426978417", // Hanging Backdrop Banner
  // Office bulk / industrial promo
  "7650425995377", // Pin Button Badge
  "7650425929841", // Stress Balls
  "7650426060913", // Twisted Plastic Pen
  "7650426028145", // Car Sun Shade
  "7650426191985", // Office Gift Set
  // Industrial tech / odd items
  "7650426617969", // Pocket Knife
  "7650426519665", // Table Handbag Hook
  "7650426486897", // Portable Hand Fan
  // Hotel / bulk home
  "7650423406705", // Bathrobes
  "7650426781809", // Bath Towel
  "7650425241713", // Sports Cooling Towel
  // Bulk giveaway bags
  "7650425798769", // Muslin Bags
  "7650425733233", // Non-Woven Giveaway Bag
  "7650425667697", // Polyester Drawstring Bag
  // Bare template duplicates (no real description, generic names)
  "7650423636081", // T Shirt
  "7650423767153", // T Shirt Long-Sleeve
  "7650423668849", // T Shirt Short-Sleeve
  "7650423734385", // Tank Top
  "7650423832689", // V-Neck Short-Sleeve
  "7650423701617", // V-Neck Long-Sleeve
  "7650423570545", // Oversized T Shirt
  "7650423537777", // Crop Top
  "7650423505009", // Crop Top Short-Sleeve
]);

function numericId(gid: string): string {
  const parts = gid.split("/");
  return parts[parts.length - 1] ?? gid;
}

export function isHidden(product: ShopifyProduct): boolean {
  return HIDDEN_PRODUCT_IDS.has(numericId(product.node.id));
}

export function filterB2C(products: ShopifyProduct[]): ShopifyProduct[] {
  return products.filter((p) => !isHidden(p));
}

/**
 * Curated B2C category definitions.
 * Each category matches products by Shopify productType (case-insensitive).
 */
export interface B2CCategory {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  productTypes: string[];
  comingSoon?: boolean;
}

export const B2C_CATEGORIES: B2CCategory[] = [
  {
    slug: "apparel",
    name: "Apparel",
    emoji: "👕",
    tagline: "Tees, hoodies & loud fits",
    productTypes: ["Tshirts & Polos", "Hoodies & Jackets", "Jerseys & Sportswear", "Eco-friendly"],
  },
  {
    slug: "drinkware",
    name: "Drinkware",
    emoji: "☕",
    tagline: "Mugs, tumblers & bottles",
    productTypes: ["Bottles & Mugs"],
  },
  {
    slug: "bags",
    name: "Bags",
    emoji: "🎒",
    tagline: "Totes, backpacks, slings",
    productTypes: ["Bags & Backpacks"],
  },
  {
    slug: "gifts",
    name: "Gifts",
    emoji: "🎁",
    tagline: "Giftable, personal, fun",
    productTypes: ["Office & Stationery"],
  },
  {
    slug: "tech",
    name: "Tech",
    emoji: "📱",
    tagline: "Powerbanks & phone gear",
    productTypes: ["Travel & Tech"],
  },
  {
    slug: "pet-merch",
    name: "Pet Merch",
    emoji: "🐾",
    tagline: "For your tiny chaos creature",
    productTypes: ["Pet Merch"],
    comingSoon: true,
  },
];

export function getCategoryBySlug(slug: string): B2CCategory | undefined {
  return B2C_CATEGORIES.find((c) => c.slug === slug);
}

export function productMatchesCategory(product: ShopifyProduct, cat: B2CCategory): boolean {
  const type = (product.node.productType ?? "").toLowerCase();
  return cat.productTypes.some((t) => t.toLowerCase() === type);
}

export function filterByCategory(products: ShopifyProduct[], cat: B2CCategory): ShopifyProduct[] {
  return filterB2C(products).filter((p) => productMatchesCategory(p, cat));
}

/** Bestsellers = deterministic top picks from apparel + drinkware (stable, no flicker). */
const BESTSELLER_TYPES = ["Tshirts & Polos", "Hoodies & Jackets", "Bottles & Mugs"];
export function getBestsellers(products: ShopifyProduct[], limit = 8): ShopifyProduct[] {
  const curated = filterB2C(products);
  const matches = curated.filter((p) =>
    BESTSELLER_TYPES.some((t) => (p.node.productType ?? "").toLowerCase() === t.toLowerCase())
  );
  // Deterministic order — sort by title so paint order is stable across renders.
  matches.sort((a, b) => a.node.title.localeCompare(b.node.title));
  return matches.slice(0, limit);
}

export function getNewArrivals(products: ShopifyProduct[], limit = 8): ShopifyProduct[] {
  const curated = filterB2C(products);
  // Highest numeric ID = most recently created.
  const sorted = [...curated].sort((a, b) => numericId(b.node.id).localeCompare(numericId(a.node.id)));
  return sorted.slice(0, limit);
}
