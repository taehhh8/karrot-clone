import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import BottomNav from "@/components/common/BottomNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
