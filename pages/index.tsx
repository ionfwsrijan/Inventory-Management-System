import { useSession } from "next-auth/react";
import Head from "next/head";
import SplitText from "../components/SplitText/SplitText";
import { RainbowButton } from "../components/magicui/rainbow-button";

export default function Home() {
  // No need to use session for heading
  // Only needed for conditional button, if you want to hide/show button based on login

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
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          zIndex: 2,
          position: "relative",
        }}
      >
        {/* Make heading always big: wrapper div ensures font size */}
        <div className="w-full">
          <div className="text-6xl md:text-6xl font-semibold mb-4 text-center text-shadow-custom leading-tight">
            <SplitText
              text="Complete Inventory Management System"
              className="inline" // let parent div control font size!
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
          </div>
        </div>
        <p
          style={{
            fontSize: "1.25rem",
            marginBottom: "2rem",
            textAlign: "center",
            maxWidth: 600,
            textShadow: "0 1px 8px #0006",
          }}
        >
          Manage your products with full authentication and CRUD features.
        </p>
        <div>
          <a href="/products" style={{ textDecoration: "none" }}>
            <RainbowButton
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg"
            >
              Go to Products
            </RainbowButton>
          </a>
        </div>
      </main>
    </>
  );
}
