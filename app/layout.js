import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Videofy",
  description: "A video sharing app",
};

function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#E3E5E8] dark:bg-[#313338]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="videofy-theme"
        >
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
