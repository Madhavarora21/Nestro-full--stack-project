import ProductCard from "@/components/website/ProductCard";
import { fetchProduct } from "@/utils/api";

export default async function StorePage({ searchParams }) {
  const params = await searchParams;

  const rooms = params.rooms || [];
  const categories = params.category || [];
  const min = params.min || 800;
  const max = params.max || 200000;
  const sort = params.sort || "";
  const stock = params.stock || "";

  const products = await fetchProduct({
    rooms, category: categories,
    min, max, sort,
    ...(stock !== "" && { stock })
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {products.data.map((product) => (
         <ProductCard 
  key={product._id} 
  product={product}
  showAddToCart={false}
/>
        ))}
      </div>
    </>
  );
}