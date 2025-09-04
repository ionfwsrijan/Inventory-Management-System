import "./styles/global.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Silk from "../components/Silk/Silk";
import GooeyNav from "../components/GooeyNav";
import SmoothCursor from "../components/Cursor/SmoothCursor";
import { RainbowButton } from "../components/magicui/rainbow-button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function AuthButtons() {
  const { data: session, status } = useSession();

  // status check helps avoid flicker if session is loading
  if (status === "loading") return null;

  return session ? (
    <RainbowButton
      size="lg"
      variant="default"
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{ cursor: "pointer" }}
    >
      Logout
    </RainbowButton>
  ) : (
    <Link href="/auth/login" passHref>
      <RainbowButton size="lg" variant="default" asChild>
        <span>Login</span>
      </RainbowButton>
    </Link>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // Only pass Home for GooeyNav now; Login/Sign Out moved to AuthButtons
  const items = [{ label: "Home", href: "/" }];

  return (
    <SessionProvider session={session}>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <SmoothCursor size={24} />
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Silk
            speed={5}
            scale={1}
            color="#5227FF"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 32,
            zIndex: 90,
            display: "flex",
            gap: "8px",
          }}
        >
          <AuthButtons />
        </div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ height: "70px", position: "relative" }}>
            <GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
        </div>
        {/* Main app content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
