import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Email IA",
  description: "Geração de respostas de emails com IA",
  authors: [{ name: "Carlos Ian Rodrigues dos Santos", url: "https://linkedin.com/in/carlosian"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen flex flex-col">
          <header className="pt-3 pb-3 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
            <Header />
          </header>

          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
            <Toaster position="top-right" />
          </main>

          <footer className="border-t border-border/50 mt-16">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p>&copy; 2026 Carlos Ian Rodrigues dos Santos, Email AI</p>
                <div className="flex items-center gap-4">
                  <div className='flex flex-row items-center gap-2 justify-center'>
                    <Link className="flex rounded-sm p-2 bg-primary/60 items-center hover:bg-primary" href="https://github.com/carlosianrs">
                      <Github className="text-white" size={20} strokeWidth={1.5} />
                    </Link>
                    <Link className="flex rounded-sm p-2 bg-primary/60 items-center hover:bg-primary" href="https://www.linkedin.com/in/carlosian">
                      <Linkedin className="text-white" size={20} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
