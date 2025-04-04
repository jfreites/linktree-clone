import type { Metadata } from "next";
import {
  ClerkProvider,
  // SignInButton,
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  // UserButton,
} from '@clerk/nextjs'
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linktree Clone developed by @jfreites",
  description: "This is a cool description but it is not the final one",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <main className="w-full h-full min-h-screen bg-[#F3F3F1]">
        {children}
        </main>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
