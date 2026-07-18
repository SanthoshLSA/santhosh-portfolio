import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santhosh Ananth | AI & Data Science Student & Developer",
  description: "Explore the professional portfolio of Santhosh Ananth, an AI and Data Science student at Shiv Nadar University, Chennai. Experienced in full-stack MERN/PERN development and competitive programming.",
  keywords: ["Santhosh Ananth", "AI & Data Science Student", "Shiv Nadar University Chennai", "MERN Stack Developer", "Competitive Programming LeetCode"],
  authors: [{ name: "Santhosh Ananth" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
