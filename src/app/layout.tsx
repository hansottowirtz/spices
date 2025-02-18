import type { Metadata } from "next";
import { Geist, Geist_Mono, Glegoo } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { QueryClientProvider } from "@/components/query-client-provider";
import { Github } from "lucide-react";
import { ConfigureLanguages } from "@/components/configure-languages";
import { GlobalFontsProvider } from "@/components/global-fonts-provider";
import { GlobalFontsLink } from "@/components/global-fonts-link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const glegooBold = Glegoo({
  variable: "--font-glegoo-bold",
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spices",
  description: "Spices labels generator",
};

const googleFonts = [
  {
    family: "Courier Prime",
    styles: ["ital", "wght@0,400;0,700;1,400;1,700"],
  },
  {
    family: "Glegoo",
    styles: ["wght@400;700"],
  },
  {
    family: "Laila",
    styles: ["wght@300;400;500;600;700"],
  },
  {
    family: "Noto Sans Arabic",
    styles: ["wght@100..900"],
  },
  {
    family: "Noto Sans Syriac",
    styles: ["wght@100..900"],
  },
  {
    family: "Petit Formal Script",
  },
  {
    family: "Barlow Semi Condensed",
    styles: ["wght@400"],
  },
  {
    family: "M PLUS Rounded 1c",
    styles: ["wght@300;400"],
  },
  {
    family: "El Messiri",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${glegooBold.variable} antialiased font-sans`}
      >
        <GlobalFontsProvider googleFonts={googleFonts}>
          <ConfigureLanguages />
          <QueryClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <main className="min-w-0 w-full">
                  <div>
                    <header className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white">
                      <SidebarTrigger />
                      <Link
                        href="/"
                        className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-header"
                      >
                        Spices
                      </Link>
                      <div className="flex flex-row gap-4 items-center">
                        <Link href="https://github.com/hansottowirtz/spices">
                          <Github className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                        </Link>
                        <ModeToggle />
                      </div>
                    </header>
                    {children}
                  </div>
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </QueryClientProvider>
          <GlobalFontsLink />
        </GlobalFontsProvider>
      </body>
    </html>
  );
}
