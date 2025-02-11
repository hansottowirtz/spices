import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { LabelSettingsProvider } from "@/components/label-settings-provider";
import Link from "next/link";
import { QueryClientProvider } from "@/components/query-client-provider";
import { Github } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spices",
  description: "Spices labels generator",
};

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
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Glegoo:wght@400;700&family=Laila:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans+Syriac:wght@100..900&family=Petit+Formal+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <LabelSettingsProvider>
                <AppSidebar />
                <main className="min-w-0 w-full">
                  <div>
                    <header className="flex items-center justify-between p-4 border-b-2 border-black dark:border-white">
                      <SidebarTrigger />
                      <Link
                        href="/"
                        className="text-2xl font-bold text-gray-800 dark:text-gray-100"
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
              </LabelSettingsProvider>
            </SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
