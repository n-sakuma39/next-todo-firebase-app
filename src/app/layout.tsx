import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/Providers";

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MY TODO APP",
  description: "Generated by NS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <Providers>
        <body className={NotoSansJP.className}>{children}</body>
      </Providers>
    </html>
  );
}
