import { useState } from "react";
import { useRouter } from "next/router";
import { MagicCard } from "components/magicui/magic-card";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/products");
    } else {
      setError("Invalid credentials");
    }
  }

  // Ensure this login form is always rendered
  // (no auth guards, no session checks, etc.)

  return (
    <MagicCard
      className="!max-w-sm !mx-auto !py-8 !px-4 !my-12 !shadow-2xl !flex !flex-col !bg-[#141414]"
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
          Login
        </h2>
        <p className="text-gray-300 text-base text-center">
          Enter your credentials to access your account
        </p>
        <hr className="border-t border-[#4b5563] opacity-60 my-4" />
        <input
          type="email"
          className="px-4 py-3 w-full rounded-lg border border-gray-300 bg-[#fff] font-medium text-[0.9rem] text-black text-base placeholder:text-[#9ca3af] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition focus:[box-shadow:0_0_0_1px_#7f5dff]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="px-4 py-3 w-full rounded-lg border border-gray-300 bg-[#fff] font-medium text-[0.9rem] text-black text-base placeholder:text-[#9ca3af] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition focus:[box-shadow:0_0_0_1px_#7f5dff]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <hr className="border-t border-[#4b5563] opacity-60 my-4" />
        <p
          className="text-sm text-center text-[#9ca3af] font-medium"
          style={{ marginBottom: "0.25rem" }}
        >
          Not a member?{" "}
          <a
            href="/auth/register"
            className="hover:text-[#7f5dff] transition underline"
            style={{ color: "#7f5dff" }}
          >
            Register
          </a>{" "}
          now
        </p>
        <button
          type="submit"
          className="py-3 rounded-lg w-full bg-white text-zinc-900 text-md text-semibold border-none hover:bg-black hover:text-[#fff]"
        >
          Login
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
