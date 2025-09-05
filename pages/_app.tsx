import "./styles/global.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Silk from "../components/Silk/Silk";
import SmoothCursor from "../components/Cursor/SmoothCursor";
import { RainbowButton } from "../components/magicui/rainbow-button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function AuthButtons() {
  const { data: session } = useSession();

  return session?.user ? (
    <span>
      <RainbowButton
        size="lg"
        variant="default"
        asChild
        className="rainbow-btn !w-auto !flex-none"
        style={{ cursor: "pointer" }}
      >
        <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </button>
      </RainbowButton>
    </span>
  ) : (
    <Link href="/auth/login" passHref>
      <RainbowButton
        size="lg"
        variant="default"
        asChild
        className="rainbow-btn !w-auto !flex-none"
      >
        <span>Login</span>
      </RainbowButton>
    </Link>
  );
}

function HomeButton() {
  return (
    <Link href="/" passHref>
      <RainbowButton
        size="lg"
        variant="default"
        asChild
        className="rainbow-btn !w-auto !flex-none"
      >
        <span>Home</span>
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
        {/* Flex container for Home/Login aligned left and right */}
        <div className="fixed top-6 left-0 right-0 z-[90] flex justify-between items-center gap-x-4 px-4 sm:px-8">
          <HomeButton />
          <AuthButtons />
        </div>
        <div className="relative z-[2]">
          <div className="h-[70px] relative"></div>
        </div>
        <div className="relative z-[1]">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
