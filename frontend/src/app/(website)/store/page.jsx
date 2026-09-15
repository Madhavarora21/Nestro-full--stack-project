import ProductCard from "@/components/website/ProductCard";
import { fetchProduct } from "@/utils/api";
import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import LodeMore from "@/components/website/LodeMore";

const PRODUCTS_PER_PAGE = 9;

export default async function StorePage({ searchParams }) {
  const params = await searchParams;

  const rooms = params.rooms || [];
  const categories = params.category || [];
  const min = params.min || 800;
  const max = params.max || 200000;
  const sort = params.sort || "";
  const stock = params.stock || "";
  const currentPage = parseInt(params.page) || 1;
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const products = await fetchProduct({
    rooms,
    category: categories,
    min,
    max,
    sort,
    limit: PRODUCTS_PER_PAGE,
    skip,
    ...(stock !== "" && { stock }),
  });

  const totalPages = products.meta?.pages || 1;

  // Build a href for a given page number, preserving existing filters
  const buildHref = (page) => {
    const qs = new URLSearchParams();

    const roomList = Array.isArray(rooms) ? rooms : rooms ? [rooms] : [];
    roomList.forEach((r) => qs.append("rooms", r));

    const categoryList = Array.isArray(categories)
      ? categories
      : categories
      ? [categories]
      : [];
    categoryList.forEach((c) => qs.append("category", c));

    if (min) qs.append("min", min);
    if (max) qs.append("max", max);
    if (sort) qs.append("sort", sort);
    if (stock !== "") qs.append("stock", stock);
    qs.append("page", page);

    return `/store?${qs.toString()}`;
  };

  // Build the list of page numbers to display, with ellipsis for long ranges
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

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
    <LodeMore />
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {/* Prev button */}
          <Link
            href={buildHref(Math.max(1, currentPage - 1))}
            className={`w-9 h-9 flex items-center justify-center rounded-md border border-[#E8E0D5] bg-white text-[#6B7280] ${
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "hover:bg-[#F0EBE3] hover:text-[#8B5E3C]"
            } transition`}
          >
            <GoChevronLeft />
          </Link>

          {/* Page numbers */}
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-[#6B7280] text-[13px]"
              >
                ...
              </span>
            ) : (
              <Link
                key={page}
                href={buildHref(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-md border text-[13px] font-medium transition ${
                  page === currentPage
                    ? "bg-[#8B5E3C] border-[#8B5E3C] text-white"
                    : "bg-white border-[#E8E0D5] text-[#1E1E1E] hover:bg-[#F0EBE3] hover:text-[#8B5E3C]"
                }`}
              >
                {page}
              </Link>
            )
          )}

          {/* Next button */}
          <Link
            href={buildHref(Math.min(totalPages, currentPage + 1))}
            className={`w-9 h-9 flex items-center justify-center rounded-md border border-[#E8E0D5] bg-white text-[#6B7280] ${
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "hover:bg-[#F0EBE3] hover:text-[#8B5E3C]"
            } transition`}
          >
            <GoChevronRight />
          </Link>
        </div>
      )}
    </>
  );
}