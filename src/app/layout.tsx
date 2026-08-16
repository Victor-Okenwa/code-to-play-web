import type { Metadata } from "next";
import {
  Geist_Mono,
  Pixelify_Sans,
  Play,
  Press_Start_2P,
  VT323,
} from "next/font/google";
import "./globals.css";
import { SplashLoader } from "@/components/splash-loader";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const playSans = Play({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const fontVariables = [
  playSans.variable,
  geistMono.variable,
  pressStart2P.variable,
  pixelifySans.variable,
  vt323.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Code to play",
  description: "Play games in VS Code - earn playtime by writing code!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SplashLoader />
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
