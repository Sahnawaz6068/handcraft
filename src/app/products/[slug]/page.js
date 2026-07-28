"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct } from "@/lib/api/product";
import ProductDetail from "@/components/products/ProductDetail";

export default function Page() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(slug);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  if (!product) return notFound();

  return <ProductDetail product={product} />;
}