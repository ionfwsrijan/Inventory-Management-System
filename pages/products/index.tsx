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
      <p style={{ textAlign: "center" }}>
        Please <Link href="/auth/login">login</Link> to view your products.
      </p>
    );

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "transparent",
        color: "#222",
        padding: "2rem 0",
        boxSizing: "border-box",
        overflowX: "hidden", // Prevent scroll
      }}
    >
      <h1
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "3rem",
          marginBottom: "1.5rem",
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        Inventory Products
      </h1>
      <div style={{ textAlign: "center" }}>
        <Link
          href="/products/new"
          style={{
            color: "#0ea5e9",
            fontWeight: 500,
            fontSize: "1.1rem",
          }}
        >
          <RainbowButton size="lg" variant="outline" className="text-white">
            Add a new product
          </RainbowButton>
        </Link>
      </div>
      <div
        style={{
          marginTop: 48,
          maxWidth: 600,
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <AnimatedList delay={180}>
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  borderRadius: "1.5rem",
                  boxShadow: "0 8px 32px #0003, 0 1.5px 6px #0001",
                  padding: "1.5rem 2rem",
                  minHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  width: "100%",
                  maxWidth: "100%",
                  marginBottom: 0,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    minWidth: 56,
                    minHeight: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "1rem",
                    background: "#f1f5fd",
                    flexShrink: 0,
                  }}
                >
                  <span role="img" aria-label="box" style={{ fontSize: 32 }}>
                    📦
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: "#222",
                      wordBreak: "break-word",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      color: "#475569",
                      fontSize: "1rem",
                      marginTop: 4,
                      wordBreak: "break-word",
                    }}
                  >
                    <span>
                      <b>Rs.{p.price}</b> &middot; <b>{p.quantity}</b> in stock
                      &middot; <b>{p.category}</b>
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginLeft: 8,
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => router.push(`/products/edit/${p.id}`)}
                    style={{
                      color: "#fff",
                      background: "#141414",
                      fontWeight: 500,
                      fontSize: "1rem",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 16px",
                      cursor: "pointer",
                      outline: "none",
                      transition: "background .2s",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      color: "#fff",
                      background: "#141414",
                      fontWeight: 600,
                      fontSize: "1rem",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 16px",
                      cursor: "pointer",
                      outline: "none",
                      transition: "opacity .2s",
                    }}
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
