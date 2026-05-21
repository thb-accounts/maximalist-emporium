import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "h0bx31-8i.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "b1f1de986e9727d0e128a4f253b8f976";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType?: string;
    tags?: string[];
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  return data;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id title description handle productType tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges { node {
              id title
              price { amount currencyCode }
              availableForSale
              selectedOptions { name value }
            } }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id title description handle productType tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 20) {
        edges { node {
          id title
          price { amount currencyCode }
          availableForSale
          selectedOptions { name value }
        } }
      }
      options { name values }
    }
  }
`;

export async function fetchProducts(first = 100, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query ?? null });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product ?? null;
}

export const CATEGORIES: { slug: string; name: string; query: string; emoji: string }[] = [
  { slug: "tshirts-polos", name: "Tshirts & Polos", query: "product_type:'Tshirts & Polos' OR tag:tshirts", emoji: "👕" },
  { slug: "hoodies-jackets", name: "Hoodies & Jackets", query: "product_type:'Hoodies & Jackets' OR tag:hoodies", emoji: "🧥" },
  { slug: "jerseys-sportswear", name: "Jerseys & Sportswear", query: "product_type:'Jerseys & Sportswear' OR tag:sportswear", emoji: "🏆" },
  { slug: "uniforms-workwear", name: "Uniforms & Workwear", query: "product_type:'Uniforms & Workwear' OR tag:workwear", emoji: "👷" },
  { slug: "bottles-mugs", name: "Bottles & Mugs", query: "product_type:'Bottles & Mugs' OR tag:drinkware", emoji: "🍶" },
  { slug: "caps-hats", name: "Caps & Hats", query: "product_type:'Caps & Hats' OR tag:headwear", emoji: "🧢" },
  { slug: "bags-backpacks", name: "Bags & Backpacks", query: "product_type:'Bags & Backpacks' OR tag:bags", emoji: "🎒" },
  { slug: "office-stationery", name: "Office & Stationery", query: "product_type:'Office & Stationery' OR tag:stationery", emoji: "✏️" },
  { slug: "boxes-packaging", name: "Boxes & Packaging", query: "product_type:'Boxes & Packaging' OR tag:packaging", emoji: "📦" },
  { slug: "travel-tech", name: "Travel & Tech", query: "product_type:'Travel & Tech' OR tag:tech", emoji: "🎧" },
  { slug: "corporate-gifting", name: "Corporate Gifting", query: "product_type:'Corporate Gifting' OR tag:gifting", emoji: "🎁" },
  { slug: "home-wellness", name: "Home & Wellness", query: "product_type:'Home & Wellness' OR tag:wellness", emoji: "🕯️" },
  { slug: "printing-materials", name: "Printing Materials", query: "product_type:'Printing Materials' OR tag:printing", emoji: "🖨️" },
  { slug: "eco-friendly", name: "Eco-friendly", query: "product_type:'Eco-friendly' OR tag:eco", emoji: "🌱" },
  { slug: "pants-shorts", name: "Pants & Shorts", query: "product_type:'Pants & Shorts' OR tag:pants", emoji: "🩳" },
  { slug: "pet-merch", name: "Pet Merch", query: "product_type:'Pet Merch' OR tag:pet", emoji: "🐶" },
  { slug: "kids-merch", name: "Kids Merch", query: "product_type:'Kids Merch' OR tag:kids", emoji: "🧸" },
  { slug: "stickers-labels", name: "Stickers & Labels", query: "product_type:'Stickers & Labels' OR tag:stickers", emoji: "✨" },
  { slug: "business-cards", name: "Business Cards", query: "product_type:'Business Cards' OR tag:cards", emoji: "💳" },
  { slug: "tradeshows-exhibitions", name: "Tradeshows & Exhibitions", query: "product_type:'Tradeshows & Exhibitions' OR tag:tradeshow", emoji: "🎪" },
];
