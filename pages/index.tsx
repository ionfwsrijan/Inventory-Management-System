import { useSession } from "next-auth/react";
import Head from "next/head";
import SplitText from "../components/SplitText/SplitText";
import { RainbowButton } from "../components/magicui/rainbow-button";

export default function Home() {
  const { data: session } = useSession();

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <>
      <Head>
        <title>Inventory Management System</title>
        <meta
          name="description"
          content="Manage your products with full authentication and CRUD features."
        />
      </Head>
      <main className="min-h-[80vh] flex flex-col items-center justify-center text-white z-[2] relative px-2 sm:px-0">
        <SplitText
          text="Complete Inventory Management System"
          className="split-parent text-3xl sm:text-5xl md:text-6xl font-semibold mb-4 text-center text-shadow-custom"
          delay={50}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <p className="text-base sm:text-lg mb-8 text-center max-w-xl text-shadow-custom">
          Manage your products with full authentication and CRUD features.
        </p>
        {session ? (
          <div className="w-full flex justify-center">
            <a
              href="/products"
              className="w-full sm:w-auto"
              style={{ textDecoration: "none" }}
            >
              <RainbowButton
                size="lg"
                variant="outline"
                className="rainbow-btn w-full sm:w-auto font-bold"
                style={{
                  borderRadius: 12,
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 24px #492cff44",
                }}
              >
                Go to Products
              </RainbowButton>
            </a>
          </div>
        ) : null}
      </main>
    </>
  );
}
