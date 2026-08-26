import Link from 'next/link';
import { fetchProduct } from '@/utils/api';
import Sellider from './Sellider';

export default async function Selles() {
  const response = await fetchProduct({
    status: true,
    bestSeller: true,
  });

  const products = response?.data || [];

  return (
    <section>

      {/* BEST SELLER HEADING */}
      <div className="max-w-container mx-auto mb-4 sm:mb-6">

        <div className="flex items-end justify-between gap-2">

          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8B5E3C] uppercase mb-1">
              HANDPICKED FOR YOU
            </p>

            <h2 className="text-[24px] sm:text-[26px] font-normal text-[#111827]">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/store"
            className="text-[11px] text-[#8B5E3C] cursor-pointer tracking-[0.06em] border-b border-[#C6A27E] hover:border-b-2 transition-all"
          >
            View All
          </Link>

        </div>

      </div>

      {/* BEST SELLER PRODUCTS */}

      <div className="mb-16 sm:mb-10">
  <Sellider products={products} />
</div>

    </section>
  );
}