import "./styles/global.css";
import { useEffect, useState } from "react";
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
  if (status === "loading") return null;

  return session ? (
    <RainbowButton
      size="lg"
      variant="default"
      className="rainbow-btn w-full sm:w-auto"
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{ cursor: "pointer" }}
    >
      Logout
    </RainbowButton>
  ) : (
    <Link href="/auth/login" passHref>
      <RainbowButton
        size="lg"
        variant="default"
        asChild
        className="rainbow-btn w-full sm:w-auto"
      >
        <span>Login</span>
      </RainbowButton>
    </Link>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // Hide custom cursor on touch/mobile devices
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ));
    if (isTouch) setShowCursor(false);
  }, []);

  const items = [{ label: "Home", href: "/" }];

  return (
    <SessionProvider session={session}>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {showCursor && <SmoothCursor size={24} />}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <Silk
            speed={5}
            scale={1}
            color="#5227FF"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        <div className="fixed top-6 right-2 sm:right-4 z-[90] flex gap-2 sm:gap-4">
          <AuthButtons />
        </div>
        <div className="relative z-[2]">
          <div className="h-[70px] relative">
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
        <div className="relative z-[1]">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
