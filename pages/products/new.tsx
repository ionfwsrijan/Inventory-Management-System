import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MagicCard } from "components/magicui/magic-card";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
      }),
    });
    if (res.ok) {
      router.push("/products");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to add product");
    }
  }

  if (!session)
    return (
      <p className="text-center">
        Please <Link href="/auth/login">login</Link> first.
      </p>
    );

  return (
    <MagicCard
      className="magic-card max-w-md w-full mx-auto py-8 px-4 sm:px-6 my-12 flex flex-col bg-[#141414] shadow-2xl"
      gradientSize={200}
      gradientColor="#141414"
      gradientOpacity={0.8}
      gradientFrom="#9E7AFF"
      gradientTo="#FE8BBB"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full font-Inter"
      >
        <h2 className="text-white text-2xl text-center font-semibold mb-2">
          Add New Product
        </h2>
        <hr className="border-t border-[#4b5563] opacity-60 my-4" />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-3 w-full rounded-lg border border-gray-300 bg-white font-medium text-black text-base placeholder:text-[#9ca3af] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition focus:[box-shadow:0_0_0_1px_#7f5dff]"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="px-4 py-3 w-full rounded-lg border border-gray-300 bg-white font-medium text-black text-base placeholder:text-[#9ca3af] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition focus:[box-shadow:0_0_0_1px_#7f5dff]"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="px-4 py-3 w-full rounded-lg border border-gray-300 bg-white font-medium text-black text-base placeholder:text-[#9ca3af] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition focus:[box-shadow:0_0_0_1px_#7f5dff]"
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="px-4 py-3 w-full rounded-lg border border-gray-300 bg-white font-medium text-black text-base placeholder:text-[#9ca3af] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition focus:[box-shadow:0_0_0_1px_#7f5dff]"
        />
        <hr className="border-t border-[#4b5563] opacity-60 my-4" />
        <button
          type="submit"
          className="py-3 rounded-lg w-full bg-white text-black text-md font-semibold border-none transition-colors
              hover:bg-black hover:text-[#fff]"
        >
          Add Product
        </button>
        {error && (
          <p className="text-red-500 text-center text-sm font-medium">
            {error}
          </p>
        )}
      </form>
    </MagicCard>
  );
}
