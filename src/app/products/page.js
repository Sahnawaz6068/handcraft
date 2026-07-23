import ProductCard from "@/components/products/ProductCard";
import {RESPONSE_DATA} from "../../lib/mockData"


const Page = () => {
  const products = RESPONSE_DATA.products;

  return (
    <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Handcrafted <span className="text-amber-700">Jewelry</span>
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;