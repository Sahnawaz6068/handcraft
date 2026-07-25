import { notFound } from "next/navigation";
import { RESPONSE_DATA } from "@/lib/mockData";
import ProductDetail from "@/components/products/ProductDetail";

// swap this for a real fetch/DB call once the backend endpoint is ready:
// const product = await fetch(`${API_URL}/products/slug/${slug}`).then(r => r.json());
function getProductBySlug(slug) {
  return RESPONSE_DATA.products.find((p) => p.slug === slug) ?? null;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.productName} | HandCraft`,
    description: product.productDescription,
  };
}