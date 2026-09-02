import type { Metadata } from "next";
import { Courier_Prime, Geist, Geist_Mono, Glegoo } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { QueryClientProvider } from "@/components/query-client-provider";
import { ConfigureLanguages } from "@/components/configure-languages";
import { GlobalFontsProvider } from "@/components/global-fonts-provider";
import { GlobalFontsLink } from "@/components/global-fonts-link";
import "./globals.css";
import Image from "next/image";

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

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spices.app",
  description: "Spice label generator",
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
    family: "Merienda",
    styles: ["wght@300"],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${glegooBold.variable} ${courierPrime.variable} antialiased font-sans`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Spices.app" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="print:bg-white print:text-black">
        <div className="printable-page:print:hidden">
          <GlobalFontsProvider googleFonts={googleFonts}>
            <ConfigureLanguages />
            <QueryClientProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                  <main className="min-w-0 w-full">
                    <div>
                      <header className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white">
                        <div className="grow basis-1/3">
                        <AppSidebar />
                        </div>
                        <div className="grow basis-1/3 flex justify-center">
                        <Link
                          href="/"
                          className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-header"
                        >
                          <span>Spices</span>
                          <span className="text-[0.6em] text-gray-500 dark:text-gray-400 font-light">.</span>
                          <span className="text-[0.6em] text-gray-500 dark:text-gray-400 font-mono font-light">app</span>
                        </Link>
                        </div>
                        <div className="grow basis-1/3 justify-end flex gap-4 items-center text-white">
                          <Link href="https://github.com/hansottowirtz/spices">
                            <Image src="/octicon.svg" alt="GitHub icon" width={24} height={24} />
                          </Link>
                          <ModeToggle />
                        </div>
                      </header>
                      {children}
                    </div>
                  </main>
              </ThemeProvider>
            </QueryClientProvider>
            <GlobalFontsLink />
          </GlobalFontsProvider>
        </div>
      </body>
    </html>
  );
}
