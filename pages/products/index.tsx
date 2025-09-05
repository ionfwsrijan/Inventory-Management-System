"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatedList } from "../../components/List/AnimatedList";
import { RainbowButton } from "../../components/magicui/rainbow-button";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        });
    }
  }, [status]);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  }

  if (status === "loading") return <p>Loading...</p>;
  if (!session)
    return (
      <p className="text-center">
        Please <Link href="/auth/login">login</Link> to view your products.
      </p>
    );

  return (
    <div className="min-h-[80vh] w-full bg-transparent text-[#222] py-8 px-2 sm:px-6 box-border overflow-x-hidden">
      <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-white text-center leading-tight tracking-tight">
        Inventory Products
      </h1>
      <div className="text-center mb-6">
        <Link href="/products/new">
          <RainbowButton
            size="lg"
            variant="outline"
            className="rainbow-btn text-white w-full sm:w-auto"
          >
            Add a new product
          </RainbowButton>
        </Link>
      </div>
      <div className="mt-8 max-w-lg w-full mx-auto flex flex-col gap-4">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <AnimatedList delay={180}>
            {products.map((p) => (
              <div
                key={p.id}
                className="product-card bg-white rounded-2xl shadow-[0_8px_32px_#0003,0_1.5px_6px_#0001] px-6 py-5 sm:px-8 sm:py-6 min-h-[80px] flex items-center gap-6 w-full max-w-full mb-0 box-border"
              >
                <div className="min-w-[56px] min-h-[56px] flex items-center justify-center rounded-xl bg-[#f1f5fd] flex-shrink-0">
                  <span role="img" aria-label="box" className="text-3xl">
                    📦
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base md:text-lg text-[#222] break-words">
                    {p.name}
                  </div>
                  <div className="text-[#475569] text-sm md:text-base mt-1 break-words">
                    <span>
                      <b>Rs.{p.price}</b> &middot; <b>{p.quantity}</b> in stock
                      &middot; <b>{p.category}</b>
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-2 flex-shrink-0">
                  <button
                    onClick={() => router.push(`/products/edit/${p.id}`)}
                    className="bg-[#141414] text-white font-medium text-sm md:text-base border-none rounded-lg px-3 py-2 cursor-pointer outline-none transition duration-200 hover:bg-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-[#141414] text-white font-semibold text-sm md:text-base border-none rounded-lg px-3 py-2 cursor-pointer outline-none transition duration-200 hover:bg-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </AnimatedList>
        )}
      </div>
    </div>
  );
}
