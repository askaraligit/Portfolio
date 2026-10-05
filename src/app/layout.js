import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://askar.dev"),
  title: "Askar — Design Engineer & Full-Stack Developer",
  description: "Askar designs and builds clear, capable digital products for teams and businesses.",
  openGraph: {
    title: "Askar — Design Engineer & Full-Stack Developer",
    description: "Selected product work spanning productivity, ERP, operations, and the web.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Resolve the saved theme before CSS starts the entrance animation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.dataset.theme=localStorage.getItem("askar-theme")==="light"?"light":"dark"}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
